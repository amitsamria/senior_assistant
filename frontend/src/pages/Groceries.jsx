import { useState, useEffect } from 'react';
import api from '../services/api';
import EditModal from '../components/EditModal';

const Groceries = () => {
    const [groceries, setGroceries] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const deleteItem = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/groceries/${id}`);
                fetchGroceries();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const openEditModal = (e, item) => {
        e.stopPropagation();
        setEditingItem(item);
        setIsEditModalOpen(true);
    };

    const updateItem = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/groceries/${editingItem.id}`, editingItem);
            setIsEditModalOpen(false);
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
                        className={`card cursor-pointer flex items-center justify-between space-x-4 md:space-x-6 transition-all transform active:scale-99 ${item.checked ? 'bg-gray-100 opacity-75' : 'bg-white hover:shadow-md'
                            }`}
                    >
                        <div className="flex items-center space-x-4 md:space-x-6 flex-grow">
                            <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full border-2 md:border-4 flex items-center justify-center transition-colors flex-shrink-0 ${item.checked ? 'bg-success border-success' : 'border-gray-300'
                                }`}>
                                {item.checked && <span className="text-white text-lg md:text-2xl font-bold">✓</span>}
                            </div>
                            <span className={`text-2xl md:text-3xl font-medium ${item.checked ? 'line-through text-gray-500' : 'text-textMain'}`}>
                                {item.name}
                            </span>
                        </div>
                        <div className="flex gap-2 md:gap-4">
                            <button onClick={(e) => openEditModal(e, item)} className="text-blue-600 hover:text-blue-800 font-semibold text-lg px-2">Edit</button>
                            <button onClick={(e) => deleteItem(e, item.id)} className="text-red-500 hover:text-red-700 font-semibold text-lg px-2">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mt-8 md:mt-12 bg-orange-50 border-orange-100">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-orange-800">Add Item</h2>
                <form onSubmit={addItem} className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <input
                        type="text"
                        placeholder="Item Name (e.g., Milk)"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className="input-field flex-grow"
                        required
                    />
                    <button type="submit" className="bg-accent text-white px-6 md:px-10 py-3 md:py-4 rounded-xl text-xl md:text-2xl font-bold hover:bg-orange-600 shadow-md transition-colors w-full md:w-auto">
                        Add Item
                    </button>
                </form>
            </div>

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Item"
                onSubmit={updateItem}
            >
                {editingItem && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Item Name</label>
                            <input
                                type="text"
                                value={editingItem.name}
                                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
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

export default Groceries;
