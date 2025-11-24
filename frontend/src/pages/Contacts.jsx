import { useState, useEffect } from 'react';
import api from '../services/api';
import EditModal from '../components/EditModal';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' });
    const [editingContact, setEditingContact] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await api.get('/contacts');
            setContacts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addContact = async (e) => {
        e.preventDefault();
        try {
            await api.post('/contacts', { ...newContact, id: 0 });
            setNewContact({ name: '', relation: '', phone: '' });
            fetchContacts();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteContact = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await api.delete(`/contacts/${id}`);
                fetchContacts();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const openEditModal = (contact) => {
        setEditingContact(contact);
        setIsEditModalOpen(true);
    };

    const updateContact = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/contacts/${editingContact.id}`, editingContact);
            setIsEditModalOpen(false);
            fetchContacts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="page-title">My Contacts</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {contacts.map((contact) => (
                    <div key={contact.id} className="card flex flex-col items-start space-y-4 hover:shadow-lg transition-all">
                        <div className="flex items-center space-x-4 md:space-x-6 w-full">
                            <div className="bg-blue-100 rounded-full w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-2xl md:text-4xl font-bold text-primary flex-shrink-0">
                                {contact.name[0]}
                            </div>
                            <div className="min-w-0 flex-grow">
                                <h3 className="text-2xl md:text-3xl font-bold text-textMain truncate">{contact.name}</h3>
                                <p className="text-lg md:text-xl text-secondary mb-1 md:mb-2">{contact.relation}</p>
                                <a href={`tel:${contact.phone}`} className="text-xl md:text-2xl font-bold text-primary hover:underline block truncate">
                                    📞 {contact.phone}
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-end w-full gap-4">
                            <button onClick={() => openEditModal(contact)} className="text-blue-600 hover:text-blue-800 font-semibold text-lg">Edit</button>
                            <button onClick={() => deleteContact(contact.id)} className="text-red-500 hover:text-red-700 font-semibold text-lg">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mt-8 md:mt-12 bg-purple-50 border-purple-100">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-purple-800">Add Contact</h2>
                <form onSubmit={addContact} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <input type="text" placeholder="Name" value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} className="input-field" required />
                        <input type="text" placeholder="Relation" value={newContact.relation} onChange={e => setNewContact({ ...newContact, relation: e.target.value })} className="input-field" required />
                        <input type="tel" placeholder="Phone Number" value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} className="input-field" required />
                    </div>
                    <button type="submit" className="w-full bg-purple-600 text-white py-3 md:py-4 rounded-xl text-xl md:text-2xl font-bold hover:bg-purple-700 shadow-md transition-colors">Add Contact</button>
                </form>
            </div>

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Contact"
                onSubmit={updateContact}
            >
                {editingContact && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Name</label>
                            <input type="text" value={editingContact.name} onChange={e => setEditingContact({ ...editingContact, name: e.target.value })} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Relation</label>
                            <input type="text" value={editingContact.relation} onChange={e => setEditingContact({ ...editingContact, relation: e.target.value })} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">Phone Number</label>
                            <input type="tel" value={editingContact.phone} onChange={e => setEditingContact({ ...editingContact, phone: e.target.value })} className="input-field" required />
                        </div>
                    </div>
                )}
            </EditModal>
        </div>
    );
};

export default Contacts;
