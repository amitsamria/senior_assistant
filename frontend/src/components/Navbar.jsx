import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', label: 'Home' },
        { path: '/clock', label: 'Day Hub' },
        { path: '/medicines', label: 'Medicines' },
        { path: '/appointments', label: 'Appointments' },
        { path: '/contacts', label: 'Contacts' },
        { path: '/groceries', label: 'Groceries' },
        { path: '/health', label: 'Health' },
    ];

    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <nav className="bg-primary/95 backdrop-blur-md text-white shadow-glass sticky top-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-5">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="text-3xl font-serif font-bold tracking-wide flex items-center gap-2">
                            <span className="text-4xl">🌿</span> Senior Assistant
                        </div>
                        {/* Hamburger Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div
                        className={`${isOpen ? 'flex' : 'hidden'
                            } md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 gap-6 md:gap-12 transition-all duration-300 ease-in-out`}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`px-5 py-2.5 rounded-xl text-lg font-medium text-center transition-all duration-300 ${isActive(item.path)
                                    ? 'bg-white text-primary shadow-lg transform scale-105'
                                    : 'hover:bg-white/10 text-white/90 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={handleSignOut}
                            className="px-5 py-2.5 rounded-xl text-lg font-medium text-center transition-all duration-300 bg-danger/20 hover:bg-danger/30 text-danger border border-danger/30"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
