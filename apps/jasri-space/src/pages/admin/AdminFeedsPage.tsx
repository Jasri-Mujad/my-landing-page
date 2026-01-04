import React, { useEffect, useState } from 'react';
import { getFeeds, createFeed, deleteFeed } from '../../services/api';

const AdminFeedsPage: React.FC = () => {
    const [feeds, setFeeds] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        type: 'Note',
        title: '',
        content: '',
        imageUrl: '',
        link: ''
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchFeeds = async () => {
        try {
            const data = await getFeeds();
            setFeeds(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFeeds();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this feed item?')) {
            try {
                await deleteFeed(id);
                fetchFeeds();
            } catch (error) {
                console.error(error);
                alert('Failed to delete feed');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload: any = {
                ...formData,
                date: new Date().toISOString()
            };
            if (formData.type === 'Note' && !formData.imageUrl) delete payload.imageUrl;
            if (formData.type === 'Photo' && !formData.content) delete payload.content;

            await createFeed(payload);
            setIsCreating(false);
            setFormData({ type: 'Note', title: '', content: '', imageUrl: '', link: '' });
            fetchFeeds();
        } catch (error) {
            console.error(error);
            alert('Failed to create feed');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feed Management</h1>
                <button onClick={() => setIsCreating(!isCreating)} className="px-4 py-2 bg-primary text-white rounded-lg">
                    {isCreating ? 'Cancel' : 'Add Feed Item'}
                </button>
            </div>
            {isCreating && (
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <select className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#151f32]" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                            <option value="Note">Note</option>
                            <option value="Blog">Blog</option>
                            <option value="Project">Project</option>
                            <option value="Photo">Photo</option>
                            <option value="Video">Video</option>
                        </select>
                        <input required type="text" placeholder="Title" className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#151f32]" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image/Video Upload</label>
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileUpload}
                                    className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-violet-50 file:text-violet-700
                                      hover:file:bg-violet-100"
                                />
                            </div>
                            {formData.imageUrl && (
                                <div className="mt-2 relative w-32 h-32 rounded overflow-hidden border border-gray-200">
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl"
                                    >
                                        <span className="material-symbols-outlined text-[10px]">close</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <textarea placeholder="Content" className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#151f32]" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg">Create</button>
                    </form>
                </div>
            )}
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                {feeds.map(f => (
                    <div key={f._id} className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between">
                        <div>
                            <span className="text-xs font-bold text-primary">{f.type}</span>
                            <h3 className="font-bold text-gray-900 dark:text-white">{f.title}</h3>
                        </div>
                        <button onClick={() => handleDelete(f._id)} className="text-red-500">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminFeedsPage;
