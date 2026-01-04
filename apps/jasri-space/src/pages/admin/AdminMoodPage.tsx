import React, { useEffect, useState } from 'react';
import { getMood, createMood } from '../../services/api';

const AdminMoodPage: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        spotifyPlaylistUrl: '',
        isActive: true
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMood = async () => {
            try {
                const data = await getMood();
                if (data) {
                    setFormData({
                        title: data.title || '',
                        spotifyPlaylistUrl: data.spotifyPlaylistUrl || '',
                        isActive: data.isActive ?? true
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchMood();
    }, []);

    // Extract Spotify embed URL from various formats
    const getSpotifyEmbedUrl = (url: string) => {
        if (!url) return '';
        // If already an embed URL, return as-is
        if (url.includes('open.spotify.com/embed/')) {
            return url;
        }
        // Convert regular Spotify URL to embed
        // https://open.spotify.com/playlist/xyz -> https://open.spotify.com/embed/playlist/xyz
        const match = url.match(/open\.spotify\.com\/(playlist|album|track)\/([a-zA-Z0-9]+)/);
        if (match) {
            return `https://open.spotify.com/embed/${match[1]}/${match[2]}?theme=0`;
        }
        return url;
    };

    const embedUrl = getSpotifyEmbedUrl(formData.spotifyPlaylistUrl);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMood({
                ...formData,
                spotifyPlaylistUrl: embedUrl // Store the converted embed URL
            });
            setMessage('Mood updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to update mood.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Music Player Settings</h1>
            {message && <div className="p-4 bg-blue-100 text-blue-700 rounded-lg">{message}</div>}

            <div className="bg-white dark:bg-[#1e293b] p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Section Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. On Rotation"
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Spotify Playlist URL
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Paste a Spotify playlist, album, or track URL. It will be automatically converted to an embed.
                        </p>
                        <input
                            required
                            type="text"
                            placeholder="https://open.spotify.com/playlist/..."
                            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.spotifyPlaylistUrl}
                            onChange={e => setFormData({ ...formData, spotifyPlaylistUrl: e.target.value })}
                        />
                    </div>

                    {/* Preview */}
                    {embedUrl && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</label>
                            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                <iframe
                                    src={embedUrl}
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="w-full"
                                ></iframe>
                            </div>
                        </div>
                    )}

                    <label className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-[#0f1623]"
                            checked={formData.isActive}
                            onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                        />
                        <span className="font-medium text-gray-700 dark:text-gray-300">Active (Show on Homepage)</span>
                    </label>

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/25"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminMoodPage;

