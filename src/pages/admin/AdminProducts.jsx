import React, { useState, useEffect } from 'react';
import {
    Package,
    Search,
    Plus,
    AlertTriangle,
    Filter,
    MoreHorizontal,
    Edit2,
    Trash2,
    TrendingUp,
    Loader2,
    X,
    Save
} from 'lucide-react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/api';

const AdminProducts = () => {
    // State
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Hair',
        price: '',
        stock: '',
        sku: '',
        description: '',
        image: ''
    });

    // Categories
    const categories = ['All', 'Hair', 'Tattoo', 'Spa', 'Piercing'];
    const formCategories = ['Hair', 'Tattoo', 'Spa', 'Piercing'];

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(result);
    }, [activeCategory, searchTerm, products]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    // Modal Handlers
    const openAddModal = () => {
        setIsEditing(false);
        setFormData({
            name: '',
            category: 'Hair',
            price: '',
            stock: '',
            sku: '',
            description: '',
            image: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            sku: product.sku || '',
            description: product.description || '',
            image: product.image || ''
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Optimistic Update
            const updatedData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock)
            };

            if (isEditing && currentProduct) {
                // UPDATE
                const newProducts = products.map(p =>
                    p.id === currentProduct.id ? { ...p, ...updatedData } : p
                );
                setProducts(newProducts);
                await updateProduct(currentProduct.id, updatedData);
            } else {
                // ADD
                const tempId = Date.now();
                const newProduct = { id: tempId, ...updatedData };
                setProducts([newProduct, ...products]);
                await addProduct(updatedData);
            }
            closeModal();
            fetchProducts(); // Refresh to ensure sync
        } catch (error) {
            console.error("Operation failed", error);
            fetchProducts(); // Revert on failure
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const newProducts = products.filter(p => p.id !== id);
            setProducts(newProducts);
            try {
                await deleteProduct(id);
            } catch (error) {
                console.error("Delete failed", error);
                fetchProducts();
            }
        }
    };

    return (
        <div className="min-h-full pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1c1917] tracking-tight">Product Inventory</h1>
                    <p className="text-[#78716c] mt-1 text-sm font-medium">Manage catalog content and stock levels.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#f97316] text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95"
                >
                    <Plus size={18} />
                    Add New Product
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 mb-6 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-[#1c1917] text-white'
                                    : 'bg-stone-50 text-[#78716c] hover:bg-stone-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 text-[#a8a29e]" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#f97316]/20"
                    />
                </div>
            </div>

            {/* Product Grid/Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50 text-[#78716c] text-xs font-bold uppercase tracking-wider text-left">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <Loader2 className="animate-spin text-[#f97316] mx-auto" size={32} />
                                    </td>
                                </tr>
                            ) : filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-stone-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-stone-100 flex-shrink-0 overflow-hidden">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[#1c1917] font-bold text-sm">{product.name}</p>
                                                <p className="text-[#a8a29e] text-xs font-medium line-clamp-1 max-w-[200px] mt-0.5">
                                                    {product.description || "No description provided."}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-3 py-1 bg-stone-100 text-[#78716c] text-[10px] font-bold uppercase tracking-wide rounded-lg">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#1c1917] font-bold text-sm">
                                        ${product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.stock > 0 ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <span className="text-sm font-medium text-green-700">In Stock ({product.stock})</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <span className="text-sm font-medium text-red-700">Out of Stock</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 text-[#a8a29e]">
                                            <button
                                                onClick={() => openEditModal(product)}
                                                className="p-2 hover:bg-orange-50 hover:text-[#f97316] rounded-lg transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl border border-stone-100 overflow-hidden transform transition-all">
                        <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-[#fdfbf7]">
                            <h2 className="text-xl font-bold text-[#1c1917]">
                                {isEditing ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={closeModal} className="text-[#a8a29e] hover:text-[#1c1917] transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold text-[#78716c] uppercase tracking-wider mb-2">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#f97316]/20 text-[#1c1917]"
                                    placeholder="Enter product name..."
                                />
                            </div>

                            {/* Category & SKU */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#78716c] uppercase tracking-wider mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#f97316]/20 text-[#1c1917]"
                                    >
                                        {formCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#78716c] uppercase tracking-wider mb-2">SKU (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.sku}
                                        onChange={e => setFormData({ ...formData, sku: e.target.value })}
                                        className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#f97316]/20 text-[#1c1917]"
                                        placeholder="SKU-123"
                                    />
                                </div>
                            </div>

                            {/* Price & Stock */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#78716c] uppercase tracking-wider mb-2">Price ($)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#f97316]/20 text-[#1c1917]"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#78716c] uppercase tracking-wider mb-2">Stock Level</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#f97316]/20 text-[#1c1917]"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-xs font-bold text-[#78716c] uppercase tracking-wider mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#f97316]/20 text-[#1c1917]"
                                    placeholder="https://..."
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-[#78716c] uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-stone-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#f97316]/20 text-[#1c1917] resize-none"
                                    placeholder="Product description for customers..."
                                ></textarea>
                                <p className="text-[10px] text-[#a8a29e] mt-1 text-right">Visible on customer product page.</p>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-3 bg-stone-100 text-[#78716c] rounded-xl text-sm font-bold hover:bg-stone-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-[#f97316] text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    {isEditing ? 'Save Changes' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
