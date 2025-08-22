import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const VoiceTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [listening, setListening] = useState(false);
  const [speechText, setSpeechText] = useState("");

  // ✅ Fetch existing expenses on load
  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then((res) => res.json())
      .then((data) => setTransactions(data.expenses))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  // ✅ Parser: Convert spoken text into {amount, category, description}
  const parseExpense = (text) => {
    text = text.toLowerCase();

    // Extract first number as amount
    const amountMatch = text.match(/\d+/);
    const amount = amountMatch ? parseFloat(amountMatch[0]) : null;

    // Guess category based on keywords
    let category = "General";
    if (text.includes("food") || text.includes("dinner") || text.includes("lunch"))
      category = "Food";
    else if (text.includes("travel") || text.includes("uber") || text.includes("bus") || text.includes("taxi"))
      category = "Travel";
    else if (text.includes("shopping") || text.includes("clothes"))
      category = "Shopping";
    else if (text.includes("movie") || text.includes("entertainment"))
      category = "Entertainment";

    const description = text;

    if (!amount) return null;
    return { description, amount, category };
  };

  // ✅ Start voice input
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setSpeechText(transcript);
      setListening(false);

      const parsedExpense = parseExpense(transcript);
      console.log("🎙 Parsed Expense:", parsedExpense);

      if (parsedExpense) {
        try {
          // Send to backend
          const resAdd = await fetch("http://localhost:5000/add_expense", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsedExpense),
          });

          const result = await resAdd.json();
          console.log("✅ Backend response:", result);

          // Fetch updated expenses
          const res = await fetch("http://localhost:5000/expenses");
          const data = await res.json();
          console.log("📊 Updated Expenses:", data.expenses);
          setTransactions(data.expenses);
        } catch (err) {
          console.error("❌ Error saving expense:", err);
        }
      } else {
        alert("Could not detect amount/category. Please try again.");
      }
    };

    recognition.onerror = (err) => {
      console.error("🎤 Speech recognition error:", err);
      setListening(false);
    };
  };

  return (
    <div style={{ backgroundColor: "#eaf3ff", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#0066cc",
          borderBottom: "3px solid #004080",
        }}
        className="text-center py-3"
      >
        <h2 className="text-white fw-bold">🎤 FinVoice - Expense Tracker</h2>
      </header>

      {/* Card Container */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div
              className="card shadow p-3"
              style={{
                borderRadius: "12px",
                background: "#ffffff",
                fontSize: "0.9rem",
              }}
            >
              {/* Button + Info */}
              <div className="text-center mb-2">
                <button
                  className="btn btn-primary btn-sm"
                  style={{
                    borderRadius: "6px",
                    padding: "0.4rem 1rem",
                    fontSize: "0.9rem",
                  }}
                  onClick={handleVoiceInput}
                  disabled={listening}
                >
                  {listening ? "🎙 Listening..." : "🎙 Speak Expense"}
                </button>
                <p className="text-muted mt-1" style={{ fontSize: "0.8rem" }}>
                  {speechText
                    ? `Heard: "${speechText}"`
                    : "Click on mic and say: 'I spent 200 on food'"}
                </p>
              </div>

              {/* Expenses Table */}
              <h6 className="fw-bold mb-2">Recent Expenses</h6>
              {transactions.length === 0 ? (
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  No expenses yet.
                </p>
              ) : (
                <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered table-hover text-center"
                    style={{
                      borderRadius: "8px",
                      overflow: "hidden",
                      fontSize: "0.85rem",
                    }}
                  >
                    <thead
                      style={{
                        backgroundColor: "#0066cc",
                        color: "white",
                        fontSize: "0.9rem",
                      }}
                    >
                      <tr>
                        <th>Date</th>
                        <th>Amount (₹)</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
  {transactions.map((t, i) => {
    const formattedDate = new Date(t.ts).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return (
      <tr key={i}>
        <td>{formattedDate}</td>
        <td>{t.amount}</td>
        <td>{t.category}</td>
      </tr>
    );
  })}
</tbody>

                  </table>
                </div>
              )}

              {/* Insights */}
              <div className="mt-2">
                <h6 className="fw-semibold" style={{ fontSize: "1rem" }}>
                  💡 Insights
                </h6>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Your spend in the last 30 days is{" "}
                  <b>
                    ₹
                    {transactions.reduce(
                      (a, t) => a + parseFloat(t.amount || 0),
                      0
                    )}
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceTracker;
