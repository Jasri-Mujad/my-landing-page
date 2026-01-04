import React, { useEffect, useState } from 'react';
import { getProjects, createProject, deleteProject } from '../../services/api';

const AdminProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        imageUrl: '',
        alt: ''
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

    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
                fetchProjects();
            } catch (error) {
                console.error(error);
                alert('Failed to delete project');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
            await createProject({ ...formData, tags: tagsArray });
            setIsCreating(false);
            setFormData({ title: '', description: '', tags: '', imageUrl: '', alt: '' });
            fetchProjects();
        } catch (error) {
            console.error(error);
            alert('Failed to create project');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Management</h1>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <span className="material-symbols-outlined">{isCreating ? 'close' : 'add'}</span>
                    {isCreating ? 'Cancel' : 'Add Project'}
                </button>
            </div>

            {isCreating && (
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in-up">
                    <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">New Project</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                required
                                type="text"
                                placeholder="Title"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151f32]"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />


                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500">Project Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-blue-50 file:text-blue-700
                                      hover:file:bg-blue-100"
                                />
                                {formData.imageUrl && (
                                    <div className="mt-2 p-2 border border-gray-200 rounded">
                                        <p className="text-xs text-green-600 truncate">Image loaded</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <textarea
                            required
                            placeholder="Description"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151f32]"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 font-medium">Create</button>
                    </form>
                </div>
            )}
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                {projects.map(p => (
                    <div key={p._id} className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{p.title}</h3>
                            <p className="text-sm text-gray-500">{p.description}</p>
                        </div>
                        <button onClick={() => handleDelete(p._id)} className="text-red-500">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProjectsPage;
