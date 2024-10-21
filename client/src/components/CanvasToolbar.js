import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import {
    FiCircle,
    FiEdit2,
    FiMinus,
    FiMove,
    FiSquare,
    FiRotateCcw,
    FiType,
    FiStar,
    FiHexagon,
    FiDownload,
    FiHelpCircle,
    FiArrowRight,
} from 'react-icons/fi';
import { BiUndo, BiRedo } from 'react-icons/bi';
import { BsEraser } from 'react-icons/bs';

export default function CanvasToolbar({
                                          activeTool,
                                          setActiveTool,
                                          resetCanvas,
                                          color,
                                          setColor,
                                          undo,
                                          redo,
                                          exportToImage,
                                          toggleShortcuts,
                                      }) {
    const [showColorPicker, setShowColorPicker] = useState(false); // State to manage visibility of color picker

    // Array of available tools with their icons and titles
    const tools = [
        { name: 'draw', icon: <FiEdit2 />, title: 'Pencil (P)' },
        { name: 'erase', icon: <BsEraser />, title: 'Eraser (E)' },
        { name: 'rectangle', icon: <FiSquare />, title: 'Rectangle (R)' },
        { name: 'circle', icon: <FiCircle />, title: 'Circle (C)' },
        { name: 'text', icon: <FiType />, title: 'Text (T)' },
        { name: 'arrow', icon: <FiArrowRight />, title: 'Arrow (A)' },
        { name: 'line', icon: <FiMinus />, title: 'Line (L)' },
        { name: 'star', icon: <FiStar />, title: 'Star (S)' },
        { name: 'polygon', icon: <FiHexagon />, title: 'Polygon (G)' },
        { name: 'pan', icon: <FiMove />, title: 'Pan (M)' },
    ];

    // Array of available actions with their icons, onClick handlers, and titles
    const actions = [
        { name: 'undo', icon: <BiUndo />, onClick: undo, title: 'Undo (Ctrl+Z)' },
        { name: 'redo', icon: <BiRedo />, onClick: redo, title: 'Redo (Ctrl+Y)' },
        {
            name: 'reset',
            icon: <FiRotateCcw />,
            onClick: resetCanvas,
            title: 'Reset Canvas (Ctrl+R)',
        },
        {
            name: 'export',
            icon: <FiDownload />,
            onClick: exportToImage,
            title: 'Export to Image (Ctrl+S)',
        },
    ];

    return (
        <div className="glassmorphism z-10 mb-2 rounded-md p-2 pl-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    {tools.map((tool) => ( // Map through tools array to create buttons
                        <button
                            key={tool.name}
                            className={`rounded p-2 ${activeTool === tool.name ? 'bg-blue-600' : 'bg-gray-700'} transition-colors hover:bg-blue-500`}
                            onClick={() => setActiveTool(tool.name)} // Set the active tool on click
                            title={tool.title}
                        >
                            {React.cloneElement(tool.icon, { className: 'w-4 h-4' })} {/* Render tool icon */}
                        </button>
                    ))}
                    {actions.map((action) => ( // Map through actions array to create buttons
                        <button
                            key={action.name}
                            className="rounded bg-gray-700 p-2 transition-colors hover:bg-blue-500"
                            onClick={action.onClick} // Execute action on click
                            title={action.title}
                        >
                            {React.cloneElement(action.icon, { className: 'w-4 h-4' })} {/* Render action icon */}
                        </button>
                    ))}
                    <div className="relative mt-2">
                        <button
                            className="h-8 w-8 rounded" // Button for color picker
                            style={{ backgroundColor: color }} // Display the current color
                            onClick={() => setShowColorPicker(!showColorPicker)} // Toggle color picker visibility
                            title="Color Picker"
                        />
                        {showColorPicker && (
                            <div className="absolute z-50 mt-2">
                                <div
                                    className="fixed inset-0" // Overlay to close the color picker when clicked outside
                                    onClick={() => setShowColorPicker(false)}
                                />
                                <SketchPicker
                                    color={color} // Set current color in color picker
                                    onChange={(newColor) => setColor(newColor.hex)} // Update color on change
                                />
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className="ml-auto rounded bg-gray-700 p-2 transition-colors hover:bg-blue-500" // Button to toggle shortcuts
                    onClick={toggleShortcuts}
                    title="Keyboard Shortcuts"
                >
                    <FiHelpCircle className="h-4 w-4" /> {/* Help icon */}
                </button>
            </div>
        </div>
    );
}
