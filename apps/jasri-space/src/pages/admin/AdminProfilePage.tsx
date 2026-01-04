import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile, createProfile, uploadFile } from '../../services/api';

const AdminProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        heroTitle: '',
        heroImage: '',
        avatarUrl: '',
        resumeUrl: '',
        genres: '',
        quote: '',
        bandImage: ''
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
            setFormData({
                name: data.name || '',
                title: data.title || '',
                bio: data.bio || '',
                heroTitle: data.heroTitle || 'HISTORY OF<br/>ALEX TURNER',
                heroImage: data.heroImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEz8-I2zPC3k1fnFJ0eQq9i-jDI5ykCElz4-GmYlfYR_p6BGgD_iaLNjtNcxdOXtuEfzwGP_wsFza2tig1rAKgBufw8FJ9cFKtLvfl8rpTEoohMaIPY6TXlIR3gqsAbnWQF0qVlejhD7jTvLhMv_G6adpvU74r9cC60yoxadqbZ01aXzCIvc83y6v6ko1lqhUB6PRLJMfTkIZsFj3oERuJNCttjXsxSgAEoV0_GofyUAjnz9Z7P8E1vG6SRunz8n4ISu401SMygYPM',
                avatarUrl: data.avatarUrl || '',
                resumeUrl: data.resumeUrl || '',
                genres: data.genres || 'INDIE ROCK, GARAGE ROCK, PSYCHEDELIC POP',
                quote: data.quote || '"As a child he dreamed of having a band. He was a rocker boy. But when the accident happened, he lost that dream... or so he thought."',
                bandImage: data.bandImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuALBUXstCOW4WyPYUrUbL01LNB2a8XY0lcEUkX1ukwVsGbXpQl6fzcSSlc6HGfylu6_2j7pzkjmVyyUmk_lzW-x9FYq9OYh8pDj4hrEMv6ME82AuCodt2eDlu1pnFKYJc2GVeqs-88uBR6q6yCJtZowyWlePQltiwoNiEVeTDgHjX74YzBfq9t2NPxiS64JXIIANewhE2Yp3iUesWjvAuWdEvQxauiN3IbKGb2aK0zBVoNjJ5Df0KW-5yFdKNfmUDUwHqq1Ihm-YLAL'
            });
        } catch (error) {
            console.error('Failed to load profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(fieldName);
        try {
            const uploadData = new FormData();
            uploadData.append('file', file);
            const response = await uploadFile(uploadData);

            setFormData(prev => ({
                ...prev,
                [fieldName]: response.url
            }));
        } catch (error) {
            console.error('Upload failed', error);
            alert('Image upload failed');
        } finally {
            setUploading(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSaving(true);
        try {
            if (profile && profile._id) {
                await updateProfile(profile._id, formData);
            } else {
                await createProfile(formData);
            }
            alert('Profile saved successfully!');
            loadProfile(); // Reload to confirm
        } catch (error) {
            console.error('Failed to save profile', error);
            alert('Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    const renderImageInput = (label: string, fieldName: keyof typeof formData, value: string) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                    <input
                        name={fieldName}
                        value={value}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white"
                        placeholder="Image URL or upload file..."
                    />
                    <div className="relative">
                        <input
                            type="file"
                            onChange={(e) => handleImageUpload(e, fieldName)}
                            className="hidden"
                            id={`file-${fieldName}`}
                            accept="image/*"
                        />
                        <label
                            htmlFor={`file-${fieldName}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-sm font-medium transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">upload</span>
                            {uploading === fieldName ? 'Uploading...' : 'Upload Image'}
                        </label>
                    </div>
                </div>
                {value && (
                    <div className="shrink-0">
                        <img src={value} className="h-24 w-24 rounded-lg object-cover border border-gray-700" alt="Preview" />
                    </div>
                )}
            </div>
        </div>
    );

    if (loading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile & About Page</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio (Main Text)</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* About Page Content */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About Page Styling</h2>

                    <div className="col-span-full space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hero Title (Use HTML breaks &lt;br/&gt; for line breaks)</label>
                        <input
                            name="heroTitle"
                            value={formData.heroTitle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white font-mono text-sm"
                            placeholder="e.g. HISTORY OF<br/>ALEX TURNER"
                        />
                    </div>

                    <div className="col-span-full space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Genres (Comma separated)</label>
                        <input
                            name="genres"
                            value={formData.genres}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white"
                        />
                    </div>

                    <div className="col-span-full space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quote</label>
                        <textarea
                            name="quote"
                            value={formData.quote}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Images</h2>

                    {renderImageInput("Profile Image (Avatar)", "avatarUrl", formData.avatarUrl)}
                    {renderImageInput("Hero Image (Top Banner - History Section)", "heroImage", formData.heroImage)}
                    {renderImageInput("Band Image (Bottom Section)", "bandImage", formData.bandImage)}


                </div>

                {/* Documents */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Documents</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume (PDF or Doc)</label>
                        <div className="flex gap-4 items-start">
                            <div className="flex-1 space-y-2">
                                <input
                                    name="resumeUrl"
                                    value={formData.resumeUrl || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#151f32] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white"
                                    placeholder="Resume URL or upload file..."
                                />
                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={(e) => handleImageUpload(e, 'resumeUrl')}
                                        className="hidden"
                                        id="file-resumeUrl"
                                        accept=".pdf,.doc,.docx"
                                    />
                                    <label
                                        htmlFor="file-resumeUrl"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-sm font-medium transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">description</span>
                                        {uploading === 'resumeUrl' ? 'Uploading...' : 'Upload Resume'}
                                    </label>
                                </div>
                            </div>
                            {formData.resumeUrl && (
                                <div className="shrink-0">
                                    <a
                                        href={formData.resumeUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="h-24 w-24 flex flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-primary hover:bg-primary/10 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-3xl">description</span>
                                        <span className="text-xs font-bold uppercase">View</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        {saving ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <span className="material-symbols-outlined">save</span>
                        )}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProfilePage;
