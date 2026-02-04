import React from 'react';
import { Star, MapPin } from 'lucide-react';

const AgencyCard = ({ name, category, rating, reviewCount, imageUrl, distance, address }) => {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.15)] transition-all duration-300 hover:-translate-y-1">

            {/* Cover Image */}
            <div className="h-48 w-full relative overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[var(--color-foreground)] shadow-sm uppercase tracking-wider">
                    {category}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
                {/* Title */}
                <h3 className="text-xl font-bold text-[var(--color-foreground)] tracking-tight">{name}</h3>

                {/* Details Row 1: Location & Distance */}
                <div className="flex items-center justify-between text-sm text-[var(--color-foreground-muted)]">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                        <MapPin size={16} className="text-stone-400 shrink-0" />
                        <span className="truncate">{address}</span>
                    </div>
                    <span className="text-[var(--color-secondary)] font-medium shrink-0 bg-green-50 px-2 py-0.5 rounded-md border border-green-100 text-xs">
                        {distance}
                    </span>
                </div>

                {/* Details Row 2: Ratings */}
                <div className="flex items-center gap-2">
                    <Star size={18} className="text-orange-400 fill-orange-400" />
                    <span className="text-[var(--color-foreground)] font-bold">{rating}</span>
                    <span className="text-stone-400 text-sm">({reviewCount})</span>
                </div>

                {/* Action Button */}
                <button className="w-full mt-2 py-3 rounded-xl bg-orange-50 text-[var(--color-primary)] font-bold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default AgencyCard;
