import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/analytics")  // ✅ same port as voice.py
      .then((res) => res.json())
      .then((result) => {
        console.log("📊 Analytics response:", result);

        // ✅ use result.categories instead of result.category_summary
        const chartData = Object.entries(result.categories).map(([key, value]) => ({
          name: key,
          value: value,
        }));

        setData(chartData);

        // Calculate total spend
        const totalSpend = chartData.reduce((sum, item) => sum + item.value, 0);
        setTotal(totalSpend);
      })
      .catch((err) => console.error("❌ Error fetching analytics:", err));
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="container mt-4">
      <div className="card shadow p-3" style={{ borderRadius: "12px" }}>
        <h3 className="text-center text-primary mb-3">📊 Expense Analytics</h3>
        <div className="d-flex justify-content-center">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <h5 className="text-center mt-3">
          💰 Total Spend: <span className="fw-bold text-success">₹{total}</span>
        </h5>
      </div>
    </div>
  );
};

export default Analytics;
