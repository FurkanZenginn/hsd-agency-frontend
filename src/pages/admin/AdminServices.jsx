import React from 'react';

const AdminServices = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Service Catalog</h1>
                <button className="btn-primary">Add Service</button>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-stone-100 text-center text-[var(--color-foreground-muted)]">
                Service List Placeholder
            </div>
        </div>
    );
};

export default AdminServices;
