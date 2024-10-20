import React, { useState, useRef, useEffect } from 'react';
import Canvas from '../components/Canvas';
import CanvasToolbar from '../components/CanvasToolbar';
import Chat from '../components/Chat';
import CanvasKeyboardShortcuts from '../components/CanvasKeyboardShortcuts';

export default function Draw({ socket, sessionInfo, onJoinSession }) {
    const [activeTool, setActiveTool] = useState('draw');
    const [color, setColor] = useState('#2563eb');
    const [showShortcuts, setShowShortcuts] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            redo();
                        } else {
                            undo();
                        }
                        break;
                    case 'y':
                        e.preventDefault();
                        redo();
                        break;
                    case 's':
                        e.preventDefault();
                        exportToImage();
                        break;
                    case 'r':
                        e.preventDefault();
                        resetCanvas();
                        break;
                    default:
                        break;
                }
            } else {
                switch (e.key.toLowerCase()) {
                    case 'p':
                        setActiveTool('draw');
                        break;
                    case 'e':
                        setActiveTool('erase');
                        break;
                    case 'r':
                        setActiveTool('rectangle');
                        break;
                    case 'c':
                        setActiveTool('circle');
                        break;
                    case 't':
                        setActiveTool('text');
                        break;
                    case 'a':
                        setActiveTool('arrow');
                        break;
                    case 'l':
                        setActiveTool('line');
                        break;
                    case 's':
                        setActiveTool('star');
                        break;
                    case 'g':
                        setActiveTool('polygon');
                        break;
                    case 'm':
                        setActiveTool('pan');
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
                        onClick={onJoinSession}
                        className="glassmorphism-button rounded-md px-3 py-2 text-sm transition-all duration-300 hover:scale-105 hover:bg-blue-600"
                    >
                        Join Session
                    </button>
                </div>
            </div>
        );
    }

    const resetCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.resetCanvas();
        }
    };

    const undo = () => {
        if (canvasRef.current) {
            canvasRef.current.undo();
        }
    };

    const redo = () => {
        if (canvasRef.current) {
            canvasRef.current.redo();
        }
    };

    const exportToImage = () => {
        if (canvasRef.current) {
            canvasRef.current.exportToImage();
        }
    };

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
                        ref={canvasRef}
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
                isOpen={showShortcuts}
                onClose={() => setShowShortcuts(false)}
            />
        </div>
    );
}
