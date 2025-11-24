import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api from '../services/api';

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await api.post('/auth/google', {
                token: credentialResponse.credential
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login failed", err);
            setError('Google Login failed. Please try again.');
        }
    };

    const handleGoogleError = () => {
        setError('Google Login Failed');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card max-w-md w-full space-y-8 animate-slide-up text-center">
                <div>
                    <h2 className="text-4xl font-serif font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-secondary">Sign in to continue</p>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-danger/20 border border-danger/50 text-danger text-center">
                        {error}
                    </div>
                )}

                <div className="flex justify-center py-8">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="filled_black"
                        size="large"
                        shape="pill"
                        text="signin_with"
                    />
                </div>

                <div className="text-sm text-white/40">
                    <p>Secure access via Google</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
