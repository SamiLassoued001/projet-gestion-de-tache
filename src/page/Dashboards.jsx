import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../components/theme";
import AppLayout from "../components/AppLayout";

import {
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";

import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";

import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  LineChart,
  Line,
} from "recharts";

import { motion } from "framer-motion";

export default function Dashboards() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") || "light"
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [meetingsData, setMeetingsData] = useState([]);
  const [meetingsBarData, setMeetingsBarData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/users");
        const usersList = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data?.users ?? [];
        const usersWithRole = usersList.filter((u) => u?.role);
        setUsers(usersWithRole);
      } catch (err) {
        console.error("❌ Erreur utilisateurs :", err);
        setUsers([]);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/cheftasks");
        const taskList = Array.isArray(res.data?.data) ? res.data.data : [];
        setTasks(taskList);
      } catch (err) {
        console.error("❌ Erreur tâches :", err);
        setTasks([]);
      }
    };

    const fetchMeetings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/meetings");
        const meetings = res.data;

        // ✅ Line Chart Data
        const dailyCounts = meetings.reduce((acc, meeting) => {
          const date = new Date(meeting.date).toLocaleDateString("fr-FR");
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const lineData = Object.entries(dailyCounts).map(([date, count]) => ({
          date,
          reunions: count,
        }));
        setMeetingsData(lineData);

        // ✅ Bar Chart Data
        const rawCounts = meetings.reduce((acc, meeting) => {
          const date = meeting.date;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const barData = Object.entries(rawCounts)
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
        setMeetingsBarData(barData);
      } catch (err) {
        console.error("❌ Erreur réunions :", err);
        setMeetingsData([]);
        setMeetingsBarData([]);
      }
    };

    fetchUsers();
    fetchTasks();
    fetchMeetings();
  }, []);

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

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const filteredTasks = tasks.filter((task) => {
    if (!task?.date) return false;
    const taskDate = new Date(task.date);
    return taskDate >= sevenDaysAgo && taskDate <= today;
  });

  const tasksPerUser = useMemo(() => {
    const tasksCount = {};
    filteredTasks.forEach((task) => {
      const userId = task?.assignedTo;
      if (userId) {
        tasksCount[userId] = (tasksCount[userId] || 0) + 1;
      }
    });

    return users
      .map((user) => {
        const raw = tasksCount[user._id];
        const count = typeof raw === "number" && Number.isFinite(raw) ? raw : 0;
        return {
          name: user.name || "Inconnu",
          tasksCompleted: count,
        };
      })
      .filter((d) => d.name && Number.isFinite(d.tasksCompleted));
  }, [filteredTasks, users]);

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
            fontSize={isMobile ? "1rem" : "1.2rem"}
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
      <Paper
        elevation={2}
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          px: 3,
          py: 5,
          borderRadius: 3,
        }}
      >
        <Box mb={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Tableau de bord
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Vue d’ensemble des réunions, rôles et tâches assignées.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          <CardBox
            title="Planification des réunions de la semaine"
            icon={<TimelineIcon />}
            fullWidth
            delay={0}
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={meetingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="reunions"
                  stroke="#1976d2"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBox>

          <CardBox
            title="Répartition des rôles"
            icon={<PieChartIcon />}
            delay={0.2}
          >
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#1976d2"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardBox>

          <CardBox
            title="Nombre de réunions par date"
            icon={<BarChartIcon />}
            delay={0.4}
          >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={meetingsBarData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  allowDecimals={false}
                  domain={[0, "dataMax + 1"]}
                  tickCount={6}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="reunions" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </CardBox>

          {/* <CardBox title="Tâches réalisées par utilisateur" icon={<BarChartIcon />} delay={0.6}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tasksPerUser}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasksCompleted" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </CardBox> */}
        </Box>
      </Paper>
    </AppLayout>
  );
}
