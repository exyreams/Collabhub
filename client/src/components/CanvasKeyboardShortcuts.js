import React from 'react';
import { FiX } from 'react-icons/fi';

const CanvasKeyboardShortcuts = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const shortcuts = [
        { key: 'P', description: 'Pencil tool' },
        { key: 'E', description: 'Eraser tool' },
        { key: 'R', description: 'Rectangle tool' },
        { key: 'C', description: 'Circle tool' },
        { key: 'T', description: 'Text tool' },
        { key: 'A', description: 'Arrow tool' },
        { key: 'L', description: 'Line tool' },
        { key: 'S', description: 'Star tool' },
        { key: 'G', description: 'Polygon tool' },
        { key: 'M', description: 'Pan tool' },
        { key: 'Ctrl + Z', description: 'Undo' },
        { key: 'Ctrl + Y', description: 'Redo' },
        { key: 'Ctrl + R', description: 'Reset Canvas' },
        { key: 'Ctrl + S', description: 'Export to Image' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="glassmorphism max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg p-6">
                <div className="mb-4 flex items-center justify-between ">
                    <h2 className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
                        Keyboard Shortcuts
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-gray-100"
                    >
                        <FiX size={24} />
                    </button>
                </div>
                <ul className="space-y-2">
                    {shortcuts.map((shortcut, index) => (
                        <li key={index} className="flex justify-between text-white">
              <span className="font-mono rounded bg-gray-800 px-2 py-1">
                {shortcut.key}
              </span>
                            <span>{shortcut.description}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CanvasKeyboardShortcuts;
