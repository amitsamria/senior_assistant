import { useState, useEffect } from 'react';
import api from '../api';

const Health = () => {
    const [info, setInfo] = useState(null);

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

    if (!info) return <div className="text-center text-3xl mt-20 text-secondary">Loading health info...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="page-title">Health Information</h1>

            <div className="grid gap-8">
                <div className="card border-l-8 border-red-500">
                    <h2 className="text-2xl text-secondary mb-2 font-medium">Blood Type</h2>
                    <p className="text-5xl font-bold text-textMain">{info.blood_type}</p>
                </div>

                <div className="card border-l-8 border-accent">
                    <h2 className="text-2xl text-secondary mb-4 font-medium">Allergies</h2>
                    <div className="flex flex-wrap gap-3">
                        {info.allergies.map((allergy, i) => (
                            <span key={i} className="bg-yellow-100 text-yellow-900 px-6 py-3 rounded-full text-2xl font-semibold">
                                ⚠️ {allergy}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="card border-l-8 border-primary">
                    <h2 className="text-2xl text-secondary mb-4 font-medium">Medical Conditions</h2>
                    <div className="flex flex-wrap gap-3">
                        {info.conditions.map((cond, i) => (
                            <span key={i} className="bg-teal-100 text-teal-900 px-6 py-3 rounded-full text-2xl font-semibold">
                                🏥 {cond}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="card border-l-8 border-success">
                    <h2 className="text-2xl text-secondary mb-4 font-medium">Insurance Details</h2>
                    <div className="space-y-2">
                        <p className="text-3xl font-bold text-textMain">{info.insurance_provider}</p>
                        <p className="text-2xl text-secondary">Policy #: <span className="font-mono font-bold">{info.policy_number}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Health;
