import { useState, useEffect } from 'react';
import api from '../services/api';
import EditModal from '../components/EditModal';

const Medicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMed, setNewMed] = useState({ name: '', dosage: '', time: '' });

    const [editingMed, setEditingMed] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await api.get('/medicines');
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTaken = async (id) => {
        try {
            await api.put(`/medicines/${id}/toggle`);
            fetchMedicines();
        } catch (error) {
            console.error('Error toggling medicine:', error);
        }
    };

    const addMedicine = async (e) => {
        e.preventDefault();
        try {
            await api.post('/medicines', { ...newMed, id: 0 });
            setNewMed({ name: '', dosage: '', time: '' });
            fetchMedicines();
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    };

    const deleteMedicine = async (id) => {
        if (window.confirm('Are you sure you want to delete this medicine?')) {
            try {
                await api.delete(`/medicines/${id}`);
                fetchMedicines();
            } catch (error) {
                console.error('Error deleting medicine:', error);
            }
        }
    };

    const openEditModal = (med) => {
        setEditingMed(med);
        setIsEditModalOpen(true);
    };

    const updateMedicine = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/medicines/${editingMed.id}`, editingMed);
            setIsEditModalOpen(false);
            fetchMedicines();
        } catch (error) {
            console.error('Error updating medicine:', error);
        }
    };

    if (loading) return <div className="text-center text-3xl mt-20 text-secondary">Loading your medicines...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="page-title">My Medicines</h1>

            <div className="space-y-6">
                {medicines.map((med) => (
                    <div
                        key={med.id}
                        className={`card flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 transition-colors ${med.taken ? 'bg-green-50 border-green-200' : 'bg-white'
                            }`}
                    >
                        <div className="flex-grow text-center md:text-left w-full md:w-auto">
                            <h3 className="text-2xl md:text-3xl font-bold text-textMain mb-2">{med.name}</h3>
                            <p className="text-xl md:text-2xl text-secondary">
                                <span className="font-semibold">{med.dosage}</span> at <span className="text-primary font-bold">{med.time}</span>
                            </p>
                            <div className="flex justify-center md:justify-start gap-4 mt-4">
                                <button onClick={() => openEditModal(med)} className="text-blue-600 hover:text-blue-800 font-semibold text-lg">Edit</button>
                                <button onClick={() => deleteMedicine(med.id)} className="text-red-500 hover:text-red-700 font-semibold text-lg">Delete</button>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleTaken(med.id)}
                            className={`w-full md:w-auto px-6 md:px-10 py-3 md:py-5 rounded-2xl text-xl md:text-2xl font-bold shadow-lg transition-all transform active:scale-95 ${med.taken
                                ? 'bg-success text-white hover:bg-green-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {med.taken ? '✓ TAKEN' : 'TAKE NOW'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="card mt-8 md:mt-12 bg-blue-50 border-blue-100">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primaryDark">Add New Medicine</h2>
                <form onSubmit={addMedicine} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <input
                            type="text"
                            placeholder="Medicine Name"
                            value={newMed.name}
                            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Dosage (e.g., 1 pill)"
                            value={newMed.dosage}
                            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="time"
                            value={newMed.time}
                            onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                            className="input-field"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 md:py-4 rounded-xl text-xl md:text-2xl font-bold hover:bg-primaryDark shadow-md transition-colors"
                    >
                        Add Medicine
                    </button>
                </form>
            </div>

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Medicine"
                onSubmit={updateMedicine}
            >
                {editingMed && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Medicine Name</label>
                            <input
                                type="text"
                                value={editingMed.name}
                                onChange={(e) => setEditingMed({ ...editingMed, name: e.target.value })}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Dosage</label>
                            <input
                                type="text"
                                value={editingMed.dosage}
                                onChange={(e) => setEditingMed({ ...editingMed, dosage: e.target.value })}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Time</label>
                            <input
                                type="time"
                                value={editingMed.time}
                                onChange={(e) => setEditingMed({ ...editingMed, time: e.target.value })}
                                className="input-field"
                                required
                            />
                        </div>
                    </div>
                )}
            </EditModal>
        </div>
    );
};

export default Medicines;
