import { useState, useEffect } from 'react';
import api from '../api';

const Medicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMed, setNewMed] = useState({ name: '', dosage: '', time: '' });

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

    if (loading) return <div className="text-center text-3xl mt-20 text-secondary">Loading your medicines...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="page-title">My Medicines</h1>

            <div className="space-y-6">
                {medicines.map((med) => (
                    <div
                        key={med.id}
                        className={`card flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${med.taken ? 'bg-green-50 border-green-200' : 'bg-white'
                            }`}
                    >
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-3xl font-bold text-textMain mb-2">{med.name}</h3>
                            <p className="text-2xl text-secondary">
                                <span className="font-semibold">{med.dosage}</span> at <span className="text-primary font-bold">{med.time}</span>
                            </p>
                        </div>
                        <button
                            onClick={() => toggleTaken(med.id)}
                            className={`w-full md:w-auto px-10 py-5 rounded-2xl text-2xl font-bold shadow-lg transition-all transform active:scale-95 ${med.taken
                                    ? 'bg-success text-white hover:bg-green-700'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {med.taken ? '✓ TAKEN' : 'TAKE NOW'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="card mt-12 bg-blue-50 border-blue-100">
                <h2 className="text-3xl font-bold mb-6 text-primaryDark">Add New Medicine</h2>
                <form onSubmit={addMedicine} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        className="w-full bg-primary text-white py-4 rounded-xl text-2xl font-bold hover:bg-primaryDark shadow-md transition-colors"
                    >
                        Add Medicine
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Medicines;
