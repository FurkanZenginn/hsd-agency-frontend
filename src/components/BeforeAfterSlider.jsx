import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef(null);

    const handleMouseDown = () => setIsResizing(true);
    const handleMouseUp = () => setIsResizing(false);

    const handleMouseMove = (e) => {
        if (!isResizing || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    const handleTouchMove = (e) => {
        if (!isResizing || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-black/5 shadow-lg"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${afterImage})` }}
            />
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur text-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-sm z-10">AFTER</div>

            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    backgroundImage: `url(${beforeImage})`
                }}
            >
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">BEFORE</div>
            </div>

            <div
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Updated Handle: Vibrant Sunset Orange */}
                <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-2 border-white shadow-xl text-white -ml-[18px] transition-transform hover:scale-110">
                    <ChevronsLeftRight size={20} />
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
