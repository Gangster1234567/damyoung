import { Routes, Route, Navigate } from "react-router-dom";
import Splash from "./pages/Splash.jsx";
import Gate from "./pages/Gate.jsx";
import Home from "./pages/Home.jsx";
import Letter from "./pages/Letter.jsx";
import Time from "./pages/Time.jsx";
import Quiz from "./pages/Quiz.jsx";
import Gift from "./pages/Gift";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/gate" element={<Gate />} />
      <Route path="/home" element={<Home />} />
      <Route path="/letter" element={<Letter />} />
      <Route path="/time" element={<Time />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/gift" element={<Gift />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
