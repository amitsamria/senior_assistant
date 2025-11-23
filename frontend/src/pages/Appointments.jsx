import { useState, useEffect } from 'react';
import api from '../api';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppt, setNewAppt] = useState({ title: '', doctor: '', date: '', time: '', location: '' });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get('/appointments');
            setAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addAppointment = async (e) => {
        e.preventDefault();
        try {
            await api.post('/appointments', { ...newAppt, id: 0 });
            setNewAppt({ title: '', doctor: '', date: '', time: '', location: '' });
            fetchAppointments();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="page-title">My Appointments</h1>

            <div className="space-y-6">
                {appointments.map((appt) => (
                    <div key={appt.id} className="card hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-3xl font-bold text-primary mb-2">{appt.title}</h3>
                                <p className="text-2xl font-semibold text-textMain">{appt.doctor}</p>
                                <p className="text-xl text-secondary mt-1">📍 {appt.location}</p>
                            </div>
                            <div className="text-left md:text-right bg-blue-50 p-4 rounded-xl min-w-[150px]">
                                <p className="text-3xl font-bold text-primaryDark">{appt.time}</p>
                                <p className="text-xl text-secondary">{appt.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mt-12 bg-green-50 border-green-100">
                <h2 className="text-3xl font-bold mb-6 text-green-800">Add Appointment</h2>
                <form onSubmit={addAppointment} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Title (e.g., Checkup)" value={newAppt.title} onChange={e => setNewAppt({ ...newAppt, title: e.target.value })} className="input-field" required />
                        <input type="text" placeholder="Doctor" value={newAppt.doctor} onChange={e => setNewAppt({ ...newAppt, doctor: e.target.value })} className="input-field" required />
                        <input type="date" value={newAppt.date} onChange={e => setNewAppt({ ...newAppt, date: e.target.value })} className="input-field" required />
                        <input type="time" value={newAppt.time} onChange={e => setNewAppt({ ...newAppt, time: e.target.value })} className="input-field" required />
                        <input type="text" placeholder="Location" value={newAppt.location} onChange={e => setNewAppt({ ...newAppt, location: e.target.value })} className="input-field md:col-span-2" required />
                    </div>
                    <button type="submit" className="w-full bg-success text-white py-4 rounded-xl text-2xl font-bold hover:bg-green-700 shadow-md transition-colors">Add Appointment</button>
                </form>
            </div>
        </div>
    );
};

export default Appointments;
