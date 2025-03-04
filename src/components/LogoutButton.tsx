import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // Importez une icône
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearUser());
        navigate('/login');
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
        >
            Déconnexion
        </Button>
    );
};

export default LogoutButton;