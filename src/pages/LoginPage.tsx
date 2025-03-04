import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, CircularProgress } from '@mui/material';
import { authenticateUser } from '../services/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setMessage('Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);
        try {
            const response = await authenticateUser({ email, password });
            console.log('Réponse du backend:', response);

            const { access_token, refresh_token, user } = response.data;

            if (access_token) {
                localStorage.setItem('token', access_token);
                console.log('Token stocké:', localStorage.getItem('token'));
            } else {
                console.error('Access Token is undefined');
            }

            console.log('Données utilisateur à dispatcher:', user);
            dispatch(setUser({ userId: user.userId, name: user.name, email: user.email }));


            navigate('/accounts');
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setMessage('Erreur lors de la connexion. Vérifiez vos identifiants.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Connexion
                </Typography>

                <Box my={2}>
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
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Se connecter'}
                    </Button>
                    {message && <Typography color="error">{message}</Typography>}
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;