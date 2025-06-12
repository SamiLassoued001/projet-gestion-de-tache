import { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Head from "../components/Head";
import AppLayout from "../components/AppLayout";

const TachesTraitees = () => {
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState({});

  const currentUser = JSON.parse(localStorage.getItem("auth"))?.user;

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/task/task");
      console.log("Toutes les tâches récupérées :", res.data);

      const filteredTasks = res.data.filter(
        (task) =>
          task.assignedByUser === currentUser._id && task.assignedUser
      );

      setTasks(filteredTasks);

      // Initialiser les champs commentaires à vide
      const initialComments = {};
      filteredTasks.forEach((task) => {
        initialComments[task._id] = task.managerComment || "";
      });
      setComments(initialComments);
    } catch (err) {
      console.error("Erreur lors de la récupération des tâches :", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCommentChange = (taskId, value) => {
    setComments((prev) => ({ ...prev, [taskId]: value }));
  };

  const submitComment = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/cheftasks/comment/${taskId}`, {
        comment: comments[taskId],
      });
      alert("Commentaire ajouté !");
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire :", err);
      alert("Erreur lors de l'envoi du commentaire");
    }
  };

  const columns = [
    { field: "title", headerName: "Titre", flex: 1 },
    { field: "content", headerName: "Contenu", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "status", headerName: "Statut", flex: 1 },
    {
      field: "userName",
      headerName: "Traité par",
      flex: 1,
      renderCell: (params) =>
        params.row.assignedUser?.name || "N/A",
    },
    {
      field: "commentaire",
      headerName: "Commentaire du manager",
      flex: 2,
      renderCell: ({ row }) => (
        <Box display="flex" gap={1}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Commentaire"
            value={comments[row._id] || ""}
            onChange={(e) => handleCommentChange(row._id, e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => submitComment(row._id)}
          >
            Envoyer
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        <Head
          title="Tâches traitées"
          subTitle="Liste des tâches assignées avec option de commentaire"
          align="left"
        />
        <Box sx={{ height: 600, mt: 2 }}>
          <DataGrid
            rows={tasks}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}
            autoHeight
          />
        </Box>
      </Box>
    </AppLayout>
  );
};

export default TachesTraitees;
