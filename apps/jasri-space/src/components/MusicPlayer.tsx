import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getTracks } from '../services/api';

interface Track {
    _id: string;
    title: string;
    artist: string;
    audioUrl: string;
    coverImage?: string;
    duration?: number;
    order: number;
}

const MusicPlayer: React.FC = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');

    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = tracks[currentTrackIndex];

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await getTracks();
                setTracks(data);
            } catch (error) {
                console.error('Failed to fetch tracks', error);
            }
        };
        fetchTracks();
    }, []);

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.src = currentTrack.audioUrl;
            if (isPlaying) {
                audioRef.current.play().catch(console.error);
            }
        }
    }, [currentTrackIndex, currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = useCallback(() => {
        if (repeatMode === 'one') {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(console.error);
            }
        } else if (repeatMode === 'all' || currentTrackIndex < tracks.length - 1) {
            handleNext();
        } else {
            setIsPlaying(false);
        }
    }, [repeatMode, currentTrackIndex, tracks.length]);

    const togglePlay = () => {
        if (!audioRef.current || !currentTrack) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = useCallback(() => {
        if (tracks.length === 0) return;
        let nextIndex: number;
        if (isShuffle) {
            nextIndex = Math.floor(Math.random() * tracks.length);
        } else {
            nextIndex = (currentTrackIndex + 1) % tracks.length;
        }
        setCurrentTrackIndex(nextIndex);
    }, [tracks.length, currentTrackIndex, isShuffle]);

    const handlePrevious = () => {
        if (tracks.length === 0) return;
        if (audioRef.current && audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
            return;
        }
        let prevIndex: number;
        if (isShuffle) {
            prevIndex = Math.floor(Math.random() * tracks.length);
        } else {
            prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
        }
        setCurrentTrackIndex(prevIndex);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const seekTime = (clickX / width) * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const handleTrackSelect = (index: number) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const toggleRepeat = () => {
        const modes: Array<'none' | 'one' | 'all'> = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(repeatMode);
        setRepeatMode(modes[(currentIndex + 1) % modes.length]);
    };

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return '--:--';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (tracks.length === 0) {
        return null; // Don't render if no tracks
    }

    return (
        <section className="w-full">
            <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">headphones</span>
                <h3 className="text-white text-xl font-bold tracking-tight">On Rotation</h3>
            </div>

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                preload="metadata"
            />

            <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-sm">
                <div className="grid md:grid-cols-2 h-full">
                    {/* Left Column: Player */}
                    <div className="p-6 flex flex-col justify-between gap-6 border-b md:border-b-0 md:border-r border-border-dark bg-gradient-to-br from-surface-dark to-background-dark">
                        {/* Cover Image */}
                        <div className="relative w-full aspect-square md:aspect-auto md:h-64 rounded-lg overflow-hidden shadow-xl ring-1 ring-white/5 group">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: currentTrack?.coverImage
                                        ? `url("${currentTrack.coverImage}")`
                                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-3 left-3">
                                <div className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white border border-white/10 shadow-sm">
                                    <span className="relative flex h-2 w-2">
                                        <span className={`${isPlaying ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-primary opacity-75`}></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    <span>{isPlaying ? 'Now Playing' : 'Paused'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Track Info & Controls */}
                        <div className="flex flex-col gap-4">
                            <div className="space-y-1">
                                <h4 className="text-white text-xl font-bold leading-tight truncate">
                                    {currentTrack?.title || 'No Track Selected'}
                                </h4>
                                <p className="text-slate-400 text-sm font-medium">
                                    {currentTrack?.artist || 'Unknown Artist'}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-2 group">
                                <div
                                    className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden cursor-pointer"
                                    onClick={handleSeek}
                                >
                                    <div
                                        className="h-full bg-primary rounded-full relative group-hover:bg-blue-400 transition-colors"
                                        style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-500 font-medium font-mono uppercase tracking-wider">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Playback Controls */}
                            <div className="flex items-center justify-between mt-1">
                                <button
                                    onClick={() => setIsShuffle(!isShuffle)}
                                    className={`transition-colors ${isShuffle ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
                                    title="Shuffle"
                                >
                                    <span className="material-symbols-outlined text-xl">shuffle</span>
                                </button>
                                <div className="flex items-center gap-5">
                                    <button
                                        onClick={handlePrevious}
                                        className="text-slate-300 hover:text-white hover:scale-110 transition-all active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-4xl">skip_previous</span>
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        className="flex items-center justify-center size-14 rounded-full bg-primary text-white hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/25"
                                    >
                                        <span className="material-symbols-outlined text-4xl">
                                            {isPlaying ? 'pause' : 'play_arrow'}
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="text-slate-300 hover:text-white hover:scale-110 transition-all active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-4xl">skip_next</span>
                                    </button>
                                </div>
                                <button
                                    onClick={toggleRepeat}
                                    className={`transition-colors ${repeatMode !== 'none' ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
                                    title={`Repeat: ${repeatMode}`}
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {repeatMode === 'one' ? 'repeat_one' : 'repeat'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Playlist */}
                    <div className="flex flex-col bg-surface-dark/30 h-full max-h-[500px] md:max-h-full">
                        <div className="p-4 border-b border-border-dark flex items-center justify-between bg-surface-dark/50 backdrop-blur sticky top-0 z-10">
                            <h5 className="text-white text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">queue_music</span>
                                Up Next
                            </h5>
                            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-wider">
                                {tracks.length} tracks
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {tracks.map((track, index) => (
                                <button
                                    key={track._id}
                                    onClick={() => handleTrackSelect(index)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors group text-left ${index === currentTrackIndex
                                            ? 'bg-white/5 border border-white/5'
                                            : 'hover:bg-white/5'
                                        }`}
                                >
                                    <div className="relative size-10 rounded bg-slate-800 overflow-hidden flex-shrink-0">
                                        {track.coverImage ? (
                                            <img
                                                src={track.coverImage}
                                                alt={track.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-slate-400 text-sm">music_note</span>
                                            </div>
                                        )}
                                        {index === currentTrackIndex && isPlaying && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <span className="material-symbols-outlined text-primary animate-pulse">graphic_eq</span>
                                            </div>
                                        )}
                                        {index !== currentTrackIndex && (
                                            <>
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs font-bold group-hover:hidden">
                                                    {index + 1}
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                                    <span className="material-symbols-outlined text-lg">play_arrow</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <p className={`text-sm font-medium truncate transition-colors ${index === currentTrackIndex ? 'text-white font-bold' : 'text-slate-300 group-hover:text-white'
                                            }`}>
                                            {track.title}
                                        </p>
                                        <p className={`text-xs truncate ${index === currentTrackIndex ? 'text-primary font-medium' : 'text-slate-500'
                                            }`}>
                                            {index === currentTrackIndex && isPlaying ? 'Playing Now' : track.artist}
                                        </p>
                                    </div>
                                    <span className="text-xs text-slate-500 font-mono">
                                        {formatTime(track.duration || 0)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MusicPlayer;
