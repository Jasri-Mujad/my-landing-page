import React, { useState, useEffect } from 'react';
import { getStats, getActivityLogs } from '../../services/api';

interface Stats {
    feedsCount: number;
    projectsCount: number;
    lastUpdated: string;
}

interface ActivityItem {
    _id: string;
    action: string;
    resourceType: string;
    resourceTitle: string;
    timestamp: string;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
    created: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
    updated: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
    deleted: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' }
};

const moodButtons = ['Focused', 'Chill', 'Coding', 'Away'];

const DashboardHome: React.FC = () => {
    const [activeMood, setActiveMood] = useState('Focused');
    const [stats, setStats] = useState<Stats | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    getStats(),
                    getActivityLogs(5)
                ]);
                setStats(statsData);
                setActivities(activityData);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTimeAgo = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome back, Jasriii</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Here is what's happening with your content today.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2d3a52] font-medium text-sm transition-all shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">refresh</span>
                        Sync
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-blue-600 font-medium text-sm transition-all shadow-lg shadow-primary/25">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        New Entry
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Card 1 - Total Feeds */}
                <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                            <span className="material-symbols-outlined">rss_feed</span>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">Live</span>
                    </div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Feeds</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors">
                        {loading ? '...' : stats?.feedsCount || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        {stats?.lastUpdated ? `Updated ${formatTimeAgo(stats.lastUpdated)}` : 'Loading...'}
                    </p>
                </div>

                {/* Stat Card 2 - Active Projects */}
                <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                            <span className="material-symbols-outlined">folder</span>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">Active</span>
                    </div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Projects</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors">
                        {loading ? '...' : stats?.projectsCount || 0}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Real-time count</p>
                </div>

                {/* Stat Card 3 - Current Mood */}
                <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined">mood</span>
                        </div>
                        <button className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">Change</button>
                    </div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Current Mood</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors">{activeMood}</p>
                    <p className="text-xs text-gray-400 mt-2">Set 2 hours ago</p>
                </div>
            </div>

            {/* Quick Actions & Recent Activity Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="text-lg font-bold mb-2">Quick Create</h3>
                        <p className="text-blue-100 text-sm mb-6">Create new content directly from here.</p>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-white/20 rounded">
                                        <span className="material-symbols-outlined text-sm">post_add</span>
                                    </div>
                                    <span className="font-medium text-sm">Add New Feed</span>
                                </div>
                                <span className="material-symbols-outlined text-white/50 group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-white/20 rounded">
                                        <span className="material-symbols-outlined text-sm">create_new_folder</span>
                                    </div>
                                    <span className="font-medium text-sm">Add New Project</span>
                                </div>
                                <span className="material-symbols-outlined text-white/50 group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    {/* Mood Quick Toggle */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Mood Quick Set</h3>
                        <div className="flex flex-wrap gap-2">
                            {moodButtons.map((mood) => (
                                <button
                                    key={mood}
                                    onClick={() => setActiveMood(mood)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeMood === mood
                                        ? 'bg-primary/20 text-primary border-primary/20'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border-transparent'
                                        }`}
                                >
                                    {mood}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                        <button className="text-sm text-primary hover:text-blue-400 font-medium">View All</button>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 dark:bg-[#151f32]/50 text-xs uppercase text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-semibold">Content</th>
                                    <th scope="col" className="px-6 py-4 font-semibold">Type</th>
                                    <th scope="col" className="px-6 py-4 font-semibold">Action</th>
                                    <th scope="col" className="px-6 py-4 font-semibold text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                            Loading activity...
                                        </td>
                                    </tr>
                                ) : activities.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                            No recent activity yet. Start by creating feeds or projects!
                                        </td>
                                    </tr>
                                ) : (
                                    activities.map((item) => {
                                        const styles = statusStyles[item.action] || statusStyles.created;
                                        return (
                                            <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-[#2d3a52]/50 transition-colors cursor-pointer group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                                            <span className="material-symbols-outlined text-lg">
                                                                {item.resourceType === 'project' ? 'folder' : 'article'}
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary">{item.resourceTitle}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 capitalize">{item.resourceType}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}>
                                                        <span className={`size-1.5 rounded-full ${styles.dot}`}></span>
                                                        <span className="capitalize">{item.action}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">{formatDate(item.timestamp)}</td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-center">
                        <p className="text-xs text-gray-400">Showing {activities.length} most recent items</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
