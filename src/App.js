import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";   // swipeable home page
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VoiceTracker from "./pages/VoiceTracker";   // ✅ now using VoiceTracker.js
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <Routes>
        {/* Start with HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Then Login */}
        <Route path="/login" element={<Login />} />

        {/* Then Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Voice Tracker Page */}
        <Route path="/voice-tracker" element={<VoiceTracker />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
