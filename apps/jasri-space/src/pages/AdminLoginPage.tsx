import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const AdminLoginPage: React.FC = () => {
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        try {
            const data = await login({ username, password });
            if (data.success) {
                navigate('/dashboard');
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="relative flex h-full w-full grow flex-col items-center justify-center p-4">
                {/* Back Link */}
                <Link
                    to="/"
                    className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-[#90a7cb] hover:text-primary dark:hover:text-primary transition-colors duration-200"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Back to Website
                </Link>

                {/* Login Card Container */}
                <div className="w-full max-w-[420px] rounded-xl bg-white dark:bg-[#182334] shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 p-8 sm:p-10 flex flex-col gap-6">
                    {/* Header Section */}
                    <div className="flex flex-col gap-2 text-center">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">CMS Admin</h1>
                        <p className="text-sm text-slate-500 dark:text-[#90a7cb]">Please enter your details to sign in.</p>
                    </div>

                    {/* Error Message Area */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3">
                            <span className="material-symbols-outlined text-red-400 text-[20px]">error</span>
                            <p className="text-red-400 text-sm font-normal leading-normal">Invalid username or password</p>
                        </div>
                    )}

                    {/* Form Section */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium leading-none text-slate-700 dark:text-white" htmlFor="username">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    autoComplete="username"
                                    className="flex w-full rounded-lg border border-slate-300 dark:border-[#314668] bg-white dark:bg-[#101723] px-3 py-3 pl-10 text-sm placeholder:text-slate-400 dark:placeholder:text-[#90a7cb] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:text-white dark:focus:border-primary"
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="absolute left-3 top-3 text-slate-400 dark:text-[#90a7cb]">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                </div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none text-slate-700 dark:text-white" htmlFor="password">
                                    Password
                                </label>
                                <Link to="/admin/forgot-password" className="text-xs font-medium text-primary hover:text-primary/80">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    autoComplete="current-password"
                                    className="flex w-full rounded-lg border border-slate-300 dark:border-[#314668] bg-white dark:bg-[#101723] px-3 py-3 pl-10 text-sm placeholder:text-slate-400 dark:placeholder:text-[#90a7cb] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:text-white dark:focus:border-primary"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute left-3 top-3 text-slate-400 dark:text-[#90a7cb]">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Footer Info */}
                <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-600">
                    © 2024 Cozy-Space by Jasriii. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
