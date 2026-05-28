import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const OAuthSuccess = ({ setUser }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = searchParams.get('token');

            if (token) {
                // 1. Save Token to LocalStorage
                localStorage.setItem('token', token);

                try {
                    // 2. Fetch authenticated profile details using Token header
                    const res = await axios.get('http://localhost:5000/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    // 3. Set profile structure and push to app landing
                    setUser(res.data);
                    navigate('/');
                } catch (err) {
                    console.error("Failed to fetch user with OAuth token:", err);
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        fetchUserData();
    }, [searchParams, navigate, setUser]);

    return (
        <div style={loadingStyles.container}>
            <div style={loadingStyles.spinner}></div>
            <p style={loadingStyles.text}>Completing secure sign-in...</p>
        </div>
    );
};

const loadingStyles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0d0d1a',
        color: '#e2e8f0',
        fontFamily: "sans-serif"
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255,255,255,0.1)',
        borderTopColor: '#6366f1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px'
    },
    text: { fontSize: '16px', color: '#94a3b8' }
};

export default OAuthSuccess;