import React, { useEffect, useRef, useState } from 'react';
import { Copy, Eye, EyeOff, X } from 'lucide-react';
import Notification from './Notification';

const SessionModal = ({ isOpen, onClose, onSubmit, mode, sessionDetails }) => {
    const [sessionId, setSessionId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (mode === 'details' && sessionDetails) {
            setSessionId(sessionDetails.sessionId);
            setPassword(sessionDetails.password);
        }
    }, [mode, sessionDetails]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!sessionId.trim() || !username.trim() || !password.trim()) {
            setNotification({ message: 'All fields are required', type: 'error' });
            return;
        }

        onSubmit({ sessionId, username, password });
        setNotification({
            message: `Session ${mode === 'join' ? 'joined' : 'created'} successfully!`,
            type: 'success',
        });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setNotification({ message: 'Copied to clipboard!', type: 'success' });
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
            <div ref={modalRef} className="glassmorphism relative rounded-lg p-6">
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                    {mode === 'join'
                        ? 'Join Session'
                        : mode === 'create'
                            ? 'Create Session'
                            : 'Session Details'}
                </h2>
                {mode === 'details' ? (
                    <>
                        <div className="mb-4">
                            <label htmlFor="sessionId" className="mb-1 text-sm font-medium">
                                Session ID
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="sessionId"
                                    value={sessionId}
                                    readOnly
                                    className="w-full rounded border-none glassmorphism p-2 text-white focus:outline-none"
                                />
                                <button
                                    onClick={() => copyToClipboard(sessionId)}
                                    className="glassmorphism-button ml-2 rounded-md p-2"
                                >
                                    <Copy size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="mb-1 text-sm font-medium">
                                Session Password
                            </label>
                            <div className="flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    readOnly
                                    className="w-full rounded border-none glassmorphism p-2 text-white focus:outline-none"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="glassmorphism-button ml-2 rounded-md p-2"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                <button
                                    onClick={() => copyToClipboard(password)}
                                    className="glassmorphism-button ml-2 rounded-md p-2"
                                >
                                    <Copy size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <label
                            htmlFor="sessionId"
                            className="mb-1 block text-sm font-medium"
                        >
                            Session ID
                        </label>
                        <input
                            type="text"
                            id="sessionId"
                            placeholder="Session ID"
                            value={sessionId}
                            onChange={(e) => setSessionId(e.target.value)}
                            className="mb-4 block w-full rounded border p-2 text-black"
                        />
                        <label htmlFor="username" className=" mb-1 text-sm font-medium">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-4 block w-full rounded border p-2 text-black"
                        />
                        <label htmlFor="password" className="mb-1 text-sm font-medium">
                            Session Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4 w-full rounded border p-2 text-black"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={onClose}
                                className="glassmorphism-button rounded-md px-3 py-2 text-sm transition-all duration-300 hover:scale-105 hover:bg-red-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="glassmorphism-button rounded-md px-3 py-2 text-sm transition-all duration-300 hover:scale-105 hover:bg-purple-600"
                            >
                                {mode === 'join' ? 'Join' : 'Create'}
                            </button>
                        </div>
                    </>
                )}
            </div>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};

export default SessionModal;
