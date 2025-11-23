import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/clock', label: 'Day Hub' },
        { path: '/medicines', label: 'Medicines' },
        { path: '/appointments', label: 'Appointments' },
        { path: '/contacts', label: 'Contacts' },
        { path: '/groceries', label: 'Groceries' },
        { path: '/health', label: 'Health' },
    ];

    return (
        <nav className="bg-primary text-white shadow-soft sticky top-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between py-6">
                    <div className="text-3xl font-bold mb-4 md:mb-0 tracking-wide">
                        Senior Assistant
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-6 py-3 rounded-xl text-xl font-medium transition-all transform hover:scale-105 ${isActive(item.path)
                                        ? 'bg-white text-primary shadow-md'
                                        : 'hover:bg-primaryDark text-white/90'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
