import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// Toast Notification on top right of the webpage
export default function Notification({ message, type, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 1500);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed right-4 top-4 flex items-center rounded-md p-4 shadow-md ${
                type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
        >
            <span className="mr-2 text-white">{message}</span>
            <button onClick={() => setIsVisible(false)} className="text-white">
                <X size={18} />
            </button>
        </div>
    );
}
