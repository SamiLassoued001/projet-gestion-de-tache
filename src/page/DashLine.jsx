import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  Legend as LineLegend,
  PieChart,
  Pie,
  Tooltip as PieTooltip,
  Legend as PieLegend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Card, CardContent } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import { motion } from "framer-motion";
import AppLayout from "../components/AppLayout";

const hours = Array.from(
  { length: 10 },
  (_, i) => `${String(9 + i).padStart(2, "0")}:00`
);

const getCurrentWeekDates = () => {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return {
      label: date.toLocaleDateString("fr-FR", { weekday: "long" }),
      shortLabel: date.toLocaleDateString("fr-FR", { weekday: "short" }),
      fullDate: date.toISOString().split("T")[0],
    };
  });
};

const WeeklyMeetingPlannerWithDates = () => {
  const [meetings, setMeetings] = useState({});
  const [weekDates, setWeekDates] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dates = getCurrentWeekDates();
    setWeekDates(dates);
    fetchMeetingsFromDB(dates);
    fetchUsers();
  }, []);

  const fetchMeetingsFromDB = async (dates) => {
    try {
      const res = await fetch("http://localhost:5000/meetings");
      const data = await res.json();
      const formatted = {};
      data.forEach(({ date, hour }) => {
        formatted[`${date}-${hour}`] = true;
      });
      setMeetings(formatted);
      transformDataForChart(formatted, dates);
    } catch (err) {
      console.error("Erreur lors du chargement des réunions :", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/users");
      const data = await res.json();
      const usersList = Array.isArray(data?.data)
        ? data.data
        : data?.users ?? [];

      const usersWithRole = usersList.filter((u) => u?.role);
      setUsers(usersWithRole);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
      setUsers([]);
    }
  };

  const transformDataForChart = (meetingsData, dates) => {
    const hourlyData = hours.map((hour) => {
      const hourData = { name: hour };
      dates.forEach(({ shortLabel, fullDate }) => {
        const key = `${fullDate}-${hour}`;
        hourData[shortLabel] = meetingsData[key] ? 1 : 0;
      });
      return hourData;
    });
    setChartData(hourlyData);
  };

  const colors = [
    "#1976d2",
    "#ef5350",
    "#66bb6a",
    "#ff9800",
    "#9c27b0",
    "#26c6da",
    "#8d6e63",
  ];

  const roleData = useMemo(() => {
    const roleCount = {};
    users.forEach((user) => {
      if (user?.role) {
        roleCount[user.role] = (roleCount[user.role] || 0) + 1;
      }
    });

    return Object.entries(roleCount)
      .map(([role, value]) => ({
        name: typeof role === "string" ? role : "Inconnu",
        value: Number.isFinite(value) ? value : 0,
      }))
      .filter((d) => d.name && Number.isFinite(d.value));
  }, [users]);

  const CardBox = ({ title, icon, children, fullWidth = false, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{ gridColumn: fullWidth ? "span 3" : "span 1" }}
    >
      <Card
        sx={{
          minHeight: fullWidth ? 460 : 380,
          borderRadius: 4,
          boxShadow: 4,
          transition: "0.3s",
          ":hover": { boxShadow: 6, transform: "scale(1.01)" },
          display: "flex",
          flexDirection: "column",
          px: 2,
        }}
      >
        <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Typography
            variant="h6"
            align="center"
            fontSize="1.2rem"
            fontWeight="medium"
            mb={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            {icon} {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <AppLayout>
      {/* <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          📊 Planification des réunions par heure
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "center", overflowX: "auto" }}
        >
          <LineChart
            width={800}
            height={400}
            data={chartData}
            margin={{ top: 30, right: 30, left: 30, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-30} textAnchor="end" height={60} />
            <YAxis
              tickCount={6}
              domain={[0, "dataMax + 1"]}
              allowDecimals={false}
              label={{ value: "Réunions", angle: -90, position: "insideLeft" }}
            />
            <LineTooltip />
            <LineLegend verticalAlign="top" height={36} />
            {weekDates.map(({ shortLabel }, index) => (
              <Line
                key={shortLabel}
                type="monotone"
                dataKey={shortLabel}
                stroke={colors[index % colors.length]}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </Box>
      </Box> */}

      <ResponsiveContainer width="100%" height={600}>
        <PieChart>
          <Pie
            data={roleData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={170}
            label
          >
            {roleData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["violet", "blue", "yellow"][index % 3]}
              />
            ))}
          </Pie>
          <PieTooltip />
          <PieLegend />
        </PieChart>
      </ResponsiveContainer>
    </AppLayout>
  );
};

export default WeeklyMeetingPlannerWithDates;
