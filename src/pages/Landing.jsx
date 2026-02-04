import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, ArrowRight } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[var(--color-background)]">
            {/* Background Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[var(--color-primary)] opacity-5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[var(--color-secondary)] opacity-10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-5xl z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-[var(--color-foreground)]">
                        Welcome to HSD AGENCY
                    </h1>
                    <p className="text-[var(--color-foreground-muted)] text-lg md:text-xl font-light tracking-wide">
                        The ecosystem for modern professionals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    {/* Customer Access */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        onClick={() => navigate('/login/customer')}
                        className="group cursor-pointer h-[420px] glass-card rounded-[2rem] p-10 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="w-24 h-24 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center mb-8 group-hover:bg-orange-50 transition-colors border border-transparent group-hover:border-orange-100">
                            <User size={36} className="text-[var(--color-foreground-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">Customer Portal</h2>
                        <p className="text-[var(--color-foreground-muted)] mb-8 leading-relaxed">
                            Book appointments, explore services, and view your history.
                        </p>
                        <div className="mt-auto relative z-10">
                            <span className="flex items-center gap-2 text-[var(--color-primary)] font-semibold group-hover:gap-3 transition-all">
                                Enter Portal <ArrowRight size={18} />
                            </span>
                        </div>
                    </motion.div>

                    {/* Business Access */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        onClick={() => navigate('/login/business')}
                        className="group cursor-pointer h-[420px] glass-card rounded-[2rem] p-10 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="w-24 h-24 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center mb-8 group-hover:bg-green-50 transition-colors border border-transparent group-hover:border-green-100">
                            <Briefcase size={36} className="text-[var(--color-foreground-muted)] group-hover:text-[var(--color-secondary)] transition-colors" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">Business Admin</h2>
                        <p className="text-[var(--color-foreground-muted)] mb-8 leading-relaxed">
                            Manage your agency dashboard, staff, and analytics.
                        </p>
                        <div className="mt-auto relative z-10">
                            <span className="flex items-center gap-2 text-[var(--color-secondary)] font-semibold group-hover:gap-3 transition-all">
                                Access Dashboard <ArrowRight size={18} />
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
