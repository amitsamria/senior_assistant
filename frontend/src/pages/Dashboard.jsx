import { Link } from 'react-router-dom';

const Dashboard = () => {
    const actions = [
        { to: '/clock', label: 'Day Hub', sub: 'Clock & Reminders', color: 'bg-teal-100 text-teal-800 border-teal-200' },
        { to: '/medicines', label: 'Medicines', sub: 'Check your pills', color: 'bg-blue-100 text-blue-800 border-blue-200' },
        { to: '/appointments', label: 'Appointments', sub: 'Doctor visits', color: 'bg-green-100 text-green-800 border-green-200' },
        { to: '/contacts', label: 'Contacts', sub: 'Call family', color: 'bg-purple-100 text-purple-800 border-purple-200' },
        { to: '/groceries', label: 'Groceries', sub: 'Shopping list', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        { to: '/health', label: 'Health Info', sub: 'Medical details', color: 'bg-red-100 text-red-800 border-red-200' },
    ];

    return (
        <div className="space-y-10">
            <header className="text-center py-8">
                <h1 className="text-5xl font-bold text-primary mb-4">Good Morning!</h1>
                <p className="text-2xl text-secondary">What would you like to do today?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {actions.map((action) => (
                    <Link
                        key={action.to}
                        to={action.to}
                        className={`card group hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 ${action.color} flex flex-col items-center justify-center text-center h-64`}
                    >
                        <span className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">{action.label}</span>
                        <span className="text-xl opacity-80">{action.sub}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
