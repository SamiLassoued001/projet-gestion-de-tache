import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const Dash = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/meetings")
      .then((res) => res.json())
      .then((meetings) => {
        const counts = meetings.reduce((acc, meeting) => {
          const date = meeting.date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(counts)
          .map(([date, count]) => {
            const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });

            return {
              date: formattedDate,
              reunions: Number.isFinite(count) ? count : 0,
            };
          })
          .filter((d) => d.date && Number.isFinite(d.reunions));

        setData(chartData);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des réunions :", error);
        setData([]);
      });
  }, []);

  return (
    <AppLayout>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            allowDecimals={false} // ✅ pas de virgules
            tickCount={6} // ✅ nombre approximatif de ticks
            domain={[0, "dataMax + 1"]} // ✅ commence à 0, va jusqu’à max+1
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="reunions" fill="#1976d2" /> {/* ✅ BLEU */}
        </BarChart>
      </ResponsiveContainer>
    </AppLayout>
  );
};

export default Dash;
