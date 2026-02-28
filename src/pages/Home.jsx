import { Button } from '../components/Common/Button';
import { Link } from 'react-router-dom';
import { InstagramFeed } from '../components/Home/InstagramFeed';
import { GoogleReviews } from '../components/Home/GoogleReviews';

export const Home = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-dark">
                <div className="absolute inset-0 z-0">
                    {/* Background image with slow zoom effect */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521590832167-7bfcfaa637f9?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 animate-slow-zoom"></div>
                    {/* Gradient overlay for text readability blending into the light section below */}
                    <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/50 to-light"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
                    <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.1s', opacity: 0 }}>
                        Tarzınızı <span className="text-primary-500 italic">Yükseltin</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up drop-shadow-md" style={{ animationDelay: '0.3s', opacity: 0 }}>
                        Benzersiz kişiliğinize uygun birinci sınıf kuaförlük ve şekillendirme hizmetlerini deneyimleyin. İçinizdeki en iyiyi ortaya çıkarıyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
                        <Link to="/booking">
                            <Button variant="primary" className="w-full sm:w-auto text-lg px-10 py-4 shadow-primary-500/20 hover:shadow-primary-500/40 tracking-wider">Randevu Al</Button>
                        </Link>
                        <Link to="/services">
                            <Button variant="outline" className="w-full sm:w-auto text-lg px-10 py-4 glass text-white border-white/30 hover:bg-white/10 tracking-wider">Hizmetlerimizi Keşfedin</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-32 bg-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
                        <h2 className="text-4xl md:text-6xl font-serif text-dark mb-6">Birinci Sınıf Hizmetlerimiz</h2>
                        <div className="w-24 h-[2px] bg-primary-500 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Map through a few services here */}
                        {[
                            { id: 1, title: 'Hassas Kesim', image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2600&auto=format&fit=crop', delay: '0.4s' },
                            { id: 2, title: 'Balyaj & Boya', image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2540&auto=format&fit=crop', delay: '0.6s' },
                            { id: 3, title: 'Saç Derisi Terapisi', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2574&auto=format&fit=crop', delay: '0.8s' }
                        ].map((item) => (
                            <div key={item.id} className="group bg-white rounded-none shadow-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up flex flex-col" style={{ animationDelay: item.delay, opacity: 0 }}>
                                <div className="h-80 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                                </div>
                                <div className="p-10 flex flex-col flex-grow bg-white border-b border-l border-r border-gray-100 relative z-20">
                                    <h3 className="text-2xl font-serif text-dark mb-4">{item.title}</h3>
                                    <p className="text-gray-500 mb-8 font-light leading-relaxed flex-grow">Özel ihtiyaçlarınıza göre uyarlanmış uzman şekillendirme ve yenileyici bakımlar.</p>
                                    <Link to="/services" className="inline-flex items-center text-primary-600 font-medium tracking-widest uppercase text-xs hover:text-primary-700 transition-colors">
                                        Daha Fazla Bilgi <span className="ml-2 transform group-hover:translate-x-2 transition-transform">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram Reels & Gallery Section */}
            <InstagramFeed />

            {/* Google Reviews Section */}
            <GoogleReviews />
        </div>
    );
};
