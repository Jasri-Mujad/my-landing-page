import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProfile } from '../services/api';

const Header: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                if (data && data.resumeUrl) {
                    setResumeUrl(data.resumeUrl);
                }
            } catch (error) {
                console.error("Failed to fetch profile for header", error);
            }
        };
        fetchProfile();
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Projects' },
        { path: 'https://wa.me/60128372955', label: 'Contact', external: true },
    ];

    const isActive = (path: string) => location.pathname === path;

    const handleResumeClick = () => {
        if (resumeUrl) {
            window.open(resumeUrl, '_blank');
        } else {
            alert('Resume not available yet.');
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="glass-panel mx-4 mt-4 rounded-full px-6 py-3 flex items-center justify-between max-w-[1200px] md:mx-auto">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[20px]">hexagon</span>
                    </div>
                    <Link to="/" className="text-white text-lg font-bold tracking-tight">
                        Cozy Space
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        link.external ? (
                            <a
                                key={link.path}
                                href={link.path}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors ${isActive(link.path) ? 'text-white' : 'text-white/80 hover:text-white'}`}
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <Link
                        to="/admin"
                        title="Admin Login"
                        className="flex items-center justify-center cursor-pointer rounded-full size-9 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">login</span>
                    </Link>
                    {resumeUrl && (
                        <button
                            onClick={handleResumeClick}
                            className="flex items-center justify-center rounded-full h-10 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all transform hover:scale-105"
                        >
                            <span>Resume</span>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-panel mx-4 mt-2 rounded-2xl p-4 flex flex-col gap-4">
                    {navLinks.map(link => (
                        link.external ? (
                            <a
                                key={link.path}
                                href={link.path}
                                target="_blank"
                                rel="noreferrer"
                                className="text-base font-medium text-white/80 hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-base font-medium transition-colors ${isActive(link.path) ? 'text-white' : 'text-white/80 hover:text-white'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                    <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 text-primary font-bold"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined text-[18px]">login</span>
                            Admin Login
                        </Link>
                        {resumeUrl && (
                            <button
                                onClick={() => {
                                    handleResumeClick();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full h-10 rounded-full bg-primary text-white text-sm font-bold"
                            >
                                Resume
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
