import React, { useEffect, useState } from 'react';
import { getFeeds } from '../services/api';

interface Feed {
    id: string;
    type: 'Blog' | 'Project' | 'Photo' | 'Note';
    title: string;
    content?: string;
    imageUrl?: string;
    date: string;
    link?: string;
    meta?: any;
    typeColor?: string; // Adding since it's used in HomePage
}

const FeedGrid: React.FC = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const data = await getFeeds();
                setFeeds(data as Feed[]);
            } catch (error) {
                console.error("Failed to fetch feeds", error);
            }
        };
        fetchFeeds();
    }, []);

    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feeds.map((feed) => (
                    <article key={feed.id} className="group flex flex-col h-full rounded-xl bg-surface-dark border border-border-dark p-5 hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${feed.type === 'Blog' ? 'bg-blue-400/10 text-blue-400 ring-blue-400/20' :
                                feed.type === 'Project' ? 'bg-purple-400/10 text-purple-400 ring-purple-400/20' :
                                    feed.type === 'Photo' ? 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/20' :
                                        'bg-orange-400/10 text-orange-400 ring-orange-400/20'
                                }`}>{feed.type}</span>
                            <span className="text-xs text-slate-500 font-medium">{new Date(feed.date).toLocaleDateString()}</span>
                        </div>
                        {feed.imageUrl && (
                            <div className="mb-4 aspect-[2/1] w-full overflow-hidden rounded-lg bg-gray-800">
                                <div className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url("${feed.imageUrl}")` }}>
                                </div>
                            </div>
                        )}
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{feed.title}</h4>
                        {feed.content && (
                            <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                                {feed.content}
                            </p>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FeedGrid;
