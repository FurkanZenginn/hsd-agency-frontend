import { useContext, useState } from 'react';
import { AppointmentContext } from '../../context/AppointmentContext';
import { Calendar, Clock, User as UserIcon, Scissors, X, Edit2 } from 'lucide-react';
import { Button } from '../../components/Common/Button';

export const AppointmentsList = () => {
    const { appointments, cancelAppointment, updateAppointment } = useContext(AppointmentContext);

    // Modal states
    const [cancelModal, setCancelModal] = useState({ isOpen: false, id: null });
    const [editModal, setEditModal] = useState({ isOpen: false, appointment: null });

    const openCancelModal = (id) => setCancelModal({ isOpen: true, id });
    const closeCancelModal = () => setCancelModal({ isOpen: false, id: null });

    const confirmCancel = () => {
        if (cancelModal.id) {
            cancelAppointment(cancelModal.id);
            closeCancelModal();
        }
    };

    const openEditModal = (appt) => setEditModal({ isOpen: true, appointment: appt });
    const closeEditModal = () => setEditModal({ isOpen: false, appointment: null });

    const handleEditSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updates = {
            date: formData.get('date'),
            time: formData.get('time'),
            notes: formData.get('notes'),
        };
        updateAppointment(editModal.appointment.id, updates);
        closeEditModal();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Completed': return 'bg-gray-50 text-gray-600 border-gray-100';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-blue-50 text-blue-600 border-blue-100';
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif text-dark mb-8">Randevularım</h2>

            {appointments.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 rounded-[2rem] p-12 text-center">
                    <Calendar className="mx-auto h-16 w-16 text-gray-300 mb-6" strokeWidth={1} />
                    <h3 className="text-xl font-serif text-dark mb-2">Randevu bulunamadı</h3>
                    <p className="text-gray-500 font-light">Yaklaşan randevunuz bulunmamaktadır.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {appointments.map((appt) => (
                        <div key={appt.id} className="bg-white/80 backdrop-blur-md shadow-sm border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-gray-200 hover:bg-white">

                            {/* Accent line */}
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(appt.status)}`}>
                                                {{ 'Confirmed': 'Onaylandı', 'Completed': 'Tamamlandı', 'Cancelled': 'İptal Edildi', 'Pending': 'Beklemede' }[appt.status] || appt.status}
                                            </span>
                                            <span className="text-xs font-medium text-gray-400 tracking-wider">ID: #{appt.id}</span>
                                        </div>
                                        <h3 className="text-2xl font-serif text-dark">{appt.service?.name}</h3>
                                    </div>
                                    <div className="text-xl font-medium text-primary-500">{appt.service?.price}</div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100"><Calendar size={18} className="text-primary-500" strokeWidth={1.5} /></div>
                                        <span className="font-light">{appt.date}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100"><Clock size={18} className="text-primary-500" strokeWidth={1.5} /></div>
                                        <span className="font-light">{appt.time} <span className="text-gray-400 text-sm ml-1">({appt.service?.duration})</span></span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100"><UserIcon size={18} className="text-primary-500" strokeWidth={1.5} /></div>
                                        <span className="font-light">{appt.staff?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100"><Scissors size={18} className="text-primary-500" strokeWidth={1.5} /></div>
                                        <span className="font-light">{appt.staff?.role}</span>
                                    </div>
                                </div>

                                {appt.notes && (
                                    <div className="pt-5 mt-5 border-t border-gray-100">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">NOTLAR</p>
                                        <p className="text-gray-600 italic font-light">"{appt.notes}"</p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                                <div className="flex flex-row md:flex-col gap-3 justify-end items-end md:border-l md:border-gray-100 md:pl-8">
                                    <button
                                        onClick={() => openEditModal(appt)}
                                        className="w-full md:w-auto px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200"
                                    >
                                        <Edit2 size={14} /> Düzenle
                                    </button>
                                    <button
                                        onClick={() => openCancelModal(appt.id)}
                                        className="w-full md:w-auto px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 border border-red-100"
                                    >
                                        İptal Et
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {cancelModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-md">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full shadow-2xl animate-fade-in-up text-center border overflow-hidden">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                            <X size={36} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-serif text-dark mb-3">Randevuyu İptal Et?</h3>
                        <p className="text-gray-500 mb-10 font-light text-lg">Bu randevuyu iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={closeCancelModal} className="flex-1 py-4 bg-gray-50 text-gray-500 font-bold uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-100 hover:text-dark transition-colors border border-gray-200">Vazgeç</button>
                            <button onClick={confirmCancel} className="flex-1 py-4 bg-red-500 text-white font-bold uppercase text-xs tracking-widest rounded-2xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">Evet, İptal Et</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit/Reschedule Modal */}
            {editModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-md overflow-y-auto">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-lg w-full shadow-2xl animate-fade-in-up relative my-8 border border-gray-100">
                        <button onClick={closeEditModal} className="absolute top-8 right-8 text-gray-400 hover:text-dark transition-colors">
                            <X size={28} strokeWidth={1.5} />
                        </button>
                        <h3 className="text-3xl font-serif text-dark mb-8">Randevuyu Düzenle</h3>

                        <form onSubmit={handleEditSave} className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Yeni Tarih</label>
                                    <input
                                        type="date"
                                        name="date"
                                        defaultValue={editModal.appointment.date}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark focus:bg-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Yeni Saat</label>
                                    <select
                                        name="time"
                                        defaultValue={editModal.appointment.time}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark appearance-none focus:bg-white"
                                        required
                                    >
                                        {['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'].map(t => (
                                            <option key={t} value={t} className="bg-white text-dark">{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Notlar ve Talimatlar</label>
                                <textarea
                                    name="notes"
                                    defaultValue={editModal.appointment.notes}
                                    rows="4"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm font-light text-dark resize-none focus:bg-white"
                                    placeholder="Bilmemiz gereken herhangi bir özel gereksinim, alerji veya referans var mı?"
                                ></textarea>
                            </div>

                            <Button type="submit" variant="primary" className="w-full py-4 text-xs tracking-[0.2em] uppercase shadow-lg shadow-primary-500/20">Değişiklikleri Kaydet</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
