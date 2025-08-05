// import React, { useState, useContext } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AIProvider, AIContext } from "./context/AIContext";
// import LandingPage from "./pages/LandingPage";
// import HeroSection from "./components/HeroSection";
// import NotFound from "./pages/NotFound";
// import ResultsPage from "./pages/ResultsPage";
// import LoadingAnimation from "./components/LoadingAnimation";

// function AppContent() {
//   const [prompt, setPrompt] = useState("");
//   const { loadingVisible } = useContext(AIContext);

//   return (
//     <>
//       {loadingVisible && <LoadingAnimation isVisible={true} />}

//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route
//           path="/prompt"
//           element={<HeroSection prompt={prompt} setPrompt={setPrompt} />}
//         />
//         <Route path="/results" element={<ResultsPage />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <AIProvider>
//       <BrowserRouter>
//         <AppContent />
//       </BrowserRouter>
//     </AIProvider>
//   );
// }

// export default App;


// App.tsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "@/pages/LandingPage";
// import DashboardLayout from "@/pages/DashboardLayout";
// import ResultsPage from "./pages/ResultsPage";
// // import Overview from "@/pages/Overview";
// // import Analytics from "@/pages/Analytics";
// // import Trends from "@/pages/Trends";
// // import Users from "@/pages/Users";
// // import Sales from "@/pages/Sales";
// // import Performance from "@/pages/Performance";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page Route */}
//         <Route path="/" element={<LandingPage/>} />

//         {/* Routes with Sidebar Layout */}
//         <Route path="/prompt" element={<DashboardLayout />}>
//           {/* <Route index element={<Overview />} />
//           <Route path="analytics" element={<Analytics />} />
//           <Route path="trends" element={<Trends />} />
//           <Route path="users" element={<Users />} />
//           <Route path="sales" element={<Sales />} />
//           <Route path="performance" element={<Performance />} /> */}
//         </Route>
//         <Route path="/results" element={<ResultsPage />} />
//       </Routes>
//     </Router>
//   );
// }


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultsPage from "@/pages/ResultsPage";
import { AIProvider } from "@/context/AIContext";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./pages/DashboardLayout";

const App = () => {
  return (
    <AIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/prompt" element={<DashboardLayout />}>
{/* //           <Route index element={<Overview />} />
//           <Route path="analytics" element={<Analytics />} />
//           <Route path="trends" element={<Trends />} />
//           <Route path="users" element={<Users />} />
//           <Route path="sales" element={<Sales />} />
//           <Route path="performance" element={<Performance />} /> */}
         </Route>
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </AIProvider>
  );
};

export default App;