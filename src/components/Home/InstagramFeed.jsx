import React from 'react';
import { Instagram, Play, Heart, MessageCircle } from 'lucide-react';

const REELS_DATA = [
    {
        id: 1,
        videoBtnImage: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop',
        likes: '1.2K',
        comments: '48',
        caption: 'Mükemmel balyaj dönüşümü ✨ #hsdagency #balayage #hairtransformation',
        delay: '0.1s'
    },
    {
        id: 2,
        videoBtnImage: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=2572&auto=format&fit=crop',
        likes: '856',
        comments: '24',
        caption: 'Sağlıklı saçlar için keratin bakımı 💧 #sacekimi #keratintreatment',
        delay: '0.3s'
    },
    {
        id: 3,
        videoBtnImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop',
        likes: '2.4K',
        comments: '112',
        caption: 'Gelin saçı provamızdan kareler 👰‍♀️💍 #weddinghair #bridalstyle',
        delay: '0.5s'
    },
    {
        id: 4,
        videoBtnImage: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2669&auto=format&fit=crop',
        likes: '542',
        comments: '18',
        caption: 'Hassas kesim ile yepyeni bir görünüm ✂️ #haircut #style',
        delay: '0.7s'
    }
];

export const InstagramFeed = () => {
    return (
        <section className="py-32 bg-white relative overflow-hidden text-center">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-[100px] opacity-50 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-20 animate-fade-in-up">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Instagram className="w-8 h-8 text-primary-500" />
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">@hsdagency</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-dark mb-6">Tarzımızdan İlham Alın</h2>
                    <div className="w-24 h-[2px] bg-primary-500 mx-auto mb-8"></div>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        En son çalışmalarımızı, saç dönüşümlerini ve salonumuzun kamera arkası görüntülerini Instagram'da keşfedin. Bizi takip etmeyi unutmayın!
                    </p>
                </div>

                {/* Reels Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REELS_DATA.map((reel) => (
                        <a
                            key={reel.id}
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative aspect-[9/16] rounded-3xl overflow-hidden bg-dark shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up block"
                            style={{ animationDelay: reel.delay, opacity: 0 }}
                        >
                            {/* Image Background */}
                            <img
                                src={reel.videoBtnImage}
                                alt={reel.caption}
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                            />

                            {/* Gradient Overlay for Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Reels Icon Top Right */}
                            <div className="absolute top-4 right-4 text-white opacity-90 drop-shadow-md">
                                <Play className="w-6 h-6 fill-white" />
                            </div>

                            {/* Hover Overlay with Stats */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 z-20">
                                <div className="flex items-center text-white font-medium text-lg">
                                    <Heart className="w-6 h-6 mr-2 fill-white" /> {reel.likes}
                                </div>
                                <div className="flex items-center text-white font-medium text-lg">
                                    <MessageCircle className="w-6 h-6 mr-2 fill-white" /> {reel.comments}
                                </div>
                            </div>

                            {/* Bottom Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-light leading-relaxed line-clamp-2 drop-shadow-md">
                                    {reel.caption}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-10 py-4 rounded-full font-medium tracking-wide shadow-lg hover:shadow-orange-500/25 hover:-translate-y-1 transition-all duration-300">
                        <Instagram className="w-5 h-5" />
                        Bizi Instagram'da Takip Edin
                    </a>
                </div>
            </div>
        </section>
    );
};
