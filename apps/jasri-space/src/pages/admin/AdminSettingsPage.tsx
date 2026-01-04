import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, changePassword } from '../../services/api';

const AdminSettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
            // Fallback
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage(null);

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'All fields are required' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters' });
            return;
        }

        setPasswordLoading(true);
        try {
            await changePassword({ currentPassword, newPassword });
            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to change password';
            setPasswordMessage({ type: 'error', text: errorMessage });
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Account Settings</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#151f32] rounded-lg">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Admin Session</h3>
                            <p className="text-sm text-gray-500">Sign out of your administrator account</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">logout</span>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">lock</span>
                    Change Password
                </h2>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                    {passwordMessage && (
                        <div className={`p-4 rounded-lg text-sm ${passwordMessage.type === 'success'
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            }`}>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">
                                    {passwordMessage.type === 'success' ? 'check_circle' : 'error'}
                                </span>
                                {passwordMessage.text}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your current password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter new password (min 6 characters)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Confirm your new password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={passwordLoading}
                        className="px-6 py-3 bg-primary hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                    >
                        {passwordLoading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                Changing...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">vpn_key</span>
                                Change Password
                            </>
                        )}
                    </button>
                </form>
            </div>

            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">General Settings</h2>
                <p className="text-gray-500 text-sm">More settings can be added here...</p>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
