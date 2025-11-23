import { useState, useEffect } from 'react';
import api from '../api';

const Clock = () => {
    const [time, setTime] = useState(new Date());
    const [reminders, setReminders] = useState([]);
    const [nextReminder, setNextReminder] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        fetchReminders();
        return () => clearInterval(timer);
    }, []);

    const fetchReminders = async () => {
        try {
            const [medsRes, apptsRes] = await Promise.all([
                api.get('/medicines'),
                api.get('/appointments')
            ]);

            const meds = medsRes.data.filter(m => !m.taken).map(m => ({
                type: 'Medicine',
                title: `Take ${m.name}`,
                time: m.time, // HH:MM
                detail: m.dosage
            }));

            const appts = apptsRes.data.map(a => ({
                type: 'Appointment',
                title: a.title,
                time: a.time,
                detail: `with ${a.doctor}`
            }));

            const all = [...meds, ...appts].sort((a, b) => a.time.localeCompare(b.time));
            setReminders(all);

            // Find next reminder based on current time
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const currentTimeStr = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

            const upcoming = all.find(r => r.time > currentTimeStr);
            setNextReminder(upcoming || all[0]); // Loop to first if none later today? Or just show none.
            // For simplicity, showing the very next one in the sorted list that is after now, or the first one tomorrow (simulated by showing first one if none left)

        } catch (err) {
            console.error(err);
        }
    };

    const getTimeOfDay = () => {
        const hour = time.getHours();
        if (hour < 12) return 'Morning';
        if (hour < 17) return 'Afternoon';
        if (hour < 20) return 'Evening';
        return 'Night';
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-12 bg-background">

            {/* Time of Day */}
            <h2 className="text-4xl md:text-5xl font-medium text-secondary">
                Now it's <span className="text-primary font-bold">{getTimeOfDay()}</span>
            </h2>

            {/* Digital Clock */}
            <div className="bg-surface px-16 py-12 rounded-[3rem] shadow-card border-4 border-primary">
                <h1 className="text-8xl md:text-9xl font-bold text-textMain tracking-wider">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </h1>
                <p className="text-3xl md:text-4xl text-secondary mt-4 font-medium">
                    {formatDate(time)}
                </p>
            </div>

            {/* Next Reminder */}
            {nextReminder && (
                <div className="w-full max-w-2xl bg-orange-50 border-l-8 border-accent p-8 rounded-r-2xl shadow-md text-left animate-pulse">
                    <p className="text-2xl text-orange-800 font-bold mb-2">UPCOMING REMINDER</p>
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-4xl font-bold text-textMain">{nextReminder.title}</h3>
                            <p className="text-2xl text-secondary">{nextReminder.detail}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-5xl font-bold text-primary">{nextReminder.time}</span>
                        </div>
                    </div>
                </div>
            )}

            {!nextReminder && (
                <div className="text-2xl text-secondary italic">
                    No upcoming tasks for today. Relax and enjoy your {getTimeOfDay().toLowerCase()}!
                </div>
            )}

        </div>
    );
};

export default Clock;
