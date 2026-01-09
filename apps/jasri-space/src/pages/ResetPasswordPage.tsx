import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { resetPassword } from '../services/api';

const ResetPasswordPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Default email from previous page if available
    const [email, setEmail] = useState(location.state?.email || '');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const data = await resetPassword({ email, otp, newPassword });
            if (data.success) {
                setMessage('Password reset successful! Redirecting...');
                setTimeout(() => navigate('/admin'), 2000);
            } else {
                setError(data.message || 'Reset failed.');
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
                        <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
                        <p className="text-sm text-slate-500">Enter the OTP sent to your email.</p>
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

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">OTP Code</label>
                            <input
                                required
                                type="text"
                                className="flex w-full rounded-lg border border-slate-300 dark:border-[#314668] bg-white dark:bg-[#101723] px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:text-white tracking-widest text-center font-mono"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">New Password</label>
                            <input
                                required
                                type="password"
                                className="flex w-full rounded-lg border border-slate-300 dark:border-[#314668] bg-white dark:bg-[#101723] px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:text-white"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Confirm New Password</label>
                            <input
                                required
                                type="password"
                                className="flex w-full rounded-lg border border-slate-300 dark:border-[#314668] bg-white dark:bg-[#101723] px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:text-white"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-blue-600 disabled:opacity-50"
                            type="submit"
                        >
                            {loading ? 'Reseting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
