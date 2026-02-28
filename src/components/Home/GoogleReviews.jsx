import React from 'react';
import { Star } from 'lucide-react';

// Mock reviews specifically for Bandırma Onyedi Eylül University
const REVIEWS_DATA = [
    {
        id: 1,
        author: "Ahmet K.",
        rating: 5,
        text: "Kampüs hayatı ve eğitim kalitesi gerçekten çok iyi. Hocalar çok ilgili.",
        date: "2 hafta önce"
    },
    {
        id: 2,
        author: "Zeynep Y.",
        rating: 5,
        text: "Kütüphane olanakları çok geniş. Öğrenci dostu bir şehirde harika bir üniversite.",
        date: "1 ay önce"
    },
    {
        id: 3,
        author: "Can H.",
        rating: 4,
        text: "Manzarası muazzam, sosyal olanaklar giderek gelişiyor. Kesinlikle tavsiye ederim.",
        date: "3 ay önce"
    },
    {
        id: 4,
        author: "Ayşe D.",
        rating: 5,
        text: "Hem akademik kadro hem de fiziksel şartlar açısından beklentilerimi fazlasıyla karşıladı.",
        date: "2 ay önce"
    },
    {
        id: 5,
        author: "Mehmet S.",
        rating: 5,
        text: "Bandırma'da öğrenci olmak ayrıcalıktır. Üniversitemizin denize nazır kampüsü çok güzel.",
        date: "4 hafta önce"
    },
    {
        id: 6,
        author: "Elif B.",
        rating: 4,
        text: "Laboratuvar altyapısı ve uygulamalı dersler çok başarılı. Kendimi geliştirmem için çok uygun bir ortam.",
        date: "5 ay önce"
    }
];

export const GoogleReviews = () => {
    // Duplicate the array to create a seamless looping effect
    const repeatingReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];

    return (
        <section className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center animate-fade-in-up">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google Logo" className="w-8 h-8" />
                    <span className="text-xl font-bold text-gray-800 tracking-wide">Yorumlar</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-dark mb-6">Müşterilerimiz Ne Diyor?</h2>
                <div className="w-24 h-[2px] bg-primary-500 mx-auto mb-6"></div>
                <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
                    Bandırma Onyedi Eylül Üniversitesi için yapılan güncel Google değerlendirmeleri.
                </p>
                <div className="flex items-center justify-center gap-1 mt-6">
                    <span className="text-2xl font-bold text-dark mr-2">4.8</span>
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-6 h-6 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : i === 4 ? 'fill-yellow-400 text-yellow-400 opacity-50' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">(128 Değerlendirme)</span>
                </div>
            </div>

            {/* Scrolling Ticker Container */}
            <div className="relative flex overflow-x-hidden group">
                {/* Fade edges */}
                <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

                {/* Animated Track - requires custom animation in tailwind.config.js */}
                <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] py-4 whitespace-nowrap px-6">
                    {repeatingReviews.map((review, idx) => (
                        <div
                            key={`${review.id}-${idx}`}
                            className="w-[350px] md:w-[450px] flex-shrink-0 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 whitespace-normal flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl border border-primary-100">
                                            {review.author.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-dark text-lg">{review.author}</h4>
                                            <span className="text-xs text-gray-400">{review.date}</span>
                                        </div>
                                    </div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5 opacity-50" />
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                                    ))}
                                </div>
                                <p className="text-gray-600 font-light leading-relaxed mb-4">
                                    "{review.text}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx="true">{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                    width: max-content;
                }
            `}</style>
        </section>
    );
};
