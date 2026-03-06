import { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

// ─── Kategori verileri ────────────────────────────────────────────────────────
const INITIAL_CATEGORIES = [
    {
        id: 1,
        name: 'Moda Çekimleri',
        cover: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1485893086445-ed75865251e0?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
        ],
    },
    {
        id: 2,
        name: 'Salon Çalışmaları',
        cover: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1521590832167-7bfcfaa637f9?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200&auto=format&fit=crop',
        ],
    },
    {
        id: 3,
        name: 'Make-Up Çalışmaları',
        cover: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503236823255-94609f598e71?q=80&w=1200&auto=format&fit=crop',
        ],
    },
    {
        id: 4,
        name: 'Gelinler...',
        cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200&auto=format&fit=crop',
        ],
    },
    {
        id: 5,
        name: 'Saç Tasarımları',
        cover: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1200&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop',
        ],
    },
    {
        id: 6,
        name: 'Erkek Kesimler',
        cover: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1200&auto=format&fit=crop',
        ],
    },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ images, startIdx, onClose }) => {
    const [idx, setIdx] = useState(startIdx);
    const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
    const next = () => setIdx(i => (i + 1) % images.length);

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Kapat */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
                <X className="w-7 h-7" />
            </button>

            {/* Önceki / Sonraki */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={e => { e.stopPropagation(); prev(); }}
                        className="absolute left-4 sm:left-8 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors rotate-180"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                    <button
                        onClick={e => { e.stopPropagation(); next(); }}
                        className="absolute right-4 sm:right-8 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </>
            )}

            <div className="relative max-w-5xl w-full px-16 sm:px-20" onClick={e => e.stopPropagation()}>
                <img
                    src={images[idx]}
                    alt=""
                    className="w-full max-h-[82vh] object-contain"
                />
                {/* Sayaç */}
                <p className="text-center text-white/40 text-sm mt-4">
                    {idx + 1} / {images.length}
                </p>
            </div>
        </div>
    );
};

// ─── Galeri görünümü (bir kategorinin içi) ────────────────────────────────────
const GalleryView = ({ category, onBack }) => {
    const [lightbox, setLightbox] = useState(null);

    return (
        <div className="min-h-screen bg-[#111] pt-32 pb-20">
            {lightbox !== null && (
                <Lightbox
                    images={category.images}
                    startIdx={lightbox}
                    onClose={() => setLightbox(null)}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Üst bar */}
                <div className="flex items-center justify-between mb-10">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-light tracking-widest uppercase"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Geri
                    </button>
                    <h2 className="text-white text-2xl font-serif italic">{category.name}</h2>
                    <div className="w-24" />
                </div>

                {/* Masonry-style grid */}
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                    {category.images.map((src, i) => (
                        <div
                            key={i}
                            className="relative break-inside-avoid overflow-hidden cursor-pointer"
                            onClick={() => setLightbox(i)}
                        >
                            <img
                                src={src}
                                alt=""
                                className="w-full block grayscale hover:grayscale-0 transition-all duration-500 object-cover"
                            />
                        </div>
                    ))}
                </div>

                {category.images.length === 0 && (
                    <div className="text-center py-32 text-white/20">
                        <ImagePlus className="w-16 h-16 mx-auto mb-4" />
                        <p className="font-light tracking-widest text-sm uppercase">Henüz görsel eklenmemiş</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Ana Katalog bileşeni ─────────────────────────────────────────────────────
export const Catalog = () => {
    const [active, setActive] = useState(null); // açık kategori
    const categories = INITIAL_CATEGORIES;

    const activeCategory = categories.find(c => c.id === active);

    // ── Galeri içi görünüm ──
    if (active && activeCategory) {
        return (
            <GalleryView
                category={activeCategory}
                onBack={() => setActive(null)}
            />
        );
    }

    // ── Ana katalog grid ──
    return (
        <div className="bg-[#111] min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-0 sm:px-4">

                {/* Başlık */}
                <div className="text-center mb-12 px-4">
                    <span className="text-xs tracking-[0.4em] text-white/30 uppercase font-light block mb-3">
                        Portfolio
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif italic text-white mb-4">
                        Katalog
                    </h1>
                    <div className="w-16 h-[1px] bg-white/20 mx-auto" />
                </div>

                {/* Kategori Grid – 2 sütun, tam genişlik kartlar */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    {categories.map((cat, i) => (
                        <div
                            key={cat.id}
                            className="relative overflow-hidden cursor-pointer group aspect-[4/3]"
                            onClick={() => setActive(cat.id)}
                        >
                            {/* Siyah-beyaz kapak görsel */}
                            <img
                                src={cat.cover}
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                            />

                            {/* Koyu overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

                            {/* Fotoğraf sayısı rozeti */}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white/60 text-[10px] tracking-widest px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {cat.images.length} Fotoğraf
                            </div>

                            {/* Alt bilgi */}
                            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-7">
                                <h3 className="text-white text-lg sm:text-xl font-serif italic leading-tight">
                                    {cat.name}
                                </h3>
                                <div className="flex items-center gap-1.5 text-white/70 group-hover:text-white transition-colors text-xs sm:text-sm font-light tracking-widest whitespace-nowrap ml-4">
                                    Galeri
                                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* İnce border efekt */}
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
