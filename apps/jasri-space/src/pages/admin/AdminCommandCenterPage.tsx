import React, { useState, useEffect } from 'react';
import { getCommandCenterImages, updateCommandCenterImages, uploadFile } from '../../services/api';

const AdminCommandCenterPage: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const data = await getCommandCenterImages();
            if (data && data.images) {
                setImages(data.images);
            }
        } catch (error) {
            console.error('Failed to fetch images', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const response = await uploadFile(formData);
            const newImages = [...images];
            // If index is within bounds, replace. If it's the next one, add.
            // Actually, let's just create a completely new array logic 
            // but here simply: if index < images.length update, else push (but logic below handles array size)

            // To be safe, we just update the specific slot or push if it's a new slot and we have space
            if (index < images.length) {
                newImages[index] = response.url;
            } else {
                newImages.push(response.url);
            }

            setImages(newImages);
        } catch (error) {
            console.error('Upload failed', error);
            setMessage({ type: 'error', text: 'Failed to upload image' });
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleSave = async () => {
        try {
            await updateCommandCenterImages(images);
            setMessage({ type: 'success', text: 'Command Center images updated successfully!' });
        } catch (error) {
            console.error('Save failed', error);
            setMessage({ type: 'error', text: 'Failed to update settings' });
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Command Center</h1>
                    <p className="text-slate-400 mt-1">Manage the rotating images on the homepage command center display.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-bold transition-colors shadow-lg shadow-primary/20"
                >
                    Save Changes
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((index) => (
                    <div key={index} className="space-y-4">
                        <div className="bg-surface-dark border border-white/5 rounded-xl p-4 h-full flex flex-col relative group">
                            <div className="flex-1 rounded-lg bg-black/50 border-2 border-dashed border-white/10 flex items-center justify-center relative overflow-hidden aspect-video">
                                {images[index] ? (
                                    <>
                                        <img
                                            src={images[index]}
                                            alt={`Slot ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center p-4">
                                        <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">add_photo_alternate</span>
                                        <p className="text-slate-500 text-sm">Empty Slot {index + 1}</p>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, index)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    disabled={uploading}
                                />
                            </div>

                            <div className="mt-4 flex justify-between items-center text-sm">
                                <span className="text-slate-400">Slot {index + 1}</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${images[index] ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-500'}`}>
                                    {images[index] ? 'Filled' : 'Empty'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-blue-400 text-2xl">info</span>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Instructions</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Upload up to 3 images for the Command Center carousel. The images will automatically transition on the homepage.
                            For best results, use landscape images with a 16:9 aspect ratio (e.g., 1920x1080).
                            Click "Save Changes" after uploading to apply the updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCommandCenterPage;
