import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    id: 1,
    title: "Welcome",
    content: "Welcome to our app! Swipe to explore features.",
    style: { background: "#e0f2fe", color: "#0f172a" }, // light sky blue
  },
  {
    id: 2,
    title: "Smart Finance",
    content: "Track your expenses easily with AI-powered insights.",
    style: { background: "#bae6fd", color: "#0f172a" }, // light blue
  },
  {
    id: 3,
    title: "Secure Banking",
    content: "Your transactions are safe with enterprise-grade security.",
    style: { background: "#60a5fa", color: "white" }, // medium blue
  },
  {
    id: 4,
    title: "Get Started",
    content: "Sign up or login to begin your journey!",
    style: { background: "#1e3a8a", color: "white" }, // dark navy blue
  },
];

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => Math.min(prev + 1, sections.length - 1)),
    onSwipedRight: () => setIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f9ff",
      }}
    >
      <div {...handlers} style={{ position: "relative" }}>
        <motion.div
          key={sections[index].id}
          style={{
            width: "520px",
            minHeight: "400px",
            borderRadius: "16px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            padding: "2rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            ...sections[index].style,
          }}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 style={{ fontSize: "1.6rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {sections[index].title}
          </h1>
          <p style={{ fontSize: "1rem", marginBottom: "1.5rem" }}>{sections[index].content}</p>

          {/* ✅ Show Get Started button only on last card */}
          {index === sections.length - 1 && (
            <button
              onClick={() => navigate("/login")}
              style={{
                marginTop: "1rem",
                padding: "0.7rem 1.4rem",
                background: "white",
                color: "#1e3a8a",
                fontWeight: "bold",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              Get Started →
            </button>
          )}
        </motion.div>

        {/* ✅ Navigation dots */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: i === index ? "#1e3a8a" : "#9ca3af",
                border: "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
