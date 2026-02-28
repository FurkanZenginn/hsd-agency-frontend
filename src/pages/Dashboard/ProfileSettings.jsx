import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Common/Button';

export const ProfileSettings = ({ view }) => {
    const { user } = useAuth();

    if (view === 'profile') {
        return (
            <div className="bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 rounded-[2rem] p-8 md:p-12 max-w-3xl animate-fade-in-up transition-all duration-300">
                <h2 className="text-3xl font-serif text-dark mb-8">Kişisel Bilgiler</h2>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Ad Soyad</label>
                            <input
                                type="text"
                                defaultValue={user?.name || 'Ayşe Yılmaz'}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark focus:bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">E-posta Adresi</label>
                            <input
                                type="email"
                                defaultValue={user?.email || 'ayse@ornek.com'}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark focus:bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Telefon Numarası</label>
                            <input
                                type="tel"
                                defaultValue="+90 (555) 000-0000"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark focus:bg-white"
                            />
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-100 flex justify-end">
                        <Button variant="primary" className="px-10 py-4 text-xs tracking-[0.2em] uppercase shadow-lg shadow-primary-500/20">Değişiklikleri Kaydet</Button>
                    </div>
                </form>
            </div>
        );
    }

    if (view === 'settings') {
        return (
            <div className="bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 rounded-[2rem] p-8 md:p-12 max-w-3xl animate-fade-in-up transition-all duration-300">
                <h2 className="text-3xl font-serif text-dark mb-8">Hesap Ayarları</h2>

                <div className="space-y-12">
                    {/* Password Section */}
                    <div>
                        <h3 className="text-xl font-serif text-dark mb-6">Güvenlik</h3>
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Mevcut Şifre</label>
                                    <input
                                        type="password"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark focus:bg-white"
                                    />
                                </div>
                                <div className="hidden md:block"></div> {/* layout spacer */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Yeni Şifre</label>
                                    <input
                                        type="password"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Yeni Şifreyi Onayla</label>
                                    <input
                                        type="password"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark focus:bg-white"
                                    />
                                </div>
                            </div>
                            <Button variant="primary" className="px-10 py-4 text-xs tracking-[0.2em] uppercase shadow-lg shadow-primary-500/20">Şifreyi Güncelle</Button>
                        </form>
                    </div>

                    <div className="border-t border-gray-100 mt-8"></div>

                    {/* Notifications */}
                    <div>
                        <h3 className="text-xl font-serif text-dark mb-6">Bildirimler</h3>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <label className="flex items-center gap-5 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 bg-white text-primary-500 focus:ring-1 focus:ring-primary-500 focus:ring-offset-white transition-all" defaultChecked />
                                <div>
                                    <div className="font-medium text-sm text-gray-700 group-hover:text-dark transition-colors">E-posta Hatırlatıcıları</div>
                                    <div className="text-sm font-light text-gray-500 mt-1">Randevulardan 24 saat önce hatırlatıcı alın.</div>
                                </div>
                            </label>
                            <label className="flex items-center gap-5 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 bg-white text-primary-500 focus:ring-1 focus:ring-primary-500 focus:ring-offset-white transition-all" defaultChecked />
                                <div>
                                    <div className="font-medium text-sm text-gray-700 group-hover:text-dark transition-colors">SMS Güncellemeleri</div>
                                    <div className="text-sm font-light text-gray-500 mt-1">İptaller veya program değişiklikleri için kısa mesajlar alın.</div>
                                </div>
                            </label>
                            <div className="pt-6">
                                <Button variant="primary" className="px-10 py-4 text-xs tracking-[0.2em] uppercase shadow-lg shadow-primary-500/20">Bildirim Ayarlarını Kaydet</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
