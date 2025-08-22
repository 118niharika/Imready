import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Get profile from localStorage or fallback to defaults
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {
    name: "Guest",
    age: "-",
    work: "-",
    salary: "-",
    investment: "-"
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          background: "#6a11cb",
          color: "white",
        }}
      >
        <h2>FinVoice Dashboard</h2>
        <div>
          <button
            onClick={() => setShowProfile(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Profile
          </button>
        </div>
      </nav>

      {/* Features */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          padding: "2rem",
        }}
      >
        <div onClick={() => navigate("/voice-tracker")} style={cardStyle}>
          🎤 Voice Tracker
        </div>
        <div onClick={() => navigate("/analytics")} style={cardStyle}>
          📊 Analytics
        </div>
        <div onClick={() => navigate("/reports")} style={cardStyle}>
          📑 Reports
        </div>
        <div onClick={() => navigate("/settings")} style={cardStyle}>
          ⚙️ Settings
        </div>
      </div>

      {/* Profile Popup */}
      {showProfile && (
        <div style={popupOverlay} onClick={() => setShowProfile(false)}>
          <div style={popupContent} onClick={(e) => e.stopPropagation()}>
            <h2>Profile Details</h2>
            <p>
              <strong>Name:</strong> {userProfile.name}
            </p>
            <p>
              <strong>Age:</strong> {userProfile.age}
            </p>
            <p>
              <strong>Work:</strong> {userProfile.work}
            </p>
            <p>
              <strong>Salary:</strong> {userProfile.salary}
            </p>
            <p>
              <strong>Investment:</strong> {userProfile.investment}
            </p>
            <button onClick={() => setShowProfile(false)} style={closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Card styling
const cardStyle = {
  padding: "2rem",
  background: "#f4f4f4",
  borderRadius: "12px",
  textAlign: "center",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "500",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

// Hover effect
cardStyle[":hover"] = {
  transform: "scale(1.05)",
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
};

const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupContent = {
  background: "white",
  padding: "2rem",
  borderRadius: "12px",
  width: "400px",
  maxWidth: "90%",
  textAlign: "left",
};

const closeBtn = {
  marginTop: "1rem",
  padding: "0.5rem 1rem",
  background: "rgb(51, 47, 248)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Dashboard;
