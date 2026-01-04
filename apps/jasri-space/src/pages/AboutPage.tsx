import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

const AboutPage: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <main className="w-full max-w-[960px] bg-white dark:bg-black shadow-2xl overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 mx-auto md:my-8">
            <header className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
                <div className="md:col-span-5 relative h-64 md:h-full bg-black group overflow-hidden">
                    <img
                        alt="Hero"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 grayscale"
                        src={profile.heroImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAEz8-I2zPC3k1fnFJ0eQq9i-jDI5ykCElz4-GmYlfYR_p6BGgD_iaLNjtNcxdOXtuEfzwGP_wsFza2tig1rAKgBufw8FJ9cFKtLvfl8rpTEoohMaIPY6TXlIR3gqsAbnWQF0qVlejhD7jTvLhMv_G6adpvU74r9cC60yoxadqbZ01aXzCIvc83y6v6ko1lqhUB6PRLJMfTkIZsFj3oERuJNCttjXsxSgAEoV0_GofyUAjnz9Z7P8E1vG6SRunz8n4ISu401SMygYPM"}
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 text-xs font-mono text-white border-l-2 border-primary">
                        "The view from the afternoon"
                    </div>
                </div>
                <div className="md:col-span-7 bg-gray-800 dark:bg-[#1a1a1a] flex flex-col justify-center items-center md:items-start p-8 md:p-12 relative overflow-hidden">
                    <span className="absolute top-0 right-0 text-9xl font-display text-white/5 select-none pointer-events-none rotate-12 translate-x-10 -translate-y-10">
                        ROCK
                    </span>
                    <h1
                        className="font-display text-6xl md:text-8xl text-white leading-[0.85] tracking-wide text-center md:text-left drop-shadow-lg z-10"
                        dangerouslySetInnerHTML={{ __html: profile.heroTitle || "HISTORY OF<br/>ALEX TURNER" }}
                    >
                    </h1>
                    <div className="mt-6 h-1 w-24 bg-white/20"></div>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-12 border-t border-gray-200 dark:border-gray-800">
                <div className="md:col-span-4 bg-gray-100 dark:bg-[#0f0f0f] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 relative">
                    <div className="relative w-full aspect-[3/4] max-w-[280px] shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        {profile.avatarUrl && (
                            <img
                                alt={profile.name}
                                className="w-full h-full object-cover grayscale contrast-125 border-4 border-white dark:border-gray-800"
                                src={profile.avatarUrl}
                            />
                        )}
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-black text-white flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">music_note</span>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-8 bg-black p-8 md:p-16 flex items-center">
                    <div className="space-y-6">
                        <p className="font-sans text-xl md:text-2xl leading-relaxed text-gray-300 uppercase tracking-wide text-justify whitespace-pre-wrap">
                            {profile.bio || "No biography available."}
                        </p>
                        {profile.genres && (
                            <p className="font-mono text-sm text-gray-500 mt-4 border-t border-gray-800 pt-4">
                                // GENRE: {profile.genres}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-6 bg-[#181818] p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800 relative overflow-hidden">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full"></div>

                    {profile.quote && (
                        <blockquote className="font-sans text-lg md:text-xl text-gray-300 uppercase tracking-wider leading-loose relative z-10">
                            {profile.quote}
                        </blockquote>
                    )}


                </div>
                <div className="md:col-span-6 relative h-64 md:h-auto bg-white dark:bg-gray-200 overflow-hidden">
                    <img
                        alt="Band performing"
                        className="absolute inset-0 w-full h-full object-cover contrast-150 grayscale mix-blend-multiply"
                        src={profile.bandImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuALBUXstCOW4WyPYUrUbL01LNB2a8XY0lcEUkX1ukwVsGbXpQl6fzcSSlc6HGfylu6_2j7pzkjmVyyUmk_lzW-x9FYq9OYh8pDj4hrEMv6ME82AuCodt2eDlu1pnFKYJc2GVeqs-88uBR6q6yCJtZowyWlePQltiwoNiEVeTDgHjX74YzBfq9t2NPxiS64JXIIANewhE2Yp3iUesWjvAuWdEvQxauiN3IbKGb2aK0zBVoNjJ5Df0KW-5yFdKNfmUDUwHqq1Ihm-YLAL"}
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-40 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80"></div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
