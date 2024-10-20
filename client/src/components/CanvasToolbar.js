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
    const [showColorPicker, setShowColorPicker] = useState(false);

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
                    {tools.map((tool) => (
                        <button
                            key={tool.name}
                            className={`rounded p-2 ${activeTool === tool.name ? 'bg-blue-600' : 'bg-gray-700'} transition-colors hover:bg-blue-500`}
                            onClick={() => setActiveTool(tool.name)}
                            title={tool.title}
                        >
                            {React.cloneElement(tool.icon, { className: 'w-4 h-4' })}
                        </button>
                    ))}
                    {actions.map((action) => (
                        <button
                            key={action.name}
                            className="rounded bg-gray-700 p-2 transition-colors hover:bg-blue-500"
                            onClick={action.onClick}
                            title={action.title}
                        >
                            {React.cloneElement(action.icon, { className: 'w-4 h-4' })}
                        </button>
                    ))}
                    <div className="relative mt-2">
                        <button
                            className="h-8 w-8 rounded"
                            style={{ backgroundColor: color }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            title="Color Picker"
                        />
                        {showColorPicker && (
                            <div className="absolute z-50 mt-2">
                                <div
                                    className="fixed inset-0"
                                    onClick={() => setShowColorPicker(false)}
                                />
                                <SketchPicker
                                    color={color}
                                    onChange={(newColor) => setColor(newColor.hex)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className="ml-auto rounded bg-gray-700 p-2 transition-colors hover:bg-blue-500"
                    onClick={toggleShortcuts}
                    title="Keyboard Shortcuts"
                >
                    <FiHelpCircle className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
