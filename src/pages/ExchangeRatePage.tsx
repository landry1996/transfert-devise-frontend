import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, TextField, CircularProgress } from '@mui/material';
import { getExchangeRate } from '../services/api';

const ExchangeRatePage: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('CAD');
    const [rate, setRate] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFetchRate = async () => {
        if (!fromCurrency || !toCurrency) {
            setMessage('Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);
        try {
            const response = await getExchangeRate(fromCurrency, toCurrency);
            setRate(response.data);
        } catch (error) {
            setMessage('Erreur lors de la récupération du taux de change.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Taux de change
                </Typography>

                <Box my={2}>
                    <TextField
                        label="Devise source"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Devise cible"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFetchRate}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Récupérer le taux'}
                    </Button>
                    {rate !== null && (
                        <Typography variant="h6" gutterBottom>
                            Taux de change: 1 {fromCurrency} = {rate} {toCurrency}
                        </Typography>
                    )}
                    {message && <Typography color="error">{message}</Typography>}
                </Box>
            </Box>
        </Container>
    );
};

export default ExchangeRatePage;