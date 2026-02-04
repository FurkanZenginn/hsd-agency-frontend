import React from 'react';

const CategoryCard = ({ icon: Icon, title, count, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-orange-100 w-full"
        >
            <div className="p-4 rounded-full bg-orange-50 text-[var(--color-primary)] mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-[var(--color-foreground)] text-lg mb-1">{title}</h3>
            <span className="text-sm text-[var(--color-secondary)] font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                {count} Active
            </span>
        </button>
    );
};

export default CategoryCard;
