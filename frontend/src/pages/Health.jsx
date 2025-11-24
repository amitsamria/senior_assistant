import { useState, useEffect } from 'react';
import api from '../services/api';
import EditModal from '../components/EditModal';

const Health = () => {
    const [info, setInfo] = useState(null);
    const [editingInfo, setEditingInfo] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const res = await api.get('/health');
                setInfo(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchHealth();
    }, []);

    const openEditModal = () => {
        if (info) {
            setEditingInfo({
                ...info,
                allergies: info.allergies ? info.allergies.join(', ') : '',
                conditions: info.conditions ? info.conditions.join(', ') : ''
            });
        }
        setIsEditModalOpen(true);
    };

    const updateHealth = async (e) => {
        e.preventDefault();
        try {
            const updatedInfo = {
                ...editingInfo,
                allergies: editingInfo.allergies.split(',').map(s => s.trim()).filter(s => s),
                conditions: editingInfo.conditions.split(',').map(s => s.trim()).filter(s => s)
            };
            const res = await api.put('/health', updatedInfo);
            setInfo(res.data);
            setIsEditModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    if (!info) return <div className="text-center text-3xl mt-20 text-secondary">Loading health info...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="page-title">Health Information</h1>
                <button onClick={openEditModal} className="bg-primary text-white px-6 py-3 rounded-xl text-xl font-bold hover:bg-primaryDark shadow-md transition-colors">
                    Edit Info
                </button>
            </div>

            <div className="grid gap-4 md:gap-8">
                <div className="card border-l-4 md:border-l-8 border-red-500">
                    <h2 className="text-xl md:text-2xl text-secondary mb-2 font-medium">Blood Type</h2>
                    <p className="text-4xl md:text-5xl font-bold text-textMain">{info.blood_type}</p>
                </div>

                <div className="card border-l-4 md:border-l-8 border-accent">
                    <h2 className="text-xl md:text-2xl text-secondary mb-4 font-medium">Allergies</h2>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {info.allergies.map((allergy, i) => (
                            <span key={i} className="bg-yellow-100 text-yellow-900 px-4 md:px-6 py-2 md:py-3 rounded-full text-xl md:text-2xl font-semibold">
                                ⚠️ {allergy}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="card border-l-4 md:border-l-8 border-primary">
                    <h2 className="text-xl md:text-2xl text-secondary mb-4 font-medium">Medical Conditions</h2>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {info.conditions.map((cond, i) => (
                            <span key={i} className="bg-teal-100 text-teal-900 px-4 md:px-6 py-2 md:py-3 rounded-full text-xl md:text-2xl font-semibold">
                                🏥 {cond}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="card border-l-4 md:border-l-8 border-success">
                    <h2 className="text-xl md:text-2xl text-secondary mb-4 font-medium">Insurance Details</h2>
                    <div className="space-y-1 md:space-y-2">
                        <p className="text-2xl md:text-3xl font-bold text-textMain">{info.insurance_provider}</p>
                        <p className="text-xl md:text-2xl text-secondary">Policy #: <span className="font-mono font-bold">{info.policy_number}</span></p>
                    </div>
                </div>
            </div>

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Health Info"
                onSubmit={updateHealth}
            >
                {editingInfo && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Blood Type</label>
                            <input type="text" value={editingInfo.blood_type} onChange={e => setEditingInfo({ ...editingInfo, blood_type: e.target.value })} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Allergies (comma separated)</label>
                            <input type="text" value={editingInfo.allergies} onChange={e => setEditingInfo({ ...editingInfo, allergies: e.target.value })} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Medical Conditions (comma separated)</label>
                            <input type="text" value={editingInfo.conditions} onChange={e => setEditingInfo({ ...editingInfo, conditions: e.target.value })} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Insurance Provider</label>
                            <input type="text" value={editingInfo.insurance_provider} onChange={e => setEditingInfo({ ...editingInfo, insurance_provider: e.target.value })} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Policy Number</label>
                            <input type="text" value={editingInfo.policy_number} onChange={e => setEditingInfo({ ...editingInfo, policy_number: e.target.value })} className="input-field" required />
                        </div>
                    </div>
                )}
            </EditModal>
        </div>
    );
};

export default Health;
