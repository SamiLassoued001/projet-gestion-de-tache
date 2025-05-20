import { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Head from "../components/Head";

const TabUser = () => {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId"); // Assure-toi que ce champ est bien stocké au login

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cheftasks/user/${userId}`);
      setTasks(res.data.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des tâches :", err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (userId) {
      fetchTasks();
    } else {
      console.warn("Aucun userId trouvé dans le localStorage.");
    }
  }, [userId]);

  const columns = [
    { field: "title", headerName: "Nom de la tâche", flex: 1 },
    { field: "startDate", headerName: "Date de début", flex: 1 },
    { field: "endDate", headerName: "Date de fin", flex: 1 },
    { field: "userName", headerName: "Utilisateur", flex: 1 },
    { field: "userId", headerName: "ID utilisateur", flex: 1 },
    { field: "managerName", headerName: "Manager", flex: 1 },
    { field: "managerId", headerName: "ID Manager", flex: 1 },
  ];

  const rows = tasks.map((task) => ({
    id: task._id,
    title: task.title,
    startDate: task.startDate?.slice(0, 10),
    endDate: task.endDate?.slice(0, 10),
    userName: task.userName,
    userId: task.userId,
    managerName: task.managerName,
    managerId: task.managerId,
  }));

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        <Head
          title="Tâches des utilisateurs"
          subTitle="Liste des tâches attribuées par les managers"
          align="left"
        />
        <Box sx={{ height: 600, mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            autoHeight
          />
        </Box>
      </Box>
    </AppLayout>
  );
};

export default TabUser;
