import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeeds, getProjects, getMood, getCommandCenterImages } from '../services/api';
import Modal from '../components/Modal';

const typeStyles: Record<string, { bg: string; text: string; ring: string; hover: string }> = {
    Blog: { bg: 'bg-blue-400/10', text: 'text-blue-400', ring: 'ring-blue-400/20', hover: 'hover:border-primary/50 hover:text-primary' },
    Project: { bg: 'bg-purple-400/10', text: 'text-purple-400', ring: 'ring-purple-400/20', hover: 'hover:border-purple-500/50 hover:text-purple-400' },
    Photo: { bg: 'bg-emerald-400/10', text: 'text-emerald-400', ring: 'ring-emerald-400/20', hover: 'hover:border-emerald-500/50 hover:text-emerald-400' },
    Video: { bg: 'bg-red-400/10', text: 'text-red-400', ring: 'ring-red-400/20', hover: 'hover:border-red-500/50 hover:text-red-400' },
    Note: { bg: 'bg-orange-400/10', text: 'text-orange-400', ring: 'ring-orange-400/20', hover: 'hover:border-orange-500/50 hover:text-orange-400' },
    Default: { bg: 'bg-slate-400/10', text: 'text-slate-400', ring: 'ring-slate-400/20', hover: 'hover:border-slate-500/50 hover:text-slate-400' },
};

