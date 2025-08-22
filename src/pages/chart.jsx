// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function Chart() {
//   const [analytics, setAnalytics] = useState({ perDay: [], perWeek: [], perMonth: [], perYear: [] });
//   const [view, setView] = useState("perDay");

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   async function fetchAnalytics() {
//     let res = await fetch("http://localhost:5000/analytics");
//     let data = await res.json();
//     setAnalytics(data);
//   }

//   const data = {
//     labels: analytics[view].map((i) => i.day || i.week || i.month || i.year),
//     datasets: [
//       {
//         label: "Total Expense (₹)",
//         data: analytics[view].map((i) => i.total),
//         borderColor: "#2563eb",
//         backgroundColor: "rgba(37, 99, 235, 0.3)",
//         fill: true,
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
//       <h2 className="text-xl font-bold text-blue-700 mb-4">📊 Expense Analysis</h2>

//       <select
//         value={view}
//         onChange={(e) => setView(e.target.value)}
//         className="border rounded-lg p-2 mb-4"
//       >
//         <option value="perDay">Daily</option>
//         <option value="perWeek">Weekly</option>
//         <option value="perMonth">Monthly</option>
//         <option value="perYear">Yearly</option>
//       </select>

//       <Line data={data} />
//     </div>
//   );
// }
