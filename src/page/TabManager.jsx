import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import Head from "../components/Head";
import { useNavigate } from "react-router-dom"; // ✅ Import
import AppLayout from "../components/AppLayout";

const TabManager = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // ✅ Hook navigation

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      const onlyManagers = res.data.data.filter(user => user.role === "user");
      setUsers(onlyManagers);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs :", err);
    }
  };

  const createTaskForUser = () => {
    navigate("/manager" ); // ✅ Redirection avec userId
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "name", headerName: "Nom", flex: 1, align: "center", headerAlign: "center" },
    { field: "email", headerName: "Email", flex: 1, align: "center", headerAlign: "center" },
    { field: "phone", headerName: "Téléphone", flex: 1, align: "center", headerAlign: "center" },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => createTaskForUser(row._id)}
          >
            Créer une tâche
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        <Head title="Manager" subTitle="Créer des tâches pour les utilisateurs" align="left" />
        <Box sx={{ height: 600, mt: 2 }}>
          <DataGrid
            rows={users}
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

export default TabManager;
