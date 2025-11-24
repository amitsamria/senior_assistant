import { useEffect, useState } from 'react';

const EditModal = ({ isOpen, onClose, title, children, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-primary">{title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-4xl">&times;</button>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-6">
                        {children}
                        <div className="flex justify-end gap-4 mt-8">
                            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="px-8 py-3 rounded-xl text-xl font-bold text-white bg-primary hover:bg-primaryDark shadow-md transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
