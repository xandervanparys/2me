import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const params = new URLSearchParams(window.location.search);
            const authToken = params.get('token');

            if (authToken) {
                console.log('Storing token:', authToken); // Debug log
                localStorage.setItem('authToken', authToken);
                navigate('/home');
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default LoginPage;
