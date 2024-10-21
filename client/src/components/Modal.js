import React from 'react';

// Modal used for adding texts
const Modal = ({ isOpen, onClose, onSubmit, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-80">
            <div className="glassmorphism rounded-lg p-4">
                {children}
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="glassmorphism-button rounded-md px-3 py-2 text-sm transition-all duration-300 hover:scale-105 hover:bg-red-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="glassmorphism-button rounded-md px-3 py-2 text-sm transition-all duration-300 hover:scale-105 hover:bg-purple-600"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
