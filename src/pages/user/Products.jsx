import React, { useState, useEffect } from 'react';
import { Star, Eye, ShoppingBag, Droplets, Scissors, Sparkles, Filter } from 'lucide-react';
import { getProducts } from '../../services/api';

// --- Product Card Component ---
const ProductCard = ({ product }) => {
    return (
        <div className="group relative bg-white rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_8px_30px_-4px_rgba(255,140,66,0.15)] hover:scale-[1.02] border border-stone-50">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isExpertChoice && (
                    <span className="bg-[#7B9E89]/10 text-[#7B9E89] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-[#7B9E89]/20">
                        Expert Choice
                    </span>
                )}
                {product.isBestSeller && (
                    <span className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-orange-100">
                        Best Seller
                    </span>
                )}
            </div>

            {/* Quick Look Overlay Trigger */}
            <div className="relative aspect-square mb-6 overflow-hidden rounded-xl bg-[#FAF7F2]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 backdrop-blur-[1px]">
                    <button className="bg-white text-[var(--color-foreground)] px-4 py-2 rounded-full font-medium text-sm shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-[var(--color-primary)] hover:text-white">
                        <Eye size={16} />
                        Quick Look
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-1">
                            {product.category}
                        </p>
                        <h3 className="text-lg font-bold text-[var(--color-foreground)] leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                            {product.name}
                        </h3>
                    </div>
                    <span className="text-lg font-bold text-[var(--color-foreground)]">${product.price}</span>
                </div>

                <p className="text-sm text-[var(--color-foreground-muted)] line-clamp-2 min-h-[2.5em]">
                    {product.shortDescription}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 pt-2 border-t border-stone-50">
                    <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(product.rating) ? "fill-current" : "text-stone-200"}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-[var(--color-foreground-muted)] font-medium">
                        ({product.reviewCount} Verified Reviews)
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---
const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const categories = ['All', 'Styling', 'Grooming', 'Rituals'];

    const filteredProducts = activeFilter === 'All'
        ? products
        : products.filter(p => p.category === activeFilter);

    // Dynamic Icon for Header based on filter
    const getHeaderIcon = () => {
        switch (activeFilter) {
            case 'Styling': return <Scissors className="text-orange-300" size={32} />;
            case 'Grooming': return <Sparkles className="text-orange-300" size={32} />;
            case 'Rituals': return <Droplets className="text-orange-300" size={32} />;
            default: return <ShoppingBag className="text-orange-300" size={32} />;
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] animate-fade-in pb-20">
            {/* Hero Section - Product of the Month */}
            <section className="relative overflow-hidden bg-[#2D2A26] text-[#FAF7F2] rounded-3xl mx-4 lg:mx-8 mt-4 mb-12 min-h-[400px] flex items-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="container mx-auto px-8 py-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest">
                            <Sparkles size={12} />
                            Spotlight Selection
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                            Volcanic Ash <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                                Texturizing Paste
                            </span>
                        </h1>
                        <p className="text-stone-400 text-lg max-w-xl leading-relaxed">
                            Experience the perfect balance of hold and pliability. Sourced from authentic volcanic minerals for a matte finish that defies gravity.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                            <button className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1">
                                Shop Now - $28
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-stone-600 text-stone-300 rounded-xl font-bold hover:bg-white/5 transition-all">
                                View Details
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 relative flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full animate-pulse"></div>
                            <img
                                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
                                alt="Featured Product"
                                className="relative w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="container mx-auto px-4 lg:px-8 mb-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        {getHeaderIcon()}
                        <h2 className="text-3xl font-bold text-[var(--color-foreground)]">
                            Curated Collection
                        </h2>
                    </div>

                    <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-stone-100 overflow-x-auto max-w-full">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap
                                    ${activeFilter === category
                                        ? 'bg-orange-50 text-[var(--color-primary)] shadow-sm'
                                        : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-stone-50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 lg:px-8">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="h-96 bg-white rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-stone-400">
                        <p className="text-xl">No products found in this category.</p>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className="mt-4 text-[var(--color-primary)] hover:underline font-medium"
                        >
                            View all products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
