// @ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Head from "../components/Head";
import { useNavigate } from "react-router-dom";

const PageAdmin = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const navigate = useNavigate();

  // ✅ Sécurité : rediriger si non admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = localStorage.getItem("isAdminAuthenticated") === "true";

    if (!isAdmin || user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Récupération des utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      const usersWithId = res.data.data.map((u, index) => ({
        ...u,
        id: u._id || index,
      }));
      setUsers(usersWithId);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Suppression
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  // ✅ Edition
  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/admin/users/${selectedUser._id}`,
        selectedUser
      );
      setOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Téléphone",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(row)}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => deleteUser(row._id)}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        <Head
          title="Administration"
          subTitle="Gérer les utilisateurs inscrits"
          align="left"
        />
        <Box sx={{ height: 600, mt: 2 }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Nom"
              fullWidth
              value={selectedUser.name || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              fullWidth
              value={selectedUser.email || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Téléphone"
              fullWidth
              value={selectedUser.phone || ""}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AppLayout>
  );
};

export default PageAdmin;
