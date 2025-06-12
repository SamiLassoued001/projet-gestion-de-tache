import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // ✅ redirection

  const sendCode = async () => {
    try {
      await axios.post("http://localhost:5000/auth/request-reset", { email });
      setStep(2);
      setMessage("📩 Code envoyé à votre email.");
    } catch (err) {
      setMessage("❌ Email introuvable ou erreur d’envoi.");
    }
  };

  const verifyCode = async () => {
    try {
      await axios.post("http://localhost:5000/auth/verify-reset-code", { email, code });
      setStep(3);
      setMessage("✅ Code vérifié. Entrez le nouveau mot de passe.");
    } catch {
      setMessage("❌ Code incorrect ou expiré.");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:5000/auth/reset-password", {
        email,
        code,
        newPassword,
      });

      setSuccess(true);
      setMessage("✅ Mot de passe réinitialisé avec succès. Redirection...");
      
      // Attendre 2 secondes avant redirection
      setTimeout(() => {
        navigate("/login"); // ✅ redirection vers la page de login
      }, 2000);
    } catch {
      setMessage("❌ Erreur lors de la réinitialisation.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>Réinitialisation du mot de passe</Typography>

      {step === 1 && (
        <>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button fullWidth variant="contained" onClick={sendCode}>
            Envoyer le code
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <TextField
            label="Code reçu"
            fullWidth
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button fullWidth variant="contained" onClick={verifyCode}>
            Vérifier le code
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <TextField
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" onClick={resetPassword}>
            Réinitialiser le mot de passe
          </Button>
        </>
      )}

      {message && (
        <Typography mt={2} color={success ? "primary" : "error"}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ForgotPasswordForm;
