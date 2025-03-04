import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, TextField, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { addAccount, getAllUsersWithAccounts } from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";

interface Account {
    id: number;
    currency: string;
    balance: number;
}

const AccountsPage: React.FC = () => {
    const [currency, setCurrency] = useState('');
    const [balance, setBalance] = useState<number | ''>('');
    const [users, setUsers] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const userId = useSelector((state: RootState) => state.user.userInfo?.userId ?? null);
    console.log('User ID après rafraîchissement:', userId);

    console.log("User ID:", userId);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsersWithAccounts();
                setUsers(response.data);
            } catch (error) {
                setMessage('Erreur lors du chargement des utilisateurs.');
            }
        };
        fetchUsers();
    }, []);

    const handleAddAccount = async () => {
        if (!currency || !balance) {
            setMessage('Veuillez remplir tous les champs.');
            return;
        }

        if (userId === null) {
            setMessage("L'utilisateur n'est pas authentifié.");
            return;
        }

        setLoading(true);
        try {
            await addAccount({ userId, currency, balance: Number(balance) });

            const response = await getAllUsersWithAccounts();
            setUsers(response.data);

            setMessage('Compte ajouté avec succès !');
            setCurrency('');
            setBalance('');
        } catch (error) {
            setMessage('Erreur lors de l\'ajout du compte.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Gestion des comptes
                </Typography>

                <Box my={2}>
                    <TextField
                        label="Devise"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Solde"
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddAccount}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Ajouter un compte'}
                    </Button>
                    {message && <Typography>{message}</Typography>}
                </Box>

                <Typography variant="h5" gutterBottom>
                    Liste des utilisateurs et leurs comptes
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Comptes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.accounts.map((account: Account) => (
                                            <div key={account.id}> {/* Clé unique ajoutée ici */}
                                                {account.currency}: {account.balance}
                                            </div>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default AccountsPage;