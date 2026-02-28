import { useState, useContext } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import { Button } from '../components/Common/Button';
import { Check } from 'lucide-react';

export const Booking = ({ isDashboard = false, onBookingComplete }) => {
    const { bookingData, updateBookingData, resetBooking, addAppointment } = useContext(AppointmentContext);
    const [step, setStep] = useState(1);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const services = [
        { id: 's1', name: 'Hassas Kesim', duration: '60 dk', price: '$80' },
        { id: 's2', name: 'Balyaj Boya', duration: '180 dk', price: '$150' },
        { id: 's3', name: 'Keratin Bakımı', duration: '120 dk', price: '$250' },
    ];

    const staffMembers = [
        { id: 'st1', name: 'Alex Johnson', role: 'Kıdemli Stilist' },
        { id: 'st2', name: 'Sam Rivera', role: 'Renk Uzmanı' },
        { id: 'st3', name: 'Jamie Lee', role: 'Usta Stilist' },
    ];

    const generateTimeSlots = () => ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleConfirm = () => {
        addAppointment(bookingData);
        setIsConfirmed(true);
    };

    const handleReset = () => {
        setIsConfirmed(false);
        setStep(1);
        resetBooking();
    };

    if (isConfirmed) {
        return (
            <div className={isDashboard ? "px-4 py-8 text-center" : "max-w-3xl mx-auto px-4 py-32 text-center animate-fade-in-up"}>
                <div className={`${isDashboard ? 'bg-transparent text-dark' : 'bg-white text-dark shadow-2xl border border-gray-100'} rounded-3xl p-8 md:p-16 flex flex-col items-center`}>
                    <div className={`h-24 w-24 rounded-full flex items-center justify-center mb-8 border ${isDashboard ? 'bg-green-50 text-green-500 border-green-100' : 'bg-green-50 text-green-500 border-green-100'}`}>
                        <Check size={48} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-4xl font-serif mb-4 text-dark">Randevu Onaylandı!</h2>
                    <p className="text-gray-500 mb-10 max-w-md font-light leading-relaxed">
                        HSD Agency'den randevu aldığınız için teşekkür ederiz. Randevu detaylarınızı içeren bir onay e-postası gönderdik.
                    </p>
                    <div className={`${isDashboard ? 'bg-gray-50/50 border-gray-100' : 'bg-light/50 border-gray-100'} border p-8 rounded-2xl w-full max-w-md mb-10 text-left space-y-4`}>
                        <p className={`flex justify-between items-center border-b border-gray-100 pb-3`}><span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Hizmet</span> <span className="font-medium">{bookingData.service?.name}</span></p>
                        <p className={`flex justify-between items-center border-b border-gray-100 pb-3`}><span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Personel</span> <span className="font-medium">{bookingData.staff?.name}</span></p>
                        <p className={`flex justify-between items-center border-b border-gray-100 pb-3`}><span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Tarih</span> <span className="font-medium">{bookingData.date}</span></p>
                        <p className="flex justify-between items-center"><span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Saat</span> <span className="font-medium">{bookingData.time}</span></p>
                    </div>
                    <Button onClick={isDashboard ? onBookingComplete : handleReset} variant="primary" className="px-10 py-4 shadow-xl text-xs uppercase tracking-[0.2em]">
                        {isDashboard ? 'Randevularımı Görüntüle' : 'Başka Bir Randevu Al'}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={isDashboard ? "p-8 md:p-12 text-dark" : "max-w-4xl mx-auto px-4 py-32 animate-fade-in-up"}>
            <div className="mb-16">
                <h1 className="text-4xl md:text-6xl font-serif text-center mb-6 text-dark">Randevu Al</h1>
                <div className="w-16 h-[2px] bg-primary-500 mx-auto mb-12"></div>

                {/* Progress Indicators */}
                <div className="flex justify-center items-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                            <div className={`flex items-center justify-center w-12 h-12 rounded-full font-serif text-lg font-medium transition-all duration-500 border-2 ${step >= i ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20' : 'bg-transparent text-gray-400 border-gray-200'
                                }`}>
                                {i}
                            </div>
                            {i < 3 && (
                                <div className="w-16 sm:w-24 px-2">
                                    <div className={`h-[2px] w-full rounded-full transition-all duration-500 ${step > i ? 'bg-primary-500' : 'bg-gray-200'
                                        }`}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={`${isDashboard ? 'bg-transparent' : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100'} min-h-[450px] relative overflow-hidden ${isDashboard ? '' : 'rounded-none sm:rounded-3xl p-8 md:p-14'}`}>
                {/* Step 1: Services */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-serif mb-10 text-center text-dark">Bir Hizmet Seçin</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {services.map(srv => (
                                <button
                                    key={srv.id}
                                    onClick={() => updateBookingData({ service: srv })}
                                    className={`text-left p-6 rounded-2xl border transition-all duration-300 group ${bookingData.service?.id === srv.id
                                        ? `border-primary-500 shadow-md ring-1 ring-primary-500 bg-primary-50/50`
                                        : `border-gray-200 hover:border-primary-300 hover:shadow-md bg-white`
                                        }`}
                                >
                                    <div className={`font-serif text-xl mb-2 transition-colors ${bookingData.service?.id === srv.id ? 'text-primary-700' : 'text-dark group-hover:text-primary-600'}`}>{srv.name}</div>
                                    <div className={`flex items-center justify-between mt-4 border-t pt-4 border-gray-100`}>
                                        <span className={`font-medium text-lg text-primary-600`}>{srv.price}</span>
                                        <span className={`text-[10px] tracking-widest font-bold uppercase ${bookingData.service?.id === srv.id ? 'text-primary-500' : 'text-gray-400'}`}>{srv.duration}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Staff */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-serif mb-10 text-center text-dark">Bir Uzman Seçin</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {staffMembers.map(staff => (
                                <button
                                    key={staff.id}
                                    onClick={() => updateBookingData({ staff })}
                                    className={`text-center p-8 rounded-2xl border transition-all duration-300 group ${bookingData.staff?.id === staff.id
                                        ? `border-primary-500 shadow-md ring-1 ring-primary-500 bg-primary-50/50`
                                        : `border-gray-200 hover:border-primary-300 hover:shadow-md bg-white`
                                        }`}
                                >
                                    <div className={`w-24 h-24 rounded-full mx-auto mb-6 border-2 transition-colors duration-300 ${bookingData.staff?.id === staff.id ? 'border-primary-500' : 'border-transparent group-hover:border-primary-200 bg-gray-100'}`}>
                                        <img src={`https://ui-avatars.com/api/?name=${staff.name}&background=random&color=fff&size=96`} alt={staff.name} className="w-full h-full rounded-full object-cover" />
                                    </div>
                                    <div className={`font-serif text-xl mb-1 transition-colors ${bookingData.staff?.id === staff.id ? 'text-primary-700' : 'text-dark'}`}>{staff.name}</div>
                                    <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-primary-500">{staff.role}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Date, Time & Notes */}
                {step === 3 && (
                    <div className="animate-fade-in">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-serif mb-6 text-dark">Lütfen Tarih Seçin</h2>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-400">Tarih</label>
                                    <input
                                        type="date"
                                        className="w-full px-5 py-4 rounded-xl border focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all font-light bg-gray-50 border-gray-200 text-dark focus:bg-white"
                                        onChange={(e) => updateBookingData({ date: e.target.value })}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-400">Randevu Notları <span className="lowercase tracking-normal font-light">(İsteğe Bağlı)</span></label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-5 py-4 rounded-xl border focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none font-light bg-gray-50 border-gray-200 text-dark focus:bg-white"
                                        placeholder="Bilmemiz gereken herhangi bir özel istek, alerji veya detay var mı?"
                                        onChange={(e) => updateBookingData({ notes: e.target.value })}
                                        value={bookingData.notes || ''}
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif mb-6 text-dark">Uygun Saatler</h2>
                                <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-400">Saat Seçin</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {generateTimeSlots().map(time => (
                                        <button
                                            key={time}
                                            onClick={() => updateBookingData({ time })}
                                            className={`py-4 px-3 rounded-xl text-sm font-medium tracking-wider transition-all duration-300 border ${bookingData.time === time
                                                ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/20'
                                                : 'bg-white text-dark border-gray-200 hover:border-primary-500 hover:text-primary-600'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-12 flex justify-between border-t border-gray-100 pt-6">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={step === 1}
                        className={step === 1 ? "invisible" : ""}
                    >
                        Geri
                    </Button>

                    {step < 3 ? (
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !bookingData.service) ||
                                (step === 2 && !bookingData.staff)
                            }
                        >
                            Devam Et
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleConfirm}
                            disabled={!bookingData.date || !bookingData.time}
                        >
                            Randevuyu Onayla
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
