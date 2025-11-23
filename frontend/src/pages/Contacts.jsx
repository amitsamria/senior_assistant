import { useState, useEffect } from 'react';
import api from '../api';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' });

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

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="page-title">My Contacts</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {contacts.map((contact) => (
                    <div key={contact.id} className="card flex items-center space-x-6 hover:shadow-lg transition-all">
                        <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center text-4xl font-bold text-primary">
                            {contact.name[0]}
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-textMain">{contact.name}</h3>
                            <p className="text-xl text-secondary mb-2">{contact.relation}</p>
                            <a href={`tel:${contact.phone}`} className="text-2xl font-bold text-primary hover:underline block">
                                📞 {contact.phone}
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mt-12 bg-purple-50 border-purple-100">
                <h2 className="text-3xl font-bold mb-6 text-purple-800">Add Contact</h2>
                <form onSubmit={addContact} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input type="text" placeholder="Name" value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} className="input-field" required />
                        <input type="text" placeholder="Relation" value={newContact.relation} onChange={e => setNewContact({ ...newContact, relation: e.target.value })} className="input-field" required />
                        <input type="tel" placeholder="Phone Number" value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} className="input-field" required />
                    </div>
                    <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-xl text-2xl font-bold hover:bg-purple-700 shadow-md transition-colors">Add Contact</button>
                </form>
            </div>
        </div>
    );
};

export default Contacts;
