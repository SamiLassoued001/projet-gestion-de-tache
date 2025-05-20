import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import {
  LockOpenOutlined,
  SecurityOutlined,
 
} from "@mui/icons-material";
import Head from "../components/Head";
import AppLayout from "../components/AppLayout";
import RequireAdminAuth from "../components/RequireAdminAuth";

const Team = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      const usersWithId = res.data.data.map((u, index) => ({
        ...u,
        id: u._id || index, // Ajout ID requis par DataGrid
      }));
      setUsers(usersWithId);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "name", headerName: "Nom", flex: 1, align: "center", headerAlign: "center" },
    { field: "email", headerName: "Email", flex: 1, align: "center", headerAlign: "center" },
    { field: "phone", headerName: "Téléphone", flex: 1, align: "center", headerAlign: "center" },
    {
      field: "role",
      headerName: "Rôle",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { role } }) => (
        <Box
          sx={{
            p: "5px",
            width: "99px",
            borderRadius: "3px",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              role === "user"
                ? "#1976d2"
                : role === "Manager"
                ? "#f57c00"
                : "#388e3c",
          }}
        >
          
          {role === "Manager" && (
            <SecurityOutlined sx={{ color: "#fff" }} fontSize="small" />
          )}
          {role === "User" && (
            <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />
          )}
          <Typography sx={{ fontSize: "13px", color: "#fff", ml: 1 }}>
            {role}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <RequireAdminAuth>
    <AppLayout>


    <Box m={4}>
     
    

      <Head title="L’équipe" subTitle="Gestion des membres de l’équipe" align="left" />
      <Box sx={{ height: 600, mt: 2 }}>
        <DataGrid
          rows={users}
          // @ts-ignore
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
    </Box>
    </AppLayout>
    </RequireAdminAuth>

  );
};

export default Team;
