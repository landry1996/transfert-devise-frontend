import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2077',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (data: { name: string; email: string; password: string }) =>
    api.post('/api/user/register', data);

export const authenticateUser = (data: { email: string; password: string }) =>
    api.post('/api/user/authenticate', data);

export const addAccount = (data: { userId: number; currency: string; balance: number }) =>
    api.post('/api/compte', data);

export const getAllUsersWithAccounts = () => api.get('/api/user/compte');

export const getExchangeRate = (fromCurrency: string, toCurrency: string) =>
    api.get(`/api/Exchange-Rate/USD-CAD/${fromCurrency}/${toCurrency}`);

export const transferMoney = (data: {
    accountSourceId: number;
    accountDestinationId: number;
    amount: number;
}) => api.post('/api/transfert', data);