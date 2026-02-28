export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl focus:ring-primary-500",
        secondary: "bg-dark text-white hover:bg-gray-800 shadow-md hover:shadow-lg focus:ring-dark",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
        ghost: "text-dark hover:text-primary-600 hover:bg-gray-50 focus:ring-gray-200"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