const HomePage: React.FC = () => {
    const [feeds, setFeeds] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [mood, setMood] = useState<any>(null);
    const [commandCenterImages, setCommandCenterImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [feedData, projectData, moodData, ccData] = await Promise.all([
                    getFeeds(),
                    getProjects(),
                    getMood(),
                    getCommandCenterImages()
                ]);
                setFeeds(feedData);
                setProjects(projectData);
                setMood(moodData);
                if (ccData && ccData.images && ccData.images.length > 0) {
                    setCommandCenterImages(ccData.images);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (commandCenterImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % commandCenterImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [commandCenterImages]);

    const openModal = (item: any) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    // Default hero image for the carousel
    const heroImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmDBueVWXZVtu_QwuvdWcTgSz7eOsUpFtH9kUJDMeDFWet7AFlWVVEma9sEK5WkcmB-wIO7jOilNcPS8kvYLgSxIVAZYN3AVve8i8hGgQdBh0GjU8hY5MrojGCPLGa4NUAx0MzDkZATQUO0XN3b769QXP0l4sjuLlvz40OVvsHlhrCuB-f3lhWGpU_oHJhdKLuMbVhR4UkD4qiwyyqusiZ0W0xjeMzjgFFYoG_Kq9aql-p_woTHr1WJXg2PShaAtgZ53e0b_QW-sY';

    // Determine which image to show
    const displayImage = commandCenterImages.length > 0 ? commandCenterImages[currentImageIndex] : heroImage;
    const albumArt = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbn-dD5rmqCxacRnLQx0w7ubk48DI3kzcjmePbAYJyyqL_fsDPzWsEcn8_nRgCGb-UBhhV1JO5bUXcN9WTlL_OykmRLeyA80v8E-UvowIzkDkc-o4YlbOdhBZcFZb-wRsrUSy5sdCtrFnT62dglK6i4dswO52mWca1SrpxvCt_YDT7tGdEkn6w9CKhl7Hs6UEONgRqmGBxW106o_JJ3kMr3BL-THNVF8BizIysKtLZezPaJMqC41ULEEcgwJgCNnMZsVpln9TH99E';



    return (
        <div className="min-h-screen w-full relative">
            {/* Global Fixed Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-background-dark/80 z-10"></div>
                <div
                    className="w-full h-full bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkRMD8QeRjEMQf3OYWXX4MTXmIqBYAogN6Gn7kega8V6NyrhJf8C77vRdqUtG9O3qwppLduqIU1HTerYz4_1GEaOoN5bUA5QcgnvZ9seBhk3M1OuYgrvVZDm25yCyAnaYbJtQk7oobxBm7CSTyh2jO_rzL_tjkl22tGIDNspuOlrRyIutNd1WECkM1wO5BNWTXhyoFcyAWADJ9aD52sDDlqLjo3pnoNqNb-zKq2fchmFpFD6FJh0AiMQferXLFuWayPYAhmWHYSWI')` }}
                ></div>
                {/* Additional gradient for lower sections readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark z-20"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Hero Section */}
                <div className="w-full min-h-screen flex items-center justify-center pt-24 pb-12 px-4 md:px-8 sticky-hero-wrapper">
                    {/* Interactive Panel */}
                    <div className="w-full max-w-[1200px]">
                        <div className="glass-panel rounded-xl p-2 md:p-3 shadow-2xl animate-fade-in-up">
                            <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
                                {/* Left: Content Panel */}
                                <div className="flex-1 flex flex-col justify-center p-8 md:p-12 lg:p-16 rounded-lg bg-background-dark/40 border border-white/5 relative overflow-hidden group">
                                    {/* Decorative background glow */}
                                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>

                                    <div className="relative z-10 flex flex-col items-start gap-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-primary">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                            Available for Work
                                        </div>

                                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                                            Maintain.<br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Automate.</span><br />
                                            Sleep.
                                        </h1>

                                        <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed">
                                            Do not deploy on Friday night!!!
                                        </p>

                                        <div className="flex flex-wrap gap-4 mt-4">
                                            <Link
                                                to="/projects"
                                                className="h-14 px-8 rounded-full bg-primary hover:bg-blue-600 text-white font-bold text-lg transition-all flex items-center gap-2 group/btn"
                                            >
                                                Explore Content
                                                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                            </Link>
                                            <Link
                                                to="/about"
                                                className="h-14 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center"
                                            >
                                                About Me
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Visual/Interactive Carousel Panel */}
                                <div className="flex-1 rounded-lg overflow-hidden relative group cursor-pointer lg:min-h-full min-h-[400px]">
                                    {/* Carousel Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 hover:scale-105"
                                        style={{ backgroundImage: `url('${displayImage}')` }}
                                    ></div>

                                    {/* Overlay Text */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-10">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <p className="text-primary font-bold mb-1">Latest Setup</p>
                                            <h3 className="text-white text-3xl font-bold">The Command Center</h3>
                                            <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                                My daily driver for development and music production.
                                            </p>
                                        </div>

                                        {/* Carousel Controls */}
                                        <div className="flex items-center justify-between mt-6">
                                            <div className="flex gap-2">
                                                {commandCenterImages.length > 0 ? (
                                                    commandCenterImages.map((_, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                                                        ></div>
                                                    ))
                                                ) : (
                                                    <>
                                                        <div className="w-8 h-1 bg-white rounded-full"></div>
                                                        <div className="w-2 h-1 bg-white/30 rounded-full"></div>
                                                        <div className="w-2 h-1 bg-white/30 rounded-full"></div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(prev => (prev - 1 + (commandCenterImages.length || 1)) % (commandCenterImages.length || 1));
                                                    }}
                                                    className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors text-white"
                                                >
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(prev => (prev + 1) % (commandCenterImages.length || 1));
                                                    }}
                                                    className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors text-white"
                                                >
                                                    <span className="material-symbols-outlined">chevron_right</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-20 space-y-24">
                    {/* The Vibe Section */}
                    <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-4 lg:col-span-3">
                            <h2 className="text-4xl font-bold text-white mb-4">The Vibe</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Music fuels my code. Here's what's currently spinning in the studio while I build digital dreams.
                            </p>
                        </div>
                        <div className="md:col-span-8 lg:col-span-9">
                            {mood && mood.isActive && mood.spotifyPlaylistUrl ? (
                                <div className="glass-panel rounded-xl overflow-hidden">
                                    <iframe
                                        src={mood.spotifyPlaylistUrl}
                                        width="100%"
                                        height="180"
                                        frameBorder="0"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        className="w-full"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
                                    <div className="flex flex-col md:flex-row gap-6 items-center">
                                        {/* Album Art */}
                                        <div className="relative size-24 md:size-32 shrink-0 rounded-lg overflow-hidden shadow-lg group/album">
                                            <div
                                                className="w-full h-full bg-cover bg-center group-hover/album:scale-110 transition-transform duration-500"
                                                style={{ backgroundImage: `url('${albumArt}')` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/album:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                                            </div>
                                        </div>

                                        {/* Track Info & Controls */}
                                        <div className="flex-1 w-full flex flex-col justify-center">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white">Neon Dreams</h3>
                                                    <p className="text-primary font-medium">Synthwave Collective</p>
                                                </div>
                                                <button className="text-gray-400 hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined text-3xl">favorite</span>
                                                </button>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 mb-2 relative group/bar cursor-pointer">
                                                <div className="absolute left-0 top-0 h-full w-[35%] bg-primary rounded-full"></div>
                                                <div className="absolute left-[35%] top-1/2 -translate-y-1/2 size-3 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-opacity"></div>
                                            </div>
                                            <div className="flex justify-between text-xs font-medium text-gray-500 font-mono">
                                                <span>1:17</span>
                                                <span>3:42</span>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex items-center gap-6 mt-4">
                                                <button className="text-gray-400 hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined">shuffle</span>
                                                </button>
                                                <button className="text-white hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-3xl">skip_previous</span>
                                                </button>
                                                <button className="size-12 rounded-full bg-white text-background-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg shadow-white/10">
                                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>pause</span>
                                                </button>
                                                <button className="text-white hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-3xl">skip_next</span>
                                                </button>
                                                <button className="text-gray-400 hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined">repeat</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Visualizer Graphic */}
                                        <div className="hidden lg:flex items-end gap-1 h-16 opacity-50">
                                            <div className="w-1 bg-primary rounded-t-sm h-8 animate-pulse"></div>
                                            <div className="w-1 bg-primary rounded-t-sm h-12 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-1 bg-primary rounded-t-sm h-6 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-1 bg-primary rounded-t-sm h-10 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                            <div className="w-1 bg-primary rounded-t-sm h-4 animate-pulse" style={{ animationDelay: '0.15s' }}></div>
                                            <div className="w-1 bg-primary rounded-t-sm h-14 animate-pulse" style={{ animationDelay: '0.25s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Featured Projects Section */}
                    <section>
                        <div className="flex items-end justify-between mb-10 px-4">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2">Featured Works</h2>
                                <p className="text-gray-400">Selected projects that define my journey.</p>
                            </div>
                            <Link
                                to="/projects"
                                className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-white transition-colors"
                            >
                                View All
                                <span className="material-symbols-outlined">arrow_right_alt</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.slice(0, 3).map((project) => (
                                <div
                                    key={project._id}
                                    className="group relative bg-surface-dark rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all hover:translate-y-[-4px] hover:shadow-2xl cursor-pointer"
                                    onClick={() => openModal(project)}
                                >
                                    <div className="aspect-video w-full overflow-hidden">
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url('${project.imageUrl || 'https://via.placeholder.com/400x200'}')` }}
                                        ></div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <span className="text-xs font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                                {project.category || 'Project'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <button className="flex-1 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-colors">
                                                Details
                                            </button>
                                            <button className="size-9 rounded-full bg-primary flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex md:hidden justify-center">
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors"
                            >
                                View All Projects
                                <span className="material-symbols-outlined">arrow_right_alt</span>
                            </Link>
                        </div>
                    </section>

                    {/* Latest Feeds Grid */}
                    {feeds.length > 0 && (
                        <section className="w-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">rss_feed</span>
                                    <h3 className="text-white text-xl font-bold tracking-tight">Latest Updates</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {feeds.map((feed) => {
                                    const styles = typeStyles[feed.type] || typeStyles.Default;
                                    const formattedDate = new Date(feed.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                                    return (
                                        <article
                                            key={feed._id || feed.id}
                                            className={`group flex flex-col h-full rounded-xl bg-surface-dark border border-white/5 p-5 ${styles.hover} transition-colors cursor-pointer`}
                                            onClick={() => openModal(feed)}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`inline-flex items-center rounded-md ${styles.bg} px-2 py-1 text-xs font-medium ${styles.text} ring-1 ring-inset ${styles.ring}`}>
                                                    {feed.type}
                                                </span>
                                                <span className="text-xs text-slate-500 font-medium">{formattedDate}</span>
                                            </div>

                                            {feed.imageUrl && (
                                                <div className={`mb-4 ${feed.type === 'Photo' ? 'aspect-square' : 'aspect-[2/1]'} w-full overflow-hidden rounded-lg bg-gray-800 relative`}>
                                                    {(feed.type === 'Video' || feed.imageUrl.startsWith('data:video')) ? (
                                                        <video src={feed.imageUrl} controls className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div
                                                            className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                                            style={{ backgroundImage: `url("${feed.imageUrl}")` }}
                                                        ></div>
                                                    )}
                                                    {feed.meta?.location && (
                                                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-medium flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[12px]">location_on</span>
                                                            {feed.meta.location}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <h4 className={`text-lg font-bold text-white mb-2 group-hover:${styles.text} transition-colors`}>
                                                {feed.title}
                                            </h4>

                                            {feed.content && (
                                                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                                                    {feed.content}
                                                </p>
                                            )}

                                            <div className={`mt-auto pt-2 flex items-center text-sm font-bold ${styles.text} group-hover:translate-x-1 transition-transform`}>
                                                View Details <span className="material-symbols-outlined text-base ml-1">arrow_right_alt</span>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </main>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedItem?.title || 'Details'}
            >
                {selectedItem && (
                    <div className="space-y-6">
                        {selectedItem.imageUrl && (
                            <div className="rounded-xl overflow-hidden bg-black/50 border border-white/10">
                                {(selectedItem.type === 'Video' || selectedItem.imageUrl.startsWith('data:video')) ? (
                                    <video src={selectedItem.imageUrl} controls className="w-full h-auto max-h-[400px]" />
                                ) : (
                                    <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-auto max-h-[400px] object-contain" />
                                )}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <span className="text-sm text-slate-400">
                                    {selectedItem.date && new Date(selectedItem.date).toLocaleDateString()}
                                </span>
                                {selectedItem.type && (
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold">
                                        {selectedItem.type}
                                    </span>
                                )}
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                                    {selectedItem.content || selectedItem.description}
                                </p>
                            </div>
                            {selectedItem.link && (
                                <div className="pt-4">
                                    <a href={selectedItem.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors">
                                        Visit Link <span className="material-symbols-outlined">open_in_new</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default HomePage;
