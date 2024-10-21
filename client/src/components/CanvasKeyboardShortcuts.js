import React from 'react';
import { FiX } from 'react-icons/fi';

const CanvasKeyboardShortcuts = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Return null if the modal is not open

    const shortcuts = [
        { key: 'P', description: 'Pencil tool' }, // Shortcut for Pencil tool
        { key: 'E', description: 'Eraser tool' }, // Shortcut for Eraser tool
        { key: 'R', description: 'Rectangle tool' }, // Shortcut for Rectangle tool
        { key: 'C', description: 'Circle tool' }, // Shortcut for Circle tool
        { key: 'T', description: 'Text tool' }, // Shortcut for Text tool
        { key: 'A', description: 'Arrow tool' }, // Shortcut for Arrow tool
        { key: 'L', description: 'Line tool' }, // Shortcut for Line tool
        { key: 'S', description: 'Star tool' }, // Shortcut for Star tool
        { key: 'G', description: 'Polygon tool' }, // Shortcut for Polygon tool
        { key: 'M', description: 'Pan tool' }, // Shortcut for Pan tool
        { key: 'Ctrl + Z', description: 'Undo' }, // Shortcut for Undo action
        { key: 'Ctrl + Y', description: 'Redo' }, // Shortcut for Redo action
        { key: 'Ctrl + R', description: 'Reset Canvas' }, // Shortcut for Resetting the canvas
        { key: 'Ctrl + S', description: 'Export to Image' }, // Shortcut for Exporting to image
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="glassmorphism max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg p-6">
                <div className="mb-4 flex items-center justify-between ">
                    <h2 className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
                        Keyboard Shortcuts {/* Heading for the modal */}
                    </h2>
                    <button
                        onClick={onClose} // Close the modal when the button is clicked
                        className="text-gray-300 hover:text-gray-100"
                    >
                        <FiX size={24} /> {/* Close icon */}
                    </button>
                </div>
                <ul className="space-y-2">
                    {shortcuts.map((shortcut, index) => ( // Map over shortcuts array to create list items
                        <li key={index} className="flex justify-between text-white">
                            <span className="font-mono rounded bg-gray-800 px-2 py-1">
                                {shortcut.key} {/* Display the shortcut key */}
                            </span>
                            <span>{shortcut.description}</span> {/* Display the description */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CanvasKeyboardShortcuts;
