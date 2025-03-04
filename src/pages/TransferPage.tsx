import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, TextField, MenuItem, CircularProgress } from '@mui/material';
import { transferMoney, getAllUsersWithAccounts } from '../services/api';

interface Account {
    id: number;
    currency: string;
    balance: number;
}

interface User {
    userId: number;
    name: string;
    email: string;
    accounts: Account[];
}

const TransferPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [accountSourceId, setAccountSourceId] = useState<string>('');
    const [accountDestinationId, setAccountDestinationId] = useState<string>('');
    const [amount, setAmount] = useState<number | ''>('');
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [conversionCurrency, setConversionCurrency] = useState<string>('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAllUsersWithAccounts();
                console.log('Réponse de getAllUsersWithAccounts:', response.data);

                // Aplatir la liste des comptes avec typage explicite
                const allAccounts = response.data.flatMap((user: User) => user.accounts);
                console.log('Liste des comptes aplatie:', allAccounts);
                setAccounts(allAccounts);
            } catch (error) {
                setMessage('Erreur lors du chargement des comptes.');
            }
        };
        fetchAccounts();
    }, []);

    const handleAccountSourceChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        console.log('Valeur sélectionnée (Compte source):', value);
        setAccountSourceId(value);
        setConvertedAmount(null);
    };

    const handleAccountDestinationChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        console.log('Valeur sélectionnée (Compte destination):', value);
        setAccountDestinationId(value);
        setConvertedAmount(null);
    };

    const convertAmount = (amount: number, fromCurrency: string, toCurrency: string): number => {
        if (fromCurrency === toCurrency) {
            return amount;
        }
        if (fromCurrency === "USD" && toCurrency === "CAD") {
            return amount * 1.25; // Taux de change USD vers CAD
        }
        if (fromCurrency === "CAD" && toCurrency === "USD") {
            return amount / 1.25; // Taux de change CAD vers USD
        }
        throw new Error("Conversion non supportée");
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log('Montant saisi:', value);

        if (value !== '') {
            const amount = Number(value);
            setAmount(amount);

            // Récupérer les devises des comptes source et destination
            const sourceAccount = accounts.find(account => account.id === Number(accountSourceId));
            const destinationAccount = accounts.find(account => account.id === Number(accountDestinationId));

            if (sourceAccount && destinationAccount) {
                const fromCurrency = sourceAccount.currency;
                const toCurrency = destinationAccount.currency;

                try {
                    const converted = convertAmount(amount, fromCurrency, toCurrency);
                    setConvertedAmount(converted);
                    setConversionCurrency(toCurrency);
                }catch (error: unknown) {
                    setConvertedAmount(null);
                    setConversionCurrency('');

                    if (error instanceof Error) {
                        console.error(error.message);
                    } else {
                        console.error('Une erreur inconnue est survenue.');
                    }
                }
            }
        } else {
            setAmount('');
            setConvertedAmount(null);
            setConversionCurrency('');
        }
    };

    const handleTransfer = async () => {
        if (!accountSourceId || !accountDestinationId || !amount) {
            setMessage('Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);
        try {
            // Convertir les IDs en nombres avant l'envoi
            await transferMoney({
                accountSourceId: Number(accountSourceId),
                accountDestinationId: Number(accountDestinationId),
                amount: Number(amount),
            });
            setMessage('Transfert réussi !');
            // Réinitialiser les champs après un transfert réussi
            setAccountSourceId('');
            setAccountDestinationId('');
            setAmount('');
            setConvertedAmount(null);
            setConversionCurrency('');
        } catch (error) {
            setMessage('Erreur lors du transfert.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Transfert d'argent
                </Typography>

                <Box my={2}>
                    <TextField
                        select
                        label="Compte source"
                        value={accountSourceId}
                        onChange={handleAccountSourceChange}
                        fullWidth
                        margin="normal"
                        required
                    >
                        {accounts.map((account) => (
                            <MenuItem key={account.id} value={account.id.toString()}>
                                {account.currency} - {account.balance}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Compte destination"
                        value={accountDestinationId}
                        onChange={handleAccountDestinationChange}
                        fullWidth
                        margin="normal"
                        required
                    >
                        {accounts.map((account) => (
                            <MenuItem key={account.id} value={account.id.toString()}>
                                {account.currency} - {account.balance}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Montant"
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {convertedAmount !== null && (
                        <Typography variant="body1" gutterBottom>
                            Montant converti : {convertedAmount.toFixed(2)} {conversionCurrency}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleTransfer}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Effectuer le transfert'}
                    </Button>
                    {message && <Typography>{message}</Typography>}
                </Box>
            </Box>
        </Container>
    );
};

export default TransferPage;