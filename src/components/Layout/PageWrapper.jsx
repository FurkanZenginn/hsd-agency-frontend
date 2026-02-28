import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const PageWrapper = () => {
    return (
        <div className="min-h-screen flex flex-col bg-light font-sans text-dark selection:bg-primary-200 selection:text-primary-900">
            <Navbar />
            <main className="flex-grow pt-[136px]"> {/* Add padding top equivalent to tall navbar height */}
                <div className="animate-fade-in">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};
