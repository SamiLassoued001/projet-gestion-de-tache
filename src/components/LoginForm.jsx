import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Link,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await axios.post("http://localhost:5000/user/login", {
        email: formData.email,
        password: formData.password,
      });

      const { user, accessToken } = res.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(`Bienvenue ${user.name} !`);

      if (user.role === "manager") {
        navigate("/manager");
      } else if (user.role === "user") {
        navigate("/user");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("❌ Erreur de connexion:", error);
      setMessage(
        error.response?.data?.message || "Erreur de connexion. Vérifiez vos identifiants."
      );
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
          Connexion
        </Typography>

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          fullWidth
          required
          value={formData.password}
          onChange={handleChange}
        />

        {message && (
          <Typography color={message.includes("Bienvenue") ? "green" : "error"}>
            {message}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Se connecter
        </Button>

        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          mt={1}
        >
          <Link href="/forgot" underline="hover">
            Mot de passe oublié ?
          </Link>
          <Link href="/signup" underline="hover">
            Créer un compte
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
