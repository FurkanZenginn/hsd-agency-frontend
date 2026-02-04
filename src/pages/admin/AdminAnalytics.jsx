import React from 'react';

const AdminAnalytics = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Analytics & Growth</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-stone-100 h-64 flex items-center justify-center">
                    Revenue Chart Placeholder
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-stone-100 h-64 flex items-center justify-center">
                    User Growth Chart Placeholder
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
