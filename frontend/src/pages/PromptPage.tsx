// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import HeroSection from "@/components/HeroSection";
// import LoadingAnimation from "@/components/LoadingAnimation";
// import { getAIResponse } from "@/api/aiService"; // ✅ Added import

// export default function PromptPage({ setAiResponse }: { setAiResponse: React.Dispatch<React.SetStateAction<any>> }) {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleGenerate = async (prompt: string) => {
//     setLoading(true);
//     try {
//       const res = await getAIResponse(prompt);
//       setAiResponse(res);
//       navigate("/results");
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <HeroSection onGenerate={handleGenerate} />
//       <LoadingAnimation isVisible={loading} />
//     </>
//   );
// }
