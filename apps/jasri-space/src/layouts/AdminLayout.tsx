import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;



    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden h-screen flex flex-col font-display">
            {/* Top Navigation */}
            <header className="flex-none h-16 w-full bg-white dark:bg-[#151f32] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-8">
                    {/* Logo Area */}
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight hidden sm:block">CMS Admin</h1>
                    </Link>
                    {/* Breadcrumb (Desktop) */}
                    <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
                        <span className="material-symbols-outlined text-base">chevron_right</span>
                        <span className="text-gray-900 dark:text-white font-medium">Dashboard</span>
                    </nav>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Search Bar */}
                    <div className="hidden md:flex relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input
                            className="block w-64 pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition-all"
                            placeholder="Search content..."
                            type="text"
                        />
                    </div>
                    {/* Action Icons */}
                    <button className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#151f32]"></span>
                    </button>
                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium leading-none">Jasriii</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Super Admin</p>
                        </div>
                        <button className="relative rounded-full ring-2 ring-gray-100 dark:ring-gray-700 hover:ring-primary transition-all">
                            <div
                                className="size-10 rounded-full bg-cover bg-center"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlK7m2H96nRXscqni5RfAQtGUL0NP1Q9sDRd8EXntWC3BDCrQfQuS_DWtFhkklLEKraLegQmA0RQEeXH5zhgGemKHR-Qpb5YG4l-NNTEJ-eSy8zYy0FG1qd8dnzJCi1FgeOndI2RpBrIolT4orVG-OGPtsL_eCsvDe6oxWuwnZUYrh2fwDSfQuPQQdJujdbe6P1A59ybPcMdxUrdCPPp1OxVmHEwwMc1q0Yxsb-RGe680aH31dMOwMKfDl9MGGKYdx_sZhGZC-UWg")' }}
                            ></div>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar Navigation */}
                <aside className="w-64 flex-none bg-white dark:bg-[#151f32] border-r border-gray-200 dark:border-gray-800 flex-col justify-between hidden lg:flex">
                    <div className="p-4 space-y-6">
                        {/* Main Nav */}
                        <div className="space-y-1">
                            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Platform</p>
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard')
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">dashboard</span>
                                Dashboard
                            </Link>
                            <Link
                                to="/dashboard/profile"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard/profile')
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">person</span>
                                Profile & About
                            </Link>
                            <Link
                                to="/dashboard/feeds"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard/feeds')
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">rss_feed</span>
                                Feed Management
                            </Link>
                            <Link
                                to="/dashboard/projects"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard/projects')
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">folder_open</span>
                                Project Management
                            </Link>
                            <Link
                                to="/dashboard/mood"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard/mood')
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">sentiment_satisfied</span>
                                Current Mood Settings
                            </Link>
                            <Link
                                to="/dashboard/playlist"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard/playlist')
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">queue_music</span>
                                Playlist Manager
                            </Link>
                            <Link
                                to="/dashboard/command-center"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard/command-center')
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">monitor</span>
                                Command Center
                            </Link>
                        </div>
                        {/* Settings/Other */}
                        <div className="space-y-1">
                            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">System</p>
                            <Link to="/dashboard/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard/settings')
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white'
                                }`}>
                                <span className="material-symbols-outlined">settings</span>
                                Settings
                            </Link>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] hover:text-gray-900 dark:hover:text-white font-medium group transition-colors">
                                <span className="material-symbols-outlined">help</span>
                                Help & Support
                            </a>
                        </div>
                    </div>
                    {/* Exit Button */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e293b] font-medium transition-colors"
                        >
                            <span className="material-symbols-outlined">public</span>
                            View Website
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
