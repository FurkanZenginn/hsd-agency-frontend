import { Button } from '../components/Common/Button';
import { Link } from 'react-router-dom';
import { Sparkles, Scissors, Droplets, Star, Heart, CheckCircle2 } from 'lucide-react';

const SERVICES_DATA = [
    {
        id: 1,
        name: 'Hassas Kesim',
        icon: <Scissors className="w-6 h-6 text-primary-500" />,
        desc: 'Yüz şeklinize ve yaşam tarzınıza uygun kişiselleştirilmiş saç kesimi.',
        details: [
            'Detaylı saç ve yüz hatları analizi',
            'Sıcak havlu ile rahatlatıcı yıkama masajı',
            'Kişiye özel şekillendirme ve bakım önerileri',
            'Fön ve günlük stil oluşturma'
        ]
    },
    {
        id: 2,
        name: 'Balyaj ve Işıltı',
        icon: <Sparkles className="w-6 h-6 text-primary-500" />,
        desc: 'Doğal, güneşte açılmış gibi görünen özel el boyaması ışıltılar.',
        details: [
            'Renk danışmanlığı ve saç tonu testi',
            'Kişiselleştirilmiş serbest el boyama tekniği',
            'Saçı koruyan birinci sınıf açıcı kullanımı',
            'Olaplex veya benzeri bağ güçlendirici bakım'
        ]
    },
    {
        id: 3,
        name: 'Keratin & Botox Bakımı',
        icon: <Droplets className="w-6 h-6 text-primary-500" />,
        desc: 'Aylarca süren pürüzsüz, ipeksi ve kabarmayan sağlıklı saçlar.',
        details: [
            'Derinlemesine arındırıcı hazırlık şampuanı',
            'Özel formüllü keratin veya saç botoksu uygulaması',
            'Isı ile mühürleme ve sabitleme işlemi',
            'Ev devam ürünleri için bilgilendirme'
        ]
    },
    {
        id: 4,
        name: 'Gelin Saçı ve Makyajı',
        icon: <Star className="w-6 h-6 text-primary-500" />,
        desc: 'En özel gününüz için kusursuz, tüm gün dayanan profesyonel görünüm.',
        details: [
            'Ücretsiz ön prova ve saç tasarımı planlaması',
            'Dış çekim ve düğün konseptine uygun tasarım',
            'Tüm gün kalıcılığı sağlayan profesyonel ürünler',
            'İstenirse düğün mekanında VIP hizmet seçeneği'
        ]
    },
    {
        id: 5,
        name: 'Saç Derisi Spa Terapisi',
        icon: <Heart className="w-6 h-6 text-primary-500" />,
        desc: 'Sağlıklı saç uzaması için derinlemesine temizleyici ve canlandırıcı bakım.',
        details: [
            'Mikro kameralı detaylı saç derisi analizi',
            'Peeling ile ölü hücrelerden arındırma',
            'Buhar terapisi ile gözeneklerin açılması',
            'Dökülme karşıtı veya nemlendirici serum uygulaması'
        ]
    },
    {
        id: 6,
        name: 'Erkek Özel Bakımı',
        icon: <CheckCircle2 className="w-6 h-6 text-primary-500" />,
        desc: 'Modern kesimler, yüz hatlarına uygun geçişler ve sakal stil tasarımı.',
        details: [
            'Klasik veya modern saç kesimi ve şekillendirme',
            'Ustura ile detaylı ense ve favori temizliği',
            'Sıcak havlu kompresi ile sakal tıraşı ve düzeltme',
            'Canlandırıcı yüz maskesi ve saç derisi masajı'
        ]
    },
];

export const Services = () => {
    return (
        <div className="bg-light min-h-screen py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24 animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-serif text-dark mb-6">Özel Hizmetlerimiz</h1>
                    <div className="w-24 h-[2px] bg-primary-500 mx-auto mb-8"></div>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Güzelliğinizi ön plana çıkaran, alanında uzman ekibimizle sunduğumuz premium saç ve bakım hizmetlerini keşfedin. Size özel dokunuşlar ve en yüksek kalite ürünlerle buradayız.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {SERVICES_DATA.map((s, index) => (
                        <div key={s.id} className="group bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    {s.icon}
                                </div>
                                <h3 className="text-2xl font-serif text-dark group-hover:text-primary-600 transition-colors">{s.name}</h3>
                            </div>

                            <p className="text-gray-600 mb-8 font-medium leading-relaxed border-b border-gray-100 pb-6">{s.desc}</p>

                            <div className="flex-grow mb-10">
                                <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-4">Hizmet İçeriği</h4>
                                <ul className="space-y-3">
                                    {s.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0"></span>
                                            <span className="text-sm text-gray-500 font-light leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link to="/booking" className="mt-auto block">
                                <Button variant="outline" className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-500">
                                    Randevu Al
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

