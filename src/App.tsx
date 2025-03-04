import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TransferPage from './pages/TransferPage';
import AccountsPage from './pages/AccountsPage';
import ExchangeRatePage from './pages/ExchangeRatePage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { clearUser } from './store/slices/userSlice';
import './App.css';

function App() {
    const user = useSelector((state: RootState) => state.user.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                <nav>
                    <ul>
                        <li>
                            <MuiLink component={Link} to="/" color="inherit">
                                Accueil
                            </MuiLink>
                        </li>
                        {!user && (
                            <>
                                <li>
                                    <MuiLink component={Link} to="/login" color="inherit">
                                        Connexion
                                    </MuiLink>
                                </li>
                                <li>
                                    <MuiLink component={Link} to="/register" color="inherit">
                                        Inscription
                                    </MuiLink>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li>
                                    <MuiLink component={Link} to="/accounts" color="inherit">
                                        Comptes
                                    </MuiLink>
                                </li>
                                <li>
                                    <MuiLink component={Link} to="/transfer" color="inherit">
                                        Transfert
                                    </MuiLink>
                                </li>
                                <li>
                                    <MuiLink component={Link} to="/exchange-rate" color="inherit">
                                        Taux de change
                                    </MuiLink>
                                </li>
                                <li>
                                    <MuiLink
                                        component="button"
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            dispatch(clearUser());
                                            navigate('/login');
                                        }}
                                        color="inherit"
                                        sx={{ textDecoration: 'none', cursor: 'pointer' }}
                                    >
                                        Déconnexion
                                    </MuiLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/accounts"
                    element={user ? <AccountsPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/transfer"
                    element={user ? <TransferPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/exchange-rate"
                    element={user ? <ExchangeRatePage /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to={user ? '/accounts' : '/login'} />} />
            </Routes>
        </div>
    );
}

export default App;