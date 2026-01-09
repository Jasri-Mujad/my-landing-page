import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const data = await forgotPassword(email);
            if (data.success) {
                setMessage('OTP sent! Check your email.');
                // Normally navigate to reset page or show OTP input
                setTimeout(() => navigate('/admin/reset-password', { state: { email } }), 1500);
            } else {
                setError(data.message || 'Failed to send OTP.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="relative flex h-full w-full grow flex-col items-center justify-center p-4">
                <Link to="/admin" className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Back to Login
                </Link>

                <div className="w-full max-w-[420px] rounded-xl bg-white dark:bg-[#182334] shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 p-8 sm:p-10 flex flex-col gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">Forgot Password</h1>
                        <p className="text-sm text-slate-500">Enter your email to receive a recovery OTP.</p>
                    </div>

                    {error && <div className="p-3 rounded bg-red-500/10 text-red-400 text-sm border border-red-500/20">{error}</div>}
                    {message && <div className="p-3 rounded bg-green-500/10 text-green-400 text-sm border border-green-500/20">{message}</div>}

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Email Address</label>
                            <input
                                required
                                type="email"
                                className="flex w-full rounded-lg border border-slate-300 dark:border-[#314668] bg-white dark:bg-[#101723] px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:text-white"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-blue-600 disabled:opacity-50"
                            type="submit"
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
