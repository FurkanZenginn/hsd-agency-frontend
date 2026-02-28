import { Link } from 'react-router-dom';
import { Scissors, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-dark text-gray-300 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6 group">
                            <div className="bg-primary-900/50 border border-primary-500/30 p-2.5 rounded-none group-hover:bg-primary-500 transition-colors duration-500">
                                <Scissors className="h-6 w-6 text-primary-500 group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-serif font-bold text-2xl tracking-widest text-white uppercase">
                                HSD <span className="text-primary-500">Agency</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 mb-8 max-w-xs font-light leading-relaxed">
                            Eşsiz kişiliğinize uygun birinci sınıf kuaförlük ve şekillendirme hizmetleri.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="flex items-center justify-center w-10 h-10 border border-gray-700 text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all duration-300"><Instagram size={18} /></a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 border border-gray-700 text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all duration-300"><Facebook size={18} /></a>
                            <a href="#" className="flex items-center justify-center w-10 h-10 border border-gray-700 text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all duration-300"><Twitter size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-serif tracking-widest uppercase mb-6 text-lg">Hızlı Bağlantılar</h3>
                        <ul className="space-y-3 text-sm font-light">
                            <li><Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors">Hakkımızda</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-primary-500 transition-colors">Hizmetler</Link></li>
                            <li><Link to="/team" className="text-gray-400 hover:text-primary-500 transition-colors">Ekibimiz</Link></li>
                            <li><Link to="/booking" className="text-gray-400 hover:text-primary-500 transition-colors">Online Randevu</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-serif tracking-widest uppercase mb-6 text-lg">İletişim</h3>
                        <ul className="space-y-3 text-sm text-gray-400 font-light">
                            <li>123 Stil Caddesi</li>
                            <li>Moda Bölgesi, NY 10001</li>
                            <li>hello@hsdagency.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-serif tracking-widest uppercase mb-6 text-lg">Çalışma Saatleri</h3>
                        <ul className="space-y-3 text-sm text-gray-400 font-light border border-gray-800 p-6 bg-dark/50">
                            <li className="flex justify-between border-b border-gray-800 pb-2"><span>Pzt - Cum:</span> <span className="text-white">09:00 - 20:00</span></li>
                            <li className="flex justify-between border-b border-gray-800 pb-2 pt-2"><span>Cumartesi:</span> <span className="text-white">10:00 - 18:00</span></li>
                            <li className="flex justify-between pt-2"><span>Pazar:</span> <span className="text-primary-500">Kapalı</span></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase text-gray-600 font-medium">
                    <p>&copy; {new Date().getFullYear()} HSD Agency. Tüm hakları saklıdır.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <Link to="#" className="hover:text-primary-500 transition-colors">Gizlilik Politikası</Link>
                        <Link to="#" className="hover:text-primary-500 transition-colors">Şartlar & Koşullar</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
