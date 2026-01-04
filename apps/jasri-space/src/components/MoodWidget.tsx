import React, { useEffect, useState } from 'react';
import { getMood } from '../services/api';

interface Mood {
    title: string;
    artist: string;
    sourceUrl: string;
    coverImage: string;
    isActive: boolean;
}

const MoodWidget: React.FC = () => {
    const [mood, setMood] = useState<Mood | null>(null);

    useEffect(() => {
        const fetchMood = async () => {
            try {
                const data = await getMood();
                setMood(data);
            } catch (error) {
                console.error("Failed to fetch mood", error);
            }
        };
        fetchMood();
    }, []);

    if (!mood || !mood.isActive) return null;

    return (
        <section className="w-full">
            <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary animate-pulse">music_note</span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Now Vibe</h3>
            </div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden group bg-black cursor-pointer">
                <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity" style={{ backgroundImage: `url("${mood.coverImage}")` }}></div>
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center flex-col">
                    <h4 className="text-white text-lg font-bold">{mood.title}</h4>
                    <p className="text-slate-400 text-sm">{mood.artist}</p>
                </div>
            </div>
        </section>
    );
};

export default MoodWidget;
