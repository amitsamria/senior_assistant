import { useState, useEffect } from 'react';
import api from '../services/api';
import MemoryGame from '../components/MemoryGame';
import EditModal from '../components/EditModal';

const Progress = () => {
    const [scores, setScores] = useState([]);
    const [adherence, setAdherence] = useState(0);
    const [loading, setLoading] = useState(true);
    const [editingScore, setEditingScore] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [scoresRes, adherenceRes] = await Promise.all([
                api.get('/scores'),
                api.get('/adherence')
            ]);
            setScores(scoresRes.data);
            setAdherence(adherenceRes.data.medicine_adherence);
        } catch (error) {
            console.error('Error fetching progress data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteScore = async (id) => {
        if (window.confirm('Are you sure you want to delete this score?')) {
            try {
                await api.delete(`/scores/${id}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting score:', error);
            }
        }
    };

    const openEditModal = (score) => {
        setEditingScore(score);
        setIsEditModalOpen(true);
    };

    const updateScore = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/scores/${editingScore.id}`, editingScore);
            setIsEditModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error updating score:', error);
        }
    };

    if (loading) return <div className="text-center text-3xl mt-20 text-secondary">Loading progress...</div>;

    const latestScore = scores.length > 0 ? scores[scores.length - 1].score : 0;
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length) : 0;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="page-title">My Progress & Health</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cognitive Health Section */}
                <div className="space-y-8">
                    <div className="card bg-purple-50 border-purple-100">
                        <h2 className="text-2xl font-bold text-purple-800 mb-4">Cognitive Health</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                <p className="text-secondary mb-1">Latest Score</p>
                                <p className="text-4xl font-bold text-purple-600">{latestScore}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                <p className="text-secondary mb-1">Average Score</p>
                                <p className="text-4xl font-bold text-purple-600">{averageScore}</p>
                            </div>
                        </div>
                        <MemoryGame onGameComplete={fetchData} />
                    </div>

                    <div className="card">
                        <h3 className="text-xl font-bold text-textMain mb-4">Score History</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {scores.slice().reverse().map((score) => (
                                <div key={score.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <span className="text-secondary block">{score.date}</span>
                                        <span className="font-bold text-primary">{score.score} pts</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditModal(score)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Edit</button>
                                        <button onClick={() => deleteScore(score.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">Delete</button>
                                    </div>
                                </div>
                            ))}
                            {scores.length === 0 && <p className="text-center text-gray-500">No games played yet.</p>}
                        </div>
                    </div>
                </div>

                {/* Adherence Section */}
                <div className="space-y-8">
                    <div className="card bg-blue-50 border-blue-100">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Medication Adherence</h2>
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="currentColor"
                                        strokeWidth="16"
                                        fill="transparent"
                                        className="text-blue-200"
                                    />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="currentColor"
                                        strokeWidth="16"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 88}
                                        strokeDashoffset={2 * Math.PI * 88 * (1 - adherence / 100)}
                                        className="text-blue-600 transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute text-4xl font-bold text-blue-800">{adherence}%</div>
                            </div>
                            <p className="mt-4 text-xl text-center text-blue-700 font-medium">
                                {adherence >= 80 ? "Excellent! Keep it up! 🌟" : adherence >= 50 ? "Good, but try to be more consistent. 👍" : "Let's try to improve this. Set an alarm! ⏰"}
                            </p>
                        </div>
                    </div>

                    <div className="card bg-orange-50 border-orange-100">
                        <h2 className="text-2xl font-bold text-orange-800 mb-4">Recommendations</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🧠</span>
                                <div>
                                    <p className="font-bold text-textMain">Daily Brain Training</p>
                                    <p className="text-secondary">Play the memory game once a day to keep your mind sharp.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">💧</span>
                                <div>
                                    <p className="font-bold text-textMain">Stay Hydrated</p>
                                    <p className="text-secondary">Drinking water helps with cognitive function and energy.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🚶</span>
                                <div>
                                    <p className="font-bold text-textMain">Light Exercise</p>
                                    <p className="text-secondary">A 15-minute walk can improve mood and memory.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Score"
                onSubmit={updateScore}
            >
                {editingScore && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                value={editingScore.date}
                                onChange={(e) => setEditingScore({ ...editingScore, date: e.target.value })}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Score</label>
                            <input
                                type="number"
                                value={editingScore.score}
                                onChange={(e) => setEditingScore({ ...editingScore, score: parseInt(e.target.value) })}
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

export default Progress;
