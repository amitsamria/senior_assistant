import { useState, useEffect } from 'react';
import api from '../services/api';
import EditModal from '../components/EditModal';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppt, setNewAppt] = useState({ title: '', doctor: '', date: '', time: '', location: '' });
    const [editingAppt, setEditingAppt] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const deleteAppointment = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await api.delete(`/appointments/${id}`);
                fetchAppointments();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const openEditModal = (appt) => {
        setEditingAppt(appt);
        setIsEditModalOpen(true);
    };

    const updateAppointment = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/appointments/${editingAppt.id}`, editingAppt);
            setIsEditModalOpen(false);
            fetchAppointments();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="page-title">My Appointments</h1>

            <div className="space-y-4 md:space-y-6">
                {appointments.map((appt) => (
                    <div key={appt.id} className="card hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="w-full md:w-auto">
                                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">{appt.title}</h3>
                                <p className="text-xl md:text-2xl font-semibold text-textMain">{appt.doctor}</p>
                                <p className="text-lg md:text-xl text-secondary mt-1">📍 {appt.location}</p>
                                <div className="flex justify-start gap-4 mt-4">
                                    <button onClick={() => openEditModal(appt)} className="text-blue-600 hover:text-blue-800 font-semibold text-lg">Edit</button>
                                    <button onClick={() => deleteAppointment(appt.id)} className="text-red-500 hover:text-red-700 font-semibold text-lg">Delete</button>
                                </div>
                            </div>
                            <div className="w-full md:w-auto text-left md:text-right bg-blue-50 p-4 rounded-xl min-w-[150px]">
                                <p className="text-2xl md:text-3xl font-bold text-primaryDark">{appt.time}</p>
                                <p className="text-lg md:text-xl text-secondary">{appt.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mt-8 md:mt-12 bg-green-50 border-green-100">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-green-800">Add Appointment</h2>
                <form onSubmit={addAppointment} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <input type="text" placeholder="Title (e.g., Checkup)" value={newAppt.title} onChange={e => setNewAppt({ ...newAppt, title: e.target.value })} className="input-field" required />
                        <input type="text" placeholder="Doctor" value={newAppt.doctor} onChange={e => setNewAppt({ ...newAppt, doctor: e.target.value })} className="input-field" required />
                        <input type="date" value={newAppt.date} onChange={e => setNewAppt({ ...newAppt, date: e.target.value })} className="input-field" required />
                        <input type="time" value={newAppt.time} onChange={e => setNewAppt({ ...newAppt, time: e.target.value })} className="input-field" required />
                        <input type="text" placeholder="Location" value={newAppt.location} onChange={e => setNewAppt({ ...newAppt, location: e.target.value })} className="input-field md:col-span-2" required />
                    </div>
                    <button type="submit" className="w-full bg-success text-white py-3 md:py-4 rounded-xl text-xl md:text-2xl font-bold hover:bg-green-700 shadow-md transition-colors">Add Appointment</button>
                </form>
            </div>

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Appointment"
                onSubmit={updateAppointment}
            >
                {editingAppt && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Title</label>
                            <input type="text" value={editingAppt.title} onChange={e => setEditingAppt({ ...editingAppt, title: e.target.value })} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Doctor</label>
                            <input type="text" value={editingAppt.doctor} onChange={e => setEditingAppt({ ...editingAppt, doctor: e.target.value })} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Date</label>
                            <input type="date" value={editingAppt.date} onChange={e => setEditingAppt({ ...editingAppt, date: e.target.value })} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Time</label>
                            <input type="time" value={editingAppt.time} onChange={e => setEditingAppt({ ...editingAppt, time: e.target.value })} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Location</label>
                            <input type="text" value={editingAppt.location} onChange={e => setEditingAppt({ ...editingAppt, location: e.target.value })} className="input-field" required />
                        </div>
                    </div>
                )}
            </EditModal>
        </div>
    );
};

export default Appointments;
