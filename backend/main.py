from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data import charts

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://adverai.vercel.app"
    
    ]


# Allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(charts.router)