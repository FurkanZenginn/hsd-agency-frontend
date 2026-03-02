import { useState, useEffect } from 'react';
import { ShoppingBag, Star, X } from 'lucide-react';

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'Saç Şekillendirici Wax',
        description: 'Güçlü tutuş, mat görünüm. Tüm saç tipleri için idealdir.',
        price: 350,
        category: 'Şekillendirici',
        rating: 4.8,
        image: null,
    },
    {
        id: 2,
        name: 'Sakal Bakım Yağı',
        description: 'Argan ve jojoba yağı karışımı. Sakalınızı yumuşatır ve parlaklık verir.',
        price: 280,
        category: 'Sakal Bakım',
        rating: 4.9,
        image: null,
    },
    {
        id: 3,
        name: 'Profesyonel Saç Kremi',
        description: 'Keratin destekli onarıcı krem. Yıpranmış saçlara hayat verir.',
        price: 420,
        category: 'Saç Bakım',
        rating: 4.7,
        image: null,
    },
    {
        id: 4,
        name: 'Tıraş Sonrası Losyon',
        description: 'Ferahlatıcı ve yatıştırıcı formül. Tıraş sonrası tahrişi önler.',
        price: 220,
        category: 'Tıraş',
        rating: 4.6,
        image: null,
    },
    {
        id: 5,
        name: 'Saç Spreyi',
        description: 'Uzun süren tutuş sağlayan profesyonel sprey. Doğal görünüm.',
        price: 300,
        category: 'Şekillendirici',
        rating: 4.5,
        image: null,
    },
    {
        id: 6,
        name: 'Saç & Sakal Şampuanı',
        description: 'Hem saç hem sakal için özel formül. Günlük kullanıma uygundur.',
        price: 260,
        category: 'Saç Bakım',
        rating: 4.8,
        image: null,
    },
];

const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={14}
                className={i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
            />
        ))}
        <span className="text-xs text-gray-400 ml-1">({rating})</span>
    </div>
);

const ProductCard = ({ product, onClick }) => (
    <div
        onClick={() => onClick(product)}
        className="group cursor-pointer bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
        {/* Image Area */}
        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
            {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-500/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <ShoppingBag size={36} className="text-primary-500/60" />
                </div>
            )}
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-dark/80 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full backdrop-blur-sm">
                    {product.category}
                </span>
            </div>
        </div>

        {/* Info */}
        <div className="p-5">
            <StarRating rating={product.rating || 4.5} />
            <h3 className="text-lg font-bold text-dark mt-2 group-hover:text-primary-500 transition-colors duration-300">
                {product.name}
            </h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xl font-bold text-primary-500">₺{product.price}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium group-hover:text-primary-500 transition-colors">
                    Detay →
                </span>
            </div>
        </div>
    </div>
);

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/70 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div
                className="bg-white rounded-3xl max-w-lg w-full shadow-2xl animate-fade-in-up overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-500/5 flex items-center justify-center">
                            <ShoppingBag size={48} className="text-primary-500/60" />
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-dark/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-dark/80 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-dark/80 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-full backdrop-blur-sm">
                        {product.category}
                    </span>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                    <StarRating rating={product.rating || 4.5} />
                    <h2 className="text-2xl font-bold text-dark mt-3">{product.name}</h2>
                    <p className="text-gray-500 mt-3 leading-relaxed">{product.description}</p>
                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-3xl font-bold text-primary-500">₺{product.price}</span>
                        <span className="text-sm text-gray-400">Salonumuzda mevcuttur</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Products = () => {
    const [productsData, setProductsData] = useState(DEFAULT_PRODUCTS);
    const [activeCategory, setActiveCategory] = useState('Tümü');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // localStorage'dan admin panelinde kaydedilen ürünleri oku
        try {
            const stored = localStorage.getItem('hsd_products');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.length > 0) {
                    setProductsData(parsed);
                }
            }
        } catch (e) {
            console.error('localStorage okuma hatası', e);
        }

        // storage event dinle — admin panelinden değişiklik olursa güncelle
        const handleStorage = (e) => {
            if (e.key === 'hsd_products' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    if (parsed && parsed.length > 0) {
                        setProductsData(parsed);
                    }
                } catch (err) {
                    console.error('storage event parse hatası', err);
                }
            }
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const categories = ['Tümü', ...new Set(productsData.map(p => p.category))];

    const filtered = activeCategory === 'Tümü'
        ? productsData
        : productsData.filter(p => p.category === activeCategory);

    return (
        <div className="py-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-500 text-[11px] font-bold uppercase tracking-[0.25em] rounded-full mb-4">
                        Mağaza
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Ürünlerimiz</h1>
                    <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                        Profesyonel bakım ürünlerimizle evde de salon kalitesinde bakım yapın.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-full border transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-dark text-white border-dark shadow-lg shadow-dark/20'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-dark hover:text-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(product => (
                        <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-gray-400 italic">
                        Bu kategoride henüz ürün bulunmamaktadır.
                    </div>
                )}
            </div>

            {/* Product Detail Modal */}
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
    );
};
