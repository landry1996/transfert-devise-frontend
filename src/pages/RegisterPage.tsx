import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, CircularProgress } from '@mui/material';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setMessage('Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);
        try {
            await registerUser({ name, email, password });
            setMessage('Inscription réussie ! Redirection vers la page de connexion...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessage("Erreur lors de l'inscription.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Inscription
                </Typography>

                <Box my={2}>
                    <TextField
                        label="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "S'inscrire"}
                    </Button>
                    {message && <Typography>{message}</Typography>}
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;