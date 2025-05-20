import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Utilisation de useNavigate

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();  // Récupérer le token depuis l'URL
  const navigate = useNavigate();  // Utilisation de useNavigate

  useEffect(() => {
    if (!token) {
      setMessage('Token de réinitialisation invalide.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `http://localhost:5000/user/reset/:token/${token}`,
        { password }
      );
      setMessage('Mot de passe réinitialisé avec succès.');
      setTimeout(() => {
        navigate('/login'); // Rediriger vers la page de connexion après la réinitialisation
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Une erreur est survenue');
    }

    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <h2>Réinitialiser votre mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Nouveau mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
