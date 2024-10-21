import React, { useState, useRef, useEffect } from 'react';
import Canvas from '../components/Canvas';
import CanvasToolbar from '../components/CanvasToolbar';
import Chat from '../components/Chat';
import CanvasKeyboardShortcuts from '../components/CanvasKeyboardShortcuts';

export default function Draw({ socket, sessionInfo, onJoinSession }) {
    // State variables for active tool, color, and shortcut visibility
    const [activeTool, setActiveTool] = useState('draw');
    const [color, setColor] = useState('#2563eb');
    const [showShortcuts, setShowShortcuts] = useState(false);
    const canvasRef = useRef(null); // Ref to access the Canvas component

    useEffect(() => {
        // Function to handle keyboard shortcuts
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) { // Check for Ctrl or Command key
                switch (e.key.toLowerCase()) {
                    case 'z':
                        e.preventDefault(); // Prevent default behavior
                        if (e.shiftKey) {
                            redo(); // Redo action
                        } else {
                            undo(); // Undo action
                        }
                        break;
                    case 'y':
                        e.preventDefault(); // Prevent default behavior
                        redo(); // Redo action
                        break;
                    case 's':
                        e.preventDefault(); // Prevent default behavior
                        exportToImage(); // Export canvas to image
                        break;
                    case 'r':
                        e.preventDefault(); // Prevent default behavior
                        resetCanvas(); // Reset the canvas
                        break;
                    default:
                        break;
                }
            } else {
                // Handle tool selection based on key press
                switch (e.key.toLowerCase()) {
                    case 'p':
                        setActiveTool('draw'); // Select draw tool
                        break;
                    case 'e':
                        setActiveTool('erase'); // Select erase tool
                        break;
                    case 'r':
                        setActiveTool('rectangle'); // Select rectangle tool
                        break;
                    case 'c':
                        setActiveTool('circle'); // Select circle tool
                        break;
                    case 't':
                        setActiveTool('text'); // Select text tool
                        break;
                    case 'a':
                        setActiveTool('arrow'); // Select arrow tool
                        break;
                    case 'l':
                        setActiveTool('line'); // Select line tool
                        break;
                    case 's':
                        setActiveTool('star'); // Select star tool
                        break;
                    case 'g':
                        setActiveTool('polygon'); // Select polygon tool
                        break;
                    case 'm':
                        setActiveTool('pan'); // Select pan tool
                        break;
                    default:
                        break;
                }
            }
        };

        // Add event listener for keydown events
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Check if sessionInfo is available
    if (!sessionInfo) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-800/10 text-blue-600">
                <div className="glassmorphism w-full max-w-md rounded-lg p-8 text-center shadow-xl">
                    <h2 className="mb-4 text-3xl font-bold text-white">
                        Welcome to Collaborative Drawing
                    </h2>
                    <p className="mb-6 text-gray-300">
                        Please join a session to start drawing and chatting with others.
                    </p>
                    <button
                        onClick={onJoinSession} // Function to join a session
                        className="glassmorphism-button rounded-md px-3 py-2 text-sm transition-all duration-300 hover:scale-105 hover:bg-blue-600"
                    >
                        Join Session
                    </button>
                </div>
            </div>
        );
    }

    // Function to reset the canvas
    const resetCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.resetCanvas();
        }
    };

    // Function to undo the last action
    const undo = () => {
        if (canvasRef.current) {
            canvasRef.current.undo();
        }
    };

    // Function to redo the last undone action
    const redo = () => {
        if (canvasRef.current) {
            canvasRef.current.redo();
        }
    };

    // Function to export the canvas to an image
    const exportToImage = () => {
        if (canvasRef.current) {
            canvasRef.current.exportToImage();
        }
    };

    // Function to toggle the visibility of keyboard shortcuts
    const toggleShortcuts = () => {
        setShowShortcuts(!showShortcuts);
    };

    return (
        <div className="flex h-full min-h-[calc(100vh-1rem)] flex-col p-4 text-white md:flex-row">
            {/* Left Section with Canvas */}
            <div className="mb-2 flex flex-1 flex-col md:mb-0 md:pr-4">
                <CanvasToolbar
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                    color={color}
                    setColor={setColor}
                    resetCanvas={resetCanvas}
                    undo={undo}
                    redo={redo}
                    exportToImage={exportToImage}
                    toggleShortcuts={toggleShortcuts}
                />
                <div className="glassmorphism flex-1 overflow-hidden rounded-lg p-2">
                    <Canvas
                        ref={canvasRef} // Pass ref to Canvas
                        socket={socket}
                        activeTool={activeTool}
                        color={color}
                    />
                </div>
            </div>

            {/* Right Section with Chat */}
            <div className="flex flex-col overflow-hidden md:w-[30%]">
                <h2 className="glassmorphism mb-2 py-4 text-center text-lg font-bold sm:text-base">
                    Live Chat
                </h2>
                <div className="flex-1 overflow-y-auto pb-4">
                    {' '}
                    {/* Added bottom padding */}
                    <Chat socket={socket} />
                </div>
            </div>

            {/* Keyboard Shortcuts Modal */}
            <CanvasKeyboardShortcuts
                isOpen={showShortcuts} // Modal visibility state
                onClose={() => setShowShortcuts(false)} // Close function
            />
        </div>
    );
}
