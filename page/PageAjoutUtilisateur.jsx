import React, { useState } from "react";

import {
  Box,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import Head from "../components/Head";
import RequireAdminAuth from "../components/RequireAdminAuth";

const roles = [
  { value: "user", label: "Utilisateur" },
  { value: "manager", label: "Manager" },
];

const PageAjoutUtilisateur = () => {
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/signup", formData);
      setSnackbar({
        open: true,
        message: "Compte créé avec succès.",
        severity: "success",
      });
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "user",
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur lors de la création.";
      setSnackbar({
        open: true,
        message: msg,
        severity: "error",
      });
    }
  };

  return (
    <RequireAdminAuth>
    <AppLayout>
       

      <Box sx={{ p: 4 }}>
        <Head title="Créer un utilisateur" subTitle="Ajouter un nouveau compte" align="left" />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: 600, mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nom complet"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Mot de passe"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            select
            label="Rôle"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" color="primary">
            Créer le compte
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AppLayout>    </RequireAdminAuth>

  );
};

export default PageAjoutUtilisateur;
