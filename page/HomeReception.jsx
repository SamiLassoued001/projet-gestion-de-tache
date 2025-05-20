import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

const HomeReception = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminAccess = () => {
    if (adminPassword === "admin123") {
      // ✅ Stocker un faux utilisateur "admin"
      const adminUser = {
        name: "Administrateur",
        role: "admin",
        avatar: "", // Tu peux ajouter une URL d'image ici
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.setItem("isAdminAuthenticated", "true");

      // ✅ Supprimer le focus pour éviter aria-hidden error
      document.activeElement.blur();

      // ✅ Fermer le Dialog
      setError("");
      setOpenDialog(false);

      // ✅ Attendre un peu avant de rediriger
      setTimeout(() => {
        navigate("/admin");
      }, 100);
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Bienvenue sur la plateforme
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Choisissez une option pour continuer
        </Typography>

        <Box mt={4} display="flex" flexDirection="column" gap={2} width="100%">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AdminPanelSettingsIcon />}
            size="large"
            fullWidth
            onClick={() => {
              setOpenDialog(true);
              setError(""); // Réinitialise l'erreur
            }}
          >
            Accès Admin (Mot de passe)
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<PersonAddIcon />}
            size="large"
            fullWidth
            onClick={() => navigate("/signup")}
          >
            Créer un compte (Utilisateur / Manager)
          </Button>
        </Box>

        {/* 🔐 Modal d'accès admin */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Entrer le mot de passe Admin</DialogTitle>
          <DialogContent>
            <TextField
              label="Mot de passe"
              type="password"
              fullWidth
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              autoFocus
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleAdminAccess} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default HomeReception;
