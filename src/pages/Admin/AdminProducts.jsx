import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Package } from 'lucide-react';

const defaultProducts = [
    { id: 1, name: 'Saç Şekillendirici Wax', description: 'Güçlü tutuş, mat görünüm.', price: '350', category: 'Şekillendirici', rating: 4.8 },
    { id: 2, name: 'Sakal Bakım Yağı', description: 'Argan ve jojoba yağı karışımı.', price: '280', category: 'Sakal Bakım', rating: 4.9 },
    { id: 3, name: 'Profesyonel Saç Kremi', description: 'Keratin destekli onarıcı krem.', price: '420', category: 'Saç Bakım', rating: 4.7 },
    { id: 4, name: 'Tıraş Sonrası Losyon', description: 'Ferahlatıcı ve yatıştırıcı formül.', price: '220', category: 'Tıraş', rating: 4.6 },
    { id: 5, name: 'Saç Spreyi', description: 'Uzun süren tutuş sağlayan sprey.', price: '300', category: 'Şekillendirici', rating: 4.5 },
    { id: 6, name: 'Saç & Sakal Şampuanı', description: 'Hem saç hem sakal için özel formül.', price: '260', category: 'Saç Bakım', rating: 4.8 },
];

const emptyProduct = { name: '', description: '', price: '', category: '', rating: 5 };

export const AdminProducts = () => {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('hsd_products');
        return saved ? JSON.parse(saved) : defaultProducts;
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        localStorage.setItem('hsd_products', JSON.stringify(products));
    }, [products]);

    const openNew = () => {
        setEditingProduct({ ...emptyProduct, id: Date.now() });
        setShowModal(true);
    };

    const openEdit = (product) => {
        setEditingProduct({ ...product });
        setShowModal(true);
    };

    const saveProduct = () => {
        if (!editingProduct.name || !editingProduct.price) return;
        setProducts(prev => {
            const exists = prev.find(p => p.id === editingProduct.id);
            if (exists) {
                return prev.map(p => p.id === editingProduct.id ? editingProduct : p);
            }
            return [...prev, editingProduct];
        });
        setShowModal(false);
        setEditingProduct(null);
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        setDeleteConfirm(null);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Ürün Yönetimi</h1>
                    <p className="text-white/40 text-sm mt-1">Ürünlerinizi ekleyin, düzenleyin veya silin</p>
                </div>
                <button
                    onClick={openNew}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 uppercase tracking-wider"
                >
                    <Plus size={18} />
                    Yeni Ürün
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-[#1c1c27] border border-white/5 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-[11px] font-bold text-white/30 uppercase tracking-wider">
                    <div className="col-span-4">Ürün</div>
                    <div className="col-span-3">Kategori</div>
                    <div className="col-span-2">Fiyat</div>
                    <div className="col-span-1">Puan</div>
                    <div className="col-span-2 text-right">İşlemler</div>
                </div>

                {/* Table Rows */}
                {products.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                        <Package size={48} className="mx-auto text-white/10 mb-4" />
                        <p className="text-white/30 text-sm">Henüz ürün eklenmedi</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {products.map(product => (
                            <div key={product.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors items-center">
                                <div className="col-span-4">
                                    <p className="text-sm font-medium text-white/80">{product.name}</p>
                                    <p className="text-xs text-white/30 mt-0.5 line-clamp-1">{product.description}</p>
                                </div>
                                <div className="col-span-3">
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-white/50">{product.category}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-sm font-bold text-emerald-400">₺{product.price}</span>
                                </div>
                                <div className="col-span-1">
                                    <span className="text-sm text-amber-400">★ {product.rating}</span>
                                </div>
                                <div className="col-span-2 flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => openEdit(product)}
                                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(product.id)}
                                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && editingProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setShowModal(false)}>
                    <div className="bg-[#1c1c27] border border-white/10 rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                            <h3 className="text-lg font-bold text-white">
                                {products.find(p => p.id === editingProduct.id) ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-xs text-white/40 uppercase tracking-wider font-bold block mb-1.5">Ürün Adı *</label>
                                <input
                                    type="text"
                                    value={editingProduct.name}
                                    onChange={e => setEditingProduct(p => ({ ...p, name: e.target.value }))}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                                    placeholder="Ürün adını girin"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-white/40 uppercase tracking-wider font-bold block mb-1.5">Açıklama</label>
                                <textarea
                                    value={editingProduct.description}
                                    onChange={e => setEditingProduct(p => ({ ...p, description: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                                    placeholder="Ürün açıklaması"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-white/40 uppercase tracking-wider font-bold block mb-1.5">Fiyat (₺) *</label>
                                    <input
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={e => setEditingProduct(p => ({ ...p, price: e.target.value }))}
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-white/40 uppercase tracking-wider font-bold block mb-1.5">Kategori</label>
                                    <input
                                        type="text"
                                        value={editingProduct.category}
                                        onChange={e => setEditingProduct(p => ({ ...p, category: e.target.value }))}
                                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                                        placeholder="Kategori"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-white/40 uppercase tracking-wider font-bold block mb-1.5">Puan (1-5)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={editingProduct.rating}
                                    onChange={e => setEditingProduct(p => ({ ...p, rating: parseFloat(e.target.value) || 0 }))}
                                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-white/5 flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-2.5 bg-white/5 text-white/50 text-sm font-bold rounded-xl hover:bg-white/10 transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                onClick={saveProduct}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all"
                            >
                                <Save size={16} />
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setDeleteConfirm(null)}>
                    <div className="bg-[#1c1c27] border border-white/10 rounded-2xl max-w-sm w-full shadow-2xl p-8 text-center" onClick={e => e.stopPropagation()}>
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Trash2 size={28} className="text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ürünü Sil?</h3>
                        <p className="text-white/40 text-sm mb-8">Bu işlem geri alınamaz.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-2.5 bg-white/5 text-white/50 text-sm font-bold rounded-xl hover:bg-white/10 transition-colors"
                            >
                                Vazgeç
                            </button>
                            <button
                                onClick={() => deleteProduct(deleteConfirm)}
                                className="flex-1 py-2.5 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
