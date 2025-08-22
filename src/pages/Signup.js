import React, { useState } from "react";
import { FaUser, FaBriefcase, FaMoneyBill, FaChartLine, FaLock } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Auth.css";  // ✅ new shared css

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    work: "",
    salary: "",
    investment: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);

    // Save to localStorage (mock auth for now)
    localStorage.setItem("userProfile", JSON.stringify(form));

    // Redirect to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaBirthdayCake className="icon" />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaBriefcase className="icon" />
            <input
              type="text"
              name="work"
              placeholder="Work"
              value={form.work}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaMoneyBill className="icon" />
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={form.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaChartLine className="icon" />
            <input
              type="text"
              name="investment"
              placeholder="Preferred Investment Type"
              value={form.investment}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Sign Up →</button>
          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
