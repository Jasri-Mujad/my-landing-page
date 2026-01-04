import React, { useEffect, useState } from 'react';
import { getTracks, createTrack, deleteTrack } from '../../services/api';

interface Track {
    _id: string;
    title: string;
    artist: string;
    audioUrl: string;
    coverImage?: string;
    duration?: number;
    order: number;
}

const AdminPlaylistPage: React.FC = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        order: 0
    });
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string>('');

    const fetchTracks = async () => {
        try {
            const data = await getTracks();
            setTracks(data);
        } catch (error) {
            console.error('Failed to fetch tracks', error);
        }
    };

    useEffect(() => {
        fetchTracks();
    }, []);

    const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAudioFile(file);
        }
    };

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('artist', formData.artist);
            data.append('order', formData.order.toString());

            if (audioFile) {
                data.append('audio', audioFile);
            } else {
                alert('Audio file is required');
                return;
            }

            if (coverFile) {
                data.append('cover', coverFile);
            }

            // Calculate duration if possible, or leave it to be calculated on play (optional)
            // For now we skip backend duration extraction unless we do it client side

            await createTrack(data);
            setIsCreating(false);
            setFormData({ title: '', artist: '', order: 0 });
            setAudioFile(null);
            setCoverFile(null);
            setCoverPreview('');
            fetchTracks();
        } catch (error) {
            console.error('Failed to create track', error);
            alert('Failed to create track');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this track?')) {
            try {
                await deleteTrack(id);
                fetchTracks();
            } catch (error) {
                console.error('Failed to delete track', error);
                alert('Failed to delete track');
            }
        }
    };

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '--:--';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Playlist Management</h1>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <span className="material-symbols-outlined">{isCreating ? 'close' : 'add'}</span>
                    {isCreating ? 'Cancel' : 'Add Track'}
                </button>
            </div>

            {isCreating && (
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in-up">
                    <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">New Track</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                required
                                type="text"
                                placeholder="Track Title"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151f32] text-gray-900 dark:text-white"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                            <input
                                required
                                type="text"
                                placeholder="Artist Name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151f32] text-gray-900 dark:text-white"
                                value={formData.artist}
                                onChange={e => setFormData({ ...formData, artist: e.target.value })}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Audio File (MP3)
                                </label>
                                <input
                                    required
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleAudioUpload}
                                    className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-primary/10 file:text-primary
                                        hover:file:bg-primary/20"
                                />
                                {audioFile && (
                                    <p className="text-xs text-green-500">✓ {audioFile.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cover Image (optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverUpload}
                                    className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-violet-700
                                        hover:file:bg-violet-100"
                                />
                                {coverPreview && (
                                    <div className="w-16 h-16 rounded overflow-hidden border border-gray-200">
                                        <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-32">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151f32] text-gray-900 dark:text-white"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 font-medium"
                            >
                                Add to Playlist
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#151f32]">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">queue_music</span>
                        Playlist ({tracks.length} tracks)
                    </h3>
                </div>
                {tracks.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <span className="material-symbols-outlined text-4xl mb-2 block opacity-50">library_music</span>
                        <p>No tracks in playlist. Add your first track!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-800">
                        {tracks.map((track, index) => (
                            <div key={track._id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-[#151f32] transition-colors">
                                <span className="text-sm font-mono text-gray-400 w-6 text-center">{index + 1}</span>
                                <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                                    {track.coverImage ? (
                                        <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <span className="material-symbols-outlined">music_note</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="font-bold text-gray-900 dark:text-white truncate">{track.title}</h4>
                                    <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                                </div>
                                <span className="text-sm text-gray-500 font-mono">{formatDuration(track.duration)}</span>
                                <button
                                    onClick={() => handleDelete(track._id)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPlaylistPage;
