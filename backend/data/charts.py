from fastapi import Body, APIRouter
from pymongo import MongoClient
import requests, os, json
from dotenv import load_dotenv
import traceback
from datetime import date, timedelta, datetime
import textwrap, re

# Load .env file
load_dotenv()

router = APIRouter()

# MongoDB connection
try:
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client["adverai"]
    ads_collection = db["stats"]
except Exception as e:
    print("MongoDB connection error:", e)
    ads_collection = None

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


def clean_json_string(s: str) -> str:
    """
    Remove markdown code fences and extra whitespace for JSON parsing.
    """
    s = s.strip()
    # Remove leading/trailing ``` or ```json fences
    s = re.sub(r"^```(?:json)?\s*|```$", "", s, flags=re.MULTILINE)
    return s


@router.post("/query")
def process_query(user_prompt: str = Body(..., embed=True)):
    try:
        if not OPENROUTER_API_KEY:
            return {"error": "Missing OpenRouter API key"}
        if ads_collection is None:
            return {"error": "Database not connected"}

        # Prepare AI prompt without extra indentation
        ai_prompt = textwrap.dedent(f"""
            You are an intelligent visualization planner for marketing analytics data.

            MongoDB collection schema:
            ads_data(campaign_name, date, impressions, clicks, conversions, spend, roas)

            Available metrics and their purposes:
            - impressions: Total ad views/reach
            - clicks: User engagement/interactions  
            - conversions: Successful actions/goals
            - spend: Total advertising cost
            - roas: Return on Ad Spend (efficiency metric)
            - ctr: Click-through rate (clicks/impressions)
            - cpc: Cost per click (spend/clicks)
            - conversion_rate: Conversion efficiency (conversions/clicks)

            For this user request: "{user_prompt}"

            ANALYSIS GUIDELINES:
            1. Parse the user's intent from natural language (reports, performance, trends, comparison, etc.)
            2. Identify time periods mentioned (dates, months, ranges, "today", "last week", etc.)
            3. Determine relevant metrics based on context:
            - "performance" → impressions, clicks, conversions, spend, roas
            - "cost" → spend, cpc, roas
            - "engagement" → clicks, ctr, impressions
            - "efficiency" → roas, conversion_rate, cpc
            - "overview/reports" → all key metrics
            4. Choose appropriate visualizations:
            - Single date: bar charts, pie charts for breakdowns
            - Date ranges: line charts for trends, area charts for cumulative
            - Comparisons: grouped bar charts, multi-line charts
            - Distribution: pie charts for campaign breakdown

            VISUALIZATION TYPES:
            - "line": Time series trends
            - "bar": Categorical comparisons  
            - "pie": Distribution/breakdown
            - "area": Cumulative trends
            - "scatter": Correlation analysis
            - "table": Detailed data view

            Return JSON with:
            {{
                "metrics": [
                    {{"title": "human-readable name", "value_key": "database_field", "format": "number|currency|percentage"}}
                ],
                "visualizations": [
                    {{"type": "chart_type", "title": "descriptive title", "x_key": "x_axis_field", "y_keys": ["y_axis_fields"], "description": "brief explanation"}}
                ],
                "filters": {{
                    "date": {{"type": "single|range", "value": "parsed_date_or_range"}},
                    "campaign": "specific_campaign_if_mentioned",
                    "additional_context": "any_other_relevant_filters"
                }},
                "insights": ["suggested analytical insights based on request"]
            }}

            EXAMPLES:
            - "show me reports for July 24th" → single date analysis with key metrics overview
            - "campaign performance last week" → date range with performance-focused metrics  
            - "cost analysis" → spend, cpc, roas metrics with cost-focused visualizations
            - "compare campaigns" → campaign breakdown with comparative visualizations

            Always return valid JSON only. Do not include markdown, comments, or explanations.
        """)

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }

        models = [
            "deepseek/deepseek-r1-0528-qwen3-8b:free",
            "mistralai/mistral-small-3.2-24b-instruct:free",
            "openrouter/horizon-beta",
            # "qwen/qwen3-coder:free",

        ]

        config = None

        # Query each model until we get valid JSON
        for model in models:
            payload = {
                "model": model,
                "max_tokens": 500,
                "messages": [
                    {"role": "system", "content": "You respond only in valid JSON."},
                    {"role": "user", "content": ai_prompt}
                ]
            }
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=payload
            )

            if response.status_code == 200:
                raw_content = response.json()["choices"][0]["message"]["content"]
                cleaned = clean_json_string(raw_content)
                try:
                    config = json.loads(cleaned)
                    break
                except json.JSONDecodeError as e:
                    print(f"JSON parse error from {model}: {e}")
                    print("Raw AI output:\n", raw_content)
                    continue

            elif response.status_code == 429:
                print(f"Model {model} rate-limited, trying next model...")
                continue
            else:
                print(f"OpenRouter error from model {model}:", response.text)
                continue

        if not config:
            print("FALL BACK DATA")
            return _fallback_data()

        # Handle date filter
        mongo_filter = {}
        date_info = config.get("filters", {}).get("date")
        date_str = None
        if isinstance(date_info, dict):
            date_str = str(date_info.get("value", "")).lower()
        elif date_info:
            date_str = str(date_info).lower()

        if date_str in ["yesterday", "yesterday's"]:
            mongo_filter["date"] = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d")
        elif date_str in ["today", "today's"]:
            mongo_filter["date"] = date.today().strftime("%Y-%m-%d")
        elif date_str:
            mongo_filter["date"] = date_str

        # Query data
        rows = list(ads_collection.find(mongo_filter, {"_id": 0}))
        config["data"] = rows if rows else _fallback_data()["data"]

        # Full impression history for line chart
        all_data = list(ads_collection.find({}, {"_id": 0, "date": 1, "impressions": 1}))
        impressions_by_date = {}
        for entry in all_data:
            d = entry.get("date")
            try:
                dstr = datetime.strptime(str(d), "%Y-%m-%d").strftime("%Y-%m-%d")
            except:
                dstr = str(d) or "No Date"
            impressions_by_date[dstr] = impressions_by_date.get(dstr, 0) + int(entry.get("impressions", 0))

        config["line_chart_data"] = [
            {"date": d, "impressions": total}
            for d, total in sorted(impressions_by_date.items())
        ]

        return config

    except Exception as e:
        print("Error in /query route:", e)
        traceback.print_exc()
        return _fallback_data()


def _fallback_data():
    """Fallback data when AI or DB fails."""
    return {
        "metrics": [
            {"title": "Impressions", "value_key": "impressions"},
            {"title": "Conversions", "value_key": "conversions"}
        ],
        "visualizations": [
            {"type": "metric-card", "title": "Impressions", "value_key": "impressions"},
            {"type": "metric-card", "title": "Conversions", "value_key": "conversions"},
            {
                "type": "bar-chart",
                "title": "Impressions vs Conversions",
                "x_key": "campaign_name",
                "y_keys": ["impressions", "conversions"]
            }
        ],
        "data": [
            {"campaign_name": "Campaign A", "impressions": 1200, "conversions": 40},
            {"campaign_name": "Campaign B", "impressions": 900, "conversions": 25}
        ],
        "filters": {
            "date": {"type": "single", "value": "2025-08-04"},
            "campaign": None,
            "additional_context": None
        },
        "insights": [
            "Campaign A had higher engagement than Campaign B.",
            "Conversions were proportionally higher for Campaign A."
        ],
        "line_chart_data": [
            {"date": "2025-08-01", "impressions": 1000},
            {"date": "2025-08-02", "impressions": 1500}
        ]
    }
