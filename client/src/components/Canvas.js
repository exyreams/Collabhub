// noinspection JSUnusedLocalSymbols

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Stage,
    Layer,
    Line,
    Rect,
    Circle,
    Arrow,
    Text,
    Star,
    RegularPolygon,
} from 'react-konva';
import Modal from './Modal';

const Canvas = React.forwardRef(({ socket, activeTool, color }, ref) => {
    const [lines, setLines] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [showTextModal, setShowTextModal] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Listen for 'drawLine' event from the socket and update the lines array with the new line
        socket.on('drawLine', (newLine) => {
            setLines((prevLines) => [...prevLines, newLine]);
        });

        // Listen for 'drawShape' event and update the shapes array with the new shape
        socket.on('drawShape', (newShape) => {
            setShapes((prevShapes) => [...prevShapes, newShape]);
        });

        // Listen for 'undoAction' event and trigger the undo function
        socket.on('undoAction', () => {
            undo();
        });

        // Listen for 'redoAction' event and trigger the redo function
        socket.on('redoAction', () => {
            redo();
        });

        // Listen for 'resetCanvas' event and trigger the resetCanvas function
        socket.on('resetCanvas', () => {
            resetCanvas();
        });

        // Cleanup: Remove all socket event listeners when the component unmounts
        return () => {
            socket.off('drawLine');
            socket.off('drawShape');
            socket.off('undoAction');
            socket.off('redoAction');
            socket.off('resetCanvas');
        };
    }, [socket]); // Effect depends on the socket object


    useEffect(() => {
        // Handler for keydown events to implement keyboard shortcuts
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) { // Check if Ctrl or Command (Meta) key is pressed
                switch (e.key.toLowerCase()) {
                    case 'z': // If 'z' is pressed
                        e.preventDefault();
                        if (e.shiftKey) { // If Shift is also pressed, redo the action
                            redo();
                        } else { // Otherwise, undo the action
                            undo();
                        }
                        break;
                    case 'y': // If 'y' is pressed, redo the action
                        e.preventDefault();
                        redo();
                        break;
                    case 's': // If 's' is pressed, export the canvas to an image
                        e.preventDefault();
                        exportToImage();
                        break;
                    default:
                        break;
                }
            }
        };

        // Add keydown event listener on window
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: Remove event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty dependency array, meaning this effect runs only once on mount


    // Get cursor for respective tools.
    const getCursor = () => {
        switch (activeTool) {
            case 'draw':
            case 'line':
            case 'arrow':
            case 'rectangle':
            case 'circle':
            case 'star':
            case 'polygon':
                return 'crosshair';
            case 'erase':
                return 'cell';
            case 'text':
                return 'text';
            case 'pan':
                return 'move';
            default:
                return 'default';
        }
    };

    const handleMouseDown = (e) => {
        setIsDrawing(true); // Start drawing or interacting with the canvas
        const pos = e.target.getStage().getPointerPosition(); // Get the current mouse/touch position on the stage

        if (activeTool === 'draw' || activeTool === 'erase') {
            // If the active tool is either draw or erase
            setLines([
                ...lines, // Keep previous lines
                {
                    tool: activeTool, // Set the current tool (draw or erase)
                    points: [pos.x, pos.y], // Start the line at the current position
                    color: activeTool === 'erase' ? 'white' : color, // Set color based on tool
                },
            ]);
        } else if (activeTool === 'text') {
            // If the active tool is text
            setTextPosition(pos); // Set position for the text input
            setShowTextModal(true); // Show the modal for adding text
        } else {
            // For other shape tools
            setShapes([
                ...shapes, // Keep previous shapes
                { tool: activeTool, start: pos, end: pos, color }, // Start a new shape
            ]);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return; // Do nothing if not currently drawing

        const stage = e.target.getStage();
        const point = stage.getPointerPosition(); // Get the current pointer position

        if (activeTool === 'draw' || activeTool === 'erase') {
            // If the active tool is either draw or erase
            const lastLine = lines[lines.length - 1]; // Get the last drawn line
            lastLine.points = lastLine.points.concat([point.x, point.y]); // Add new point to the line
            setLines([...lines.slice(0, -1), lastLine]); // Update the lines array
            socket.emit('drawLine', lastLine); // Emit the line to the server
        } else if (activeTool !== 'text') {
            // If the active tool is not text
            const lastShape = shapes[shapes.length - 1]; // Get the last drawn shape
            lastShape.end = point; // Update the end point of the shape
            setShapes([...shapes.slice(0, -1), lastShape]); // Update the shapes array
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false); // Stop drawing when the mouse is released
        if (
            activeTool !== 'draw' // Check if the active tool is not drawing
            && activeTool !== 'erase' // Check if the active tool is not erasing
            && activeTool !== 'text' // Check if the active tool is not text input
        ) {
            socket.emit('drawShape', shapes[shapes.length - 1]); // Emit the last shape to the server
        }
        setHistory([...history, { lines: [...lines], shapes: [...shapes] }]); // Update the history with current state
        setRedoStack([]); // Clear the redo stack after a new action
    };

    const undo = useCallback(() => {
        if (history.length > 0) {
            const prevState = history[history.length - 1]; // Get the last state from history
            setLines(prevState.lines); // Restore the lines to the previous state
            setShapes(prevState.shapes); // Restore the shapes to the previous state
            setHistory(history.slice(0, -1)); // Remove the last state from history
            setRedoStack([...redoStack, { lines: [...lines], shapes: [...shapes] }]); // Add current state to redo stack
            socket.emit('undoAction'); // Emit undo action to the server
        }
    }, [history, lines, shapes, redoStack, socket]); // Dependencies for useCallback

    const redo = useCallback(() => {
        if (redoStack.length > 0) {
            const nextState = redoStack[redoStack.length - 1]; // Get the last state from redo stack
            setLines(nextState.lines); // Restore the lines to the next state
            setShapes(nextState.shapes); // Restore the shapes to the next state
            setHistory([...history, { lines: [...lines], shapes: [...shapes] }]); // Add current state to history
            setRedoStack(redoStack.slice(0, -1)); // Remove the last state from redo stack
            socket.emit('redoAction'); // Emit redo action to the server
        }
    }, [history, lines, shapes, redoStack, socket]); // Dependencies for useCallback

    const resetCanvas = useCallback(() => {
        // Reset all drawing states and clear the canvas
        setLines([]); // Clear all drawn lines
        setShapes([]); // Clear all drawn shapes
        setHistory([]); // Clear the history of actions
        setRedoStack([]); // Clear the redo stack
        socket.emit('resetCanvas'); // Emit reset action to the server
    }, [socket]); // Dependencies for useCallback

    const exportToImage = useCallback(() => {
        // Export the current canvas state to an image
        const dataURL = stageRef.current.toDataURL(); // Convert canvas to data URL
        const link = document.createElement('a'); // Create a link element for download
        link.download = 'canvas-export.png'; // Set the download file name
        link.href = dataURL; // Set the link's href to the data URL
        link.click(); // Trigger a click to download the image
    }, []); // No dependencies

    const handleTextSubmit = () => {
        // Handle submission of text input
        if (textInput) {
            const newShape = {
                tool: 'text', // Define the shape as text
                ...textPosition, // Spread existing text position
                text: textInput, // Add the input text
                color, // Add the selected color
            };
            setShapes([...shapes, newShape]); // Update shapes array with the new text shape
            socket.emit('drawShape', newShape); // Emit the new shape to the server
            setTextInput(''); // Clear the text input
            setShowTextModal(false); // Hide the text input modal
        }
    };

    useEffect(() => {
        // Effect to handle resizing of the canvas stage
        const resizeStage = () => {
            if (containerRef.current) {
                setStageSize({
                    width: containerRef.current.offsetWidth, // Update width based on container size
                    height: containerRef.current.offsetHeight, // Update height based on container size
                });
            }
        };

        resizeStage(); // Initial resize call
        window.addEventListener('resize', resizeStage); // Add event listener for window resize
        return () => window.removeEventListener('resize', resizeStage); // Cleanup on unmount
    }, []); // Empty dependency array to run on mount only

    React.useImperativeHandle(ref, () => ({
        // Expose methods to the parent component using the ref
        undo, // Method to undo the last action
        redo, // Method to redo the last undone action
        resetCanvas, // Method to reset the canvas
        exportToImage, // Method to export the canvas as an image
    }));

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '0.5rem',
                overflow: 'hidden',
            }}
        >
            <Stage
                width={window.innerWidth * 0.7}
                height={window.innerHeight - 100}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                ref={stageRef}
                style={{ backgroundColor: 'white', cursor: getCursor() }}
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i} // Unique key for each line, using the index
                            points={line.points} // Points defining the line shape
                            stroke={line.color} // Color of the line
                            strokeWidth={line.tool === 'erase' ? 20 : 5} // Stroke width changes based on tool (erase vs. draw)
                            tension={0.5} // Tension for line smoothing
                            lineCap="round" // Round cap for the ends of the line
                            lineJoin="round" // Round join for line segments
                            globalCompositeOperation={ // Determine how the line interacts with other drawings
                                line.tool === 'erase' ? 'destination-out' : 'source-over' // Use destination-out for erasing, source-over for drawing
                            }
                        />
                    ))}
                    {shapes.map((shape, i) => {
                        switch (shape.tool) {
                            case 'rectangle':
                                return (
                                    <Rect
                                        key={i} // Unique key for each rectangle shape
                                        x={Math.min(shape.start.x, shape.end.x)} // Calculate x position based on starting and ending coordinates
                                        y={Math.min(shape.start.y, shape.end.y)} // Calculate y position based on starting and ending coordinates
                                        width={Math.abs(shape.end.x - shape.start.x)} // Calculate width of rectangle
                                        height={Math.abs(shape.end.y - shape.start.y)} // Calculate height of rectangle
                                        stroke={shape.color} // Stroke color for the rectangle
                                        strokeWidth={2} // Stroke width
                                        draggable // Allow dragging of the rectangle
                                    />
                                );
                            case 'circle':
                                const radius = Math.sqrt(
                                    Math.pow(shape.end.x - shape.start.x, 2) // Calculate radius based on distance between start and end points
                                    + Math.pow(shape.end.y - shape.start.y, 2),
                                );
                                return (
                                    <Circle
                                        key={i} // Unique key for each circle shape
                                        x={shape.start.x} // X position of the circle's center
                                        y={shape.start.y} // Y position of the circle's center
                                        radius={radius} // Radius of the circle
                                        stroke={shape.color} // Stroke color for the circle
                                        strokeWidth={2} // Stroke width
                                        draggable // Allow dragging of the circle
                                    />
                                );
                            case 'arrow':
                                return (
                                    <Arrow
                                        key={i} // Unique key for each arrow shape
                                        points={[ // Points defining the arrow shape
                                            shape.start.x,
                                            shape.start.y,
                                            shape.end.x,
                                            shape.end.y,
                                        ]}
                                        pointerLength={10} // Length of the arrowhead
                                        pointerWidth={10} // Width of the arrowhead
                                        fill={shape.color} // Fill color for the arrowhead
                                        stroke={shape.color} // Stroke color for the arrow
                                        strokeWidth={2} // Stroke width
                                        draggable // Allow dragging of the arrow
                                    />
                                );
                            case 'line':
                                return (
                                    <Line
                                        key={i} // Unique key for each line shape
                                        points={[ // Points defining the line
                                            shape.start.x,
                                            shape.start.y,
                                            shape.end.x,
                                            shape.end.y,
                                        ]}
                                        stroke={shape.color} // Stroke color for the line
                                        strokeWidth={2} // Stroke width
                                        draggable // Allow dragging of the line
                                    />
                                );
                            case 'text':
                                return (
                                    <Text
                                        key={i} // Unique key for each text shape
                                        x={shape.x} // X position of the text
                                        y={shape.y} // Y position of the text
                                        text={shape.text} // Text content to display
                                        fontSize={16} // Font size for the text
                                        fill={shape.color} // Fill color for the text
                                        draggable // Allow dragging of the text
                                    />
                                );
                            case 'star':
                                return (
                                    <Star
                                        key={i} // Unique key for each star shape
                                        x={(shape.start.x + shape.end.x) / 2} // X position for the center of the star
                                        y={(shape.start.y + shape.end.y) / 2} // Y position for the center of the star
                                        numPoints={5} // Number of points for the star
                                        innerRadius={Math.abs(shape.end.x - shape.start.x) / 4} // Inner radius for the star shape
                                        outerRadius={Math.abs(shape.end.x - shape.start.x) / 2} // Outer radius for the star shape
                                        stroke={shape.color} // Stroke color for the star
                                        strokeWidth={2} // Stroke width
                                        draggable // Allow dragging of the star
                                    />
                                );
                            case 'polygon':
                                return (
                                    <RegularPolygon
                                        key={i} // Unique key for each polygon shape
                                        x={(shape.start.x + shape.end.x) / 2} // X position for the center of the polygon
                                        y={(shape.start.y + shape.end.y) / 2} // Y position for the center of the polygon
                                        sides={6} // Number of sides for the polygon (hexagon in this case)
                                        radius={Math.abs(shape.end.x - shape.start.x) / 2} // Radius for the polygon
                                        stroke={shape.color} // Stroke color for the polygon
                                        strokeWidth={2} // Stroke width
                                        draggable // Allow dragging of the polygon
                                    />
                                );
                            default:
                                return null; // Return null for unrecognized shape tools
                        }
                    })}
                </Layer>
            </Stage>
            <Modal
                isOpen={showTextModal} // Control the visibility of the modal
                onClose={() => setShowTextModal(false)} // Close the modal when the close event is triggered
                onSubmit={handleTextSubmit} // Submit the text input when the submit event occurs
            >
                <label htmlFor="sessionId" className="text-md font-semibold text-white">
                    Add Text {/* Label for the text input field */}
                </label>
                <input
                    type="text" // Input type for text entry
                    value={textInput} // Bind input value to state
                    onChange={(e) => setTextInput(e.target.value)} // Update state on input change
                    placeholder="Enter text" // Placeholder text when input is empty
                    className="glassmorphism mt-4 w-full border p-2" // Styling for the input
                />
            </Modal>
        </div>
    );
});

export default Canvas;
