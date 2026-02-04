import React from 'react';

const CategoryFilter = ({ categories = [], activeCategory, onSelect }) => {
    return (
        <div className="w-full overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex gap-3 min-w-max px-1">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelect(category)}
                        className={`
              px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border
              ${activeCategory === category
                                ? 'bg-stone-800 text-white border-stone-800 shadow-lg'
                                : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-800 hover:border-stone-300'
                            }
            `}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
