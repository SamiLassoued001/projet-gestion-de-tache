import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper } from "@mui/material";
import Head from "../components/Head";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

const TabManager = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      const onlyManagers = res.data.data.filter(user => user.role === "user");
      setUsers(onlyManagers);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs :", err);
    }
  };

  const createTaskForUser = (userId) => {
    navigate("/manager/create-task", { state: { userId } });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Nom",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Téléphone",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" width="100%">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => createTaskForUser(row._id)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              py: 0.5,
              borderRadius: "8px",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
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
        <Paper elevation={3} sx={{ mt: 3, p: 2, borderRadius: 3 }}>
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
            hideFooterPagination
            hideFooterSelectedRowCount
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f4f6f8",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f0f8ff",
              },
              "& .MuiDataGrid-cell": {
                textAlign: "center",
              },
              borderRadius: 2,
            }}
          />
        </Paper>
      </Box>
    </AppLayout>
  );
};

export default TabManager;
