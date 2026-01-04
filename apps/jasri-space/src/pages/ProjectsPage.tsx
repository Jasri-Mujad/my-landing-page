import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';

const filterButtons = ['All Projects', 'Web Apps', 'Mobile', 'Open Source'];

const ProjectsPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All Projects');
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeFilter === 'All Projects'
        ? projects
        : projects.filter(p => p.tags && p.tags.includes(activeFilter)); // This might need better logic depending on real tags

    return (
        <main className="flex-grow flex flex-col items-center w-full py-10 px-4 md:px-10">
            <div className="w-full max-w-[1024px] flex flex-col gap-10">
                {/* Page Header */}
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">My Projects</h1>
                        <p className="text-slate-400 text-lg font-normal leading-normal max-w-2xl">
                            A curated collection of things I've built, broken, and fixed. From full-stack applications to experimental UI libraries.
                        </p>
                    </div>
                    {/* Filter Buttons */}
                    <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                        {filterButtons.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                                    ? 'bg-primary/20 text-primary border border-primary/30'
                                    : 'bg-surface-dark text-slate-400 hover:text-white border border-transparent hover:border-white/10'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <article
                            key={project._id || project.id}
                            className="group flex flex-col bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 h-full"
                        >
                            <div className="relative h-48 overflow-hidden">
                                {project.imageUrl ? (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url("${project.imageUrl}")` }}
                                    ></div>
                                ) : (
                                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-4xl text-slate-600">image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-60"></div>
                            </div>
                            <div className="flex flex-col flex-1 p-6 gap-4">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-white text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                                    {project.tags && project.tags.map((tag: string, i: number) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 rounded-md bg-border-dark text-xs font-medium text-blue-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}

                    {/* Coming Soon Card */}
                    <article className="group flex flex-col items-center justify-center bg-surface-dark rounded-xl overflow-hidden border border-dashed border-white/10 hover:border-primary/30 transition-all h-full min-h-[400px]">
                        <div className="flex flex-col items-center text-center p-6 gap-4">
                            <div className="size-16 rounded-full bg-border-dark flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-3xl">construction</span>
                            </div>
                            <div>
                                <h3 className="text-white text-lg font-bold">More coming soon</h3>
                                <p className="text-slate-400 text-sm mt-2 max-w-[200px]">
                                    I'm currently working on something exciting. Stay tuned!
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </main>
    );
};

export default ProjectsPage;
