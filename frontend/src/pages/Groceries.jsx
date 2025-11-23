import { useState, useEffect } from 'react';
import api from '../api';

const Groceries = () => {
    const [groceries, setGroceries] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        fetchGroceries();
    }, []);

    const fetchGroceries = async () => {
        try {
            const res = await api.get('/groceries');
            setGroceries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleItem = async (id) => {
        try {
            await api.put(`/groceries/${id}/toggle`);
            fetchGroceries();
        } catch (err) {
            console.error(err);
        }
    };

    const addItem = async (e) => {
        e.preventDefault();
        try {
            await api.post('/groceries', { name: newItem, id: 0, checked: false });
            setNewItem('');
            fetchGroceries();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="page-title">Grocery List</h1>

            <div className="space-y-4">
                {groceries.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`card cursor-pointer flex items-center space-x-6 transition-all transform active:scale-99 ${item.checked ? 'bg-gray-100 opacity-75' : 'bg-white hover:shadow-md'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors ${item.checked ? 'bg-success border-success' : 'border-gray-300'
                            }`}>
                            {item.checked && <span className="text-white text-2xl font-bold">✓</span>}
                        </div>
                        <span className={`text-3xl font-medium ${item.checked ? 'line-through text-gray-500' : 'text-textMain'}`}>
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>

            <div className="card mt-12 bg-orange-50 border-orange-100">
                <h2 className="text-3xl font-bold mb-6 text-orange-800">Add Item</h2>
                <form onSubmit={addItem} className="flex flex-col md:flex-row gap-6">
                    <input
                        type="text"
                        placeholder="Item Name (e.g., Milk)"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="input-field flex-grow"
                        required
                    />
                    <button type="submit" className="bg-accent text-white px-10 py-4 rounded-xl text-2xl font-bold hover:bg-orange-600 shadow-md transition-colors">
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Groceries;
