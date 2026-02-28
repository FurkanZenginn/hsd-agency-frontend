import { Button } from "../components/Common/Button"

export const Contact = () => {
    return (
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <h1 className="text-4xl font-bold text-dark mb-6">İletişime Geçin</h1>
                    <p className="text-gray-600 mb-8 text-lg">Bir sorunuz mu var veya işbirliği mi yapmak istiyorsunuz? Sizden haber almaktan memnuniyet duyarız.</p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-dark mb-2">Adres</h3>
                            <p className="text-gray-600 mb-4">Bandırma Onyedi Eylül Üniversitesi<br />10200 Bandırma/Balıkesir</p>
                            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-64 w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.553258593452!2d27.94073581559815!3d40.352317366116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b5d2b7f7b2c0e5%3A0x6bba4bc0e3d23c8a!2sBand%C4%B1rma%20Onyedi%20Eyl%C3%BCl%20%C3%9Cniversitesi!5e0!3m2!1str!2str!4v1709400000000!5m2!1str!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location"
                                ></iframe>
                            </div>
                        </div>
                        <div className="pt-4">
                            <h3 className="text-lg font-bold text-dark">İletişim Bilgileri</h3>
                            <p className="text-gray-600">hello@hsdagency.com<br />+90 (555) 123-4567</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">İsim</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="Ahmet Yılmaz" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="ahmet@ornek.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mesaj</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="Size nasıl yardımcı olabiliriz?"></textarea>
                        </div>
                        <Button variant="primary" className="w-full">Mesaj Gönder</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
