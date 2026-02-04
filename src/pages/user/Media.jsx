import React, { useEffect, useState } from 'react';
import { Play, Heart, MessageCircle, Eye } from 'lucide-react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import { getMediaContent } from '../../services/api';

const CATEGORIES = ["All", "Haircut", "Grooming", "Styling"];

const Media = () => {
    const [content, setContent] = useState({ transformations: [], videos: [] });
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchMedia = async () => {
            const data = await getMediaContent();
            setContent(data);
            setLoading(false);
        };
        fetchMedia();
    }, []);

    const filteredTransformations = content.transformations.filter(
        item => activeCategory === "All" || item.category === activeCategory
    );

    return (
        <div className="space-y-12 pb-12">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Media Gallery</h1>
                <p className="text-[var(--color-foreground-muted)]">Get inspired by our latest work and stories.</p>
            </div>

            {/* Transformations Section */}
            <section className="space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Our Work</h2>

                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                                px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border
                                ${activeCategory === cat
                                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                        : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'
                                    }
                            `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-stone-400 py-12">Loading transformations...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredTransformations.map(item => (
                            <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-stone-100">
                                <div className="mb-4 px-2">
                                    <h3 className="font-bold text-[var(--color-foreground)]">{item.title}</h3>
                                    <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">{item.category}</span>
                                </div>
                                <div className="h-[350px]">
                                    <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Video Showcase Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Watch & Inspire</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.videos.map(video => (
                        <div key={video.id} className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Thumbnail Container */}
                            <div className="relative aspect-[9/16] bg-stone-200 overflow-hidden">
                                <img src={video.thumb} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                                        <Play size={24} className="text-white fill-white ml-1" />
                                    </div>
                                </div>

                                {/* Overlay Stats */}
                                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent pt-12 text-white">
                                    <h3 className="font-bold leading-tight mb-1">{video.title}</h3>
                                    <p className="text-xs text-white/80 mb-3">{video.creator}</p>
                                    <div className="flex items-center justify-between text-xs font-medium">
                                        <span className="flex items-center gap-1"><Eye size={14} /> {video.views}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1"><Heart size={14} /> {video.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="p-4">
                                <button className="w-full py-3 rounded-xl bg-orange-50 text-[var(--color-primary)] font-bold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm">
                                    {video.service}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Media;
