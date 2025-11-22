"use client";

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email);
    };

    return (
        <div id="loginPage" className="login-container">
            <div className="login-card">
                <div className="text-center mb-8">
                    <div className="logo-container">
                        <h1 className="logo-text">Marqly</h1>
                        <p className="tagline">Where Marketing Meets Quality</p>
                    </div>
                </div>
                <form id="loginForm" className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn-primary w-full">Sign In</button>
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account? <a href="#" className="text-primary font-semibold">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
