import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  MenuItem,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/user/signup", formData);

      setMessage(res.data.message || "Inscription réussie.");

      // Stocker le token et l'utilisateur si disponible
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // Redirection selon le rôle
      if (formData.role === "manager") {
        navigate("/manager");
      } else if (formData.role === "user") {
        navigate("/user");
      } else {
        navigate("/login");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      });

    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        justifyContent="center"
        alignItems="center"
        height="100vh"
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
          Créer un compte
        </Typography>

        <TextField
          label="Nom"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Téléphone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Rôle"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="">-- Sélectionnez un rôle --</MenuItem>
          <MenuItem value="user">Utilisateur</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </TextField>

        {message && (
          <Typography color={message.includes("réussie") ? "green" : "error"}>
            {message}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          S'inscrire
        </Button>

        <Typography variant="body2">
          Déjà inscrit ?{" "}
          <Link
            href="/login"
            underline="hover"
            sx={{ cursor: "pointer", fontWeight: "bold" }}
          >
            Se connecter
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupForm;
