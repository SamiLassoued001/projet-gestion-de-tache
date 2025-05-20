import { useEffect, useMemo, useState } from "react";
import TopBar from "./../components/TopBar";
import SideBar from "./../components/SideBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../components/theme";
import axios from "axios";
import {
  PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
  CartesianGrid, XAxis, YAxis, Bar, BarChart
} from 'recharts';

export default function Dashboards() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("currentMode") || "light");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/users");
        const usersWithRole = res.data.data.filter(user => !!user.role);
        setUsers(usersWithRole);
      } catch (err) {
        console.error("Erreur fetch users:", err);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/tasks");
        setTasks(res.data.data);
      } catch (err) {
        console.error("Erreur fetch tasks:", err);
      }
    };

    fetchUsers();
    fetchTasks();
  }, []);

  const roleData = useMemo(() => {
    const roleCount = {};
    users.forEach(user => {
      roleCount[user.role] = (roleCount[user.role] || 0) + 1;
    });
    return Object.entries(roleCount).map(([role, value]) => ({
      name: role,
      value
    }));
  }, [users]);

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate >= sevenDaysAgo && taskDate <= today;
  });

  const tasksPerUser = useMemo(() => {
    const tasksCount = {};
    filteredTasks.forEach(task => {
      const userId = task.assignedTo;
      tasksCount[userId] = (tasksCount[userId] || 0) + 1;
    });

    return users.map(user => ({
      name: user.name,
      tasksCompleted: tasksCount[user._id] || 0
    }));
  }, [filteredTasks, users]);

  return (
    <ThemeProvider theme={theme}>
      <TopBar open={open} handleDrawerOpen={() => setOpen(true)} setMode={setMode} />
      <SideBar open={open} handleDrawerClose={() => setOpen(false)} />

      <div
        style={{
          backgroundColor: mode === "dark" ? "black" : "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        <div style={{ width: "100%", maxWidth: "600px", height: 300 }}>
          <h3 style={{ color: mode === "dark" ? "white" : "black" }}>Role Distribution</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: "100%", maxWidth: "600px", height: 300 }}>
          <h3 style={{ color: mode === "dark" ? "white" : "black" }}>Tasks Completed by User (Last 7 Days)</h3>
          <ResponsiveContainer>
            <BarChart data={tasksPerUser}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasksCompleted" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ThemeProvider>
  );
}
// import { useEffect, useMemo, useState } from "react";
// import TopBar from "./../components/TopBar";
// import SideBar from "./../components/SideBar";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { getDesignTokens } from "../components/theme";
// import axios from "axios";
// import {
//   PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
//   CartesianGrid, XAxis, YAxis, Bar, BarChart
// } from 'recharts';

// export default function Dashboards() {
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState(localStorage.getItem("currentMode") || "light");
//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

//   const [users, setUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/admin/users");
//         const usersWithRole = res.data.data.filter(user => !!user.role);
//         setUsers(usersWithRole);
//       } catch (err) {
//         console.error("Erreur fetch users:", err);
//       }
//     };

//     const fetchTasks = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/admin/tasks");
//         setTasks(res.data.data);
//       } catch (err) {
//         console.error("Erreur fetch tasks:", err);
//       }
//     };

//     fetchUsers();
//     fetchTasks();
//   }, []);

//   const roleData = useMemo(() => {
//     const roleCount = {};
//     users.forEach(user => {
//       roleCount[user.role] = (roleCount[user.role] || 0) + 1;
//     });
//     return Object.entries(roleCount).map(([role, value]) => ({
//       name: role,
//       value
//     }));
//   }, [users]);

//   const today = new Date();
//   const sevenDaysAgo = new Date(today);
//   sevenDaysAgo.setDate(today.getDate() - 7);

//   const filteredTasks = tasks.filter(task => {
//     const taskDate = new Date(task.date);
//     return taskDate >= sevenDaysAgo && taskDate <= today;
//   });

//   const tasksPerUser = useMemo(() => {
//     const tasksCount = {};
//     filteredTasks.forEach(task => {
//       const userId = task.assignedTo;
//       tasksCount[userId] = (tasksCount[userId] || 0) + 1;
//     });

//     return users.map(user => ({
//       name: user.name,
//       tasksCompleted: tasksCount[user._id] || 0
//     }));
//   }, [filteredTasks, users]);

//   return (
//     <ThemeProvider theme={theme}>
//       <TopBar open={open} handleDrawerOpen={() => setOpen(true)} setMode={setMode} />
//       <SideBar open={open} handleDrawerClose={() => setOpen(false)} />

//       <div
//         style={{
//           backgroundColor: mode === "dark" ? "black" : "white",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//           padding: "20px",
//           flexWrap: "wrap",
//           gap: "20px"
//         }}
//       >
//         <div style={{ width: "100%", maxWidth: "600px", height: 300 }}>
//           <h3 style={{ color: mode === "dark" ? "white" : "black" }}>Role Distribution</h3>
//           <ResponsiveContainer>
//             <PieChart>
//               <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div style={{ width: "100%", maxWidth: "600px", height: 300 }}>
//           <h3 style={{ color: mode === "dark" ? "white" : "black" }}>Tasks Completed by User (Last 7 Days)</h3>
//           <ResponsiveContainer>
//             <BarChart data={tasksPerUser}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="tasksCompleted" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// }
