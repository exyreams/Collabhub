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
        socket.on('drawLine', (newLine) => {
            setLines((prevLines) => [...prevLines, newLine]);
        });

        socket.on('drawShape', (newShape) => {
            setShapes((prevShapes) => [...prevShapes, newShape]);
        });

        socket.on('undoAction', () => {
            undo();
        });

        socket.on('redoAction', () => {
            redo();
        });

        socket.on('resetCanvas', () => {
            resetCanvas();
        });

        return () => {
            socket.off('drawLine');
            socket.off('drawShape');
            socket.off('undoAction');
            socket.off('redoAction');
            socket.off('resetCanvas');
        };
    }, [socket]);

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
        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        if (activeTool === 'draw' || activeTool === 'erase') {
            setLines([
                ...lines,
                {
                    tool: activeTool,
                    points: [pos.x, pos.y],
                    color: activeTool === 'erase' ? 'white' : color,
                },
            ]);
        } else if (activeTool === 'text') {
            setTextPosition(pos);
            setShowTextModal(true);
        } else {
            setShapes([...shapes, { tool: activeTool, start: pos, end: pos, color }]);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        if (activeTool === 'draw' || activeTool === 'erase') {
            const lastLine = lines[lines.length - 1];
            lastLine.points = lastLine.points.concat([point.x, point.y]);
            setLines([...lines.slice(0, -1), lastLine]);
            socket.emit('drawLine', lastLine);
        } else if (activeTool !== 'text') {
            const lastShape = shapes[shapes.length - 1];
            lastShape.end = point;
            setShapes([...shapes.slice(0, -1), lastShape]);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        if (
            activeTool !== 'draw'
            && activeTool !== 'erase'
            && activeTool !== 'text'
        ) {
            socket.emit('drawShape', shapes[shapes.length - 1]);
        }
        setHistory([...history, { lines: [...lines], shapes: [...shapes] }]);
        setRedoStack([]);
    };

    const undo = useCallback(() => {
        if (history.length > 0) {
            const prevState = history[history.length - 1];
            setLines(prevState.lines);
            setShapes(prevState.shapes);
            setHistory(history.slice(0, -1));
            setRedoStack([...redoStack, { lines: [...lines], shapes: [...shapes] }]);
            socket.emit('undoAction');
        }
    }, [history, lines, shapes, redoStack, socket]);

    const redo = useCallback(() => {
        if (redoStack.length > 0) {
            const nextState = redoStack[redoStack.length - 1];
            setLines(nextState.lines);
            setShapes(nextState.shapes);
            setHistory([...history, { lines: [...lines], shapes: [...shapes] }]);
            setRedoStack(redoStack.slice(0, -1));
            socket.emit('redoAction');
        }
    }, [history, lines, shapes, redoStack, socket]);

    const resetCanvas = useCallback(() => {
        setLines([]);
        setShapes([]);
        setHistory([]);
        setRedoStack([]);
        socket.emit('resetCanvas');
    }, [socket]);

    const exportToImage = useCallback(() => {
        const dataURL = stageRef.current.toDataURL();
        const link = document.createElement('a');
        link.download = 'canvas-export.png';
        link.href = dataURL;
        link.click();
    }, []);

    const handleTextSubmit = () => {
        if (textInput) {
            const newShape = {
                tool: 'text',
                ...textPosition,
                text: textInput,
                color,
            };
            setShapes([...shapes, newShape]);
            socket.emit('drawShape', newShape);
            setTextInput('');
            setShowTextModal(false);
        }
    };

    useEffect(() => {
        const resizeStage = () => {
            if (containerRef.current) {
                setStageSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        resizeStage();
        window.addEventListener('resize', resizeStage);
        return () => window.removeEventListener('resize', resizeStage);
    }, []);

    React.useImperativeHandle(ref, () => ({
        undo,
        redo,
        resetCanvas,
        exportToImage,
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
                            key={i}
                            points={line.points}
                            stroke={line.color}
                            strokeWidth={line.tool === 'erase' ? 20 : 5}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation={
                                line.tool === 'erase' ? 'destination-out' : 'source-over'
                            }
                        />
                    ))}
                    {shapes.map((shape, i) => {
                        switch (shape.tool) {
                            case 'rectangle':
                                return (
                                    <Rect
                                        key={i}
                                        x={Math.min(shape.start.x, shape.end.x)}
                                        y={Math.min(shape.start.y, shape.end.y)}
                                        width={Math.abs(shape.end.x - shape.start.x)}
                                        height={Math.abs(shape.end.y - shape.start.y)}
                                        stroke={shape.color}
                                        strokeWidth={2}
                                        draggable
                                    />
                                );
                            case 'circle':
                                const radius = Math.sqrt(
                                    Math.pow(shape.end.x - shape.start.x, 2)
                                    + Math.pow(shape.end.y - shape.start.y, 2),
                                );
                                return (
                                    <Circle
                                        key={i}
                                        x={shape.start.x}
                                        y={shape.start.y}
                                        radius={radius}
                                        stroke={shape.color}
                                        strokeWidth={2}
                                        draggable
                                    />
                                );
                            case 'arrow':
                                return (
                                    <Arrow
                                        key={i}
                                        points={[
                                            shape.start.x,
                                            shape.start.y,
                                            shape.end.x,
                                            shape.end.y,
                                        ]}
                                        pointerLength={10}
                                        pointerWidth={10}
                                        fill={shape.color}
                                        stroke={shape.color}
                                        strokeWidth={2}
                                        draggable
                                    />
                                );
                            case 'line':
                                return (
                                    <Line
                                        key={i}
                                        points={[
                                            shape.start.x,
                                            shape.start.y,
                                            shape.end.x,
                                            shape.end.y,
                                        ]}
                                        stroke={shape.color}
                                        strokeWidth={2}
                                        draggable
                                    />
                                );
                            case 'text':
                                return (
                                    <Text
                                        key={i}
                                        x={shape.x}
                                        y={shape.y}
                                        text={shape.text}
                                        fontSize={16}
                                        fill={shape.color}
                                        draggable
                                    />
                                );
                            case 'star':
                                return (
                                    <Star
                                        key={i}
                                        x={(shape.start.x + shape.end.x) / 2}
                                        y={(shape.start.y + shape.end.y) / 2}
                                        numPoints={5}
                                        innerRadius={Math.abs(shape.end.x - shape.start.x) / 4}
                                        outerRadius={Math.abs(shape.end.x - shape.start.x) / 2}
                                        stroke={shape.color}
                                        strokeWidth={2}
                                        draggable
                                    />
                                );
                            case 'polygon':
                                return (
                                    <RegularPolygon
                                        key={i}
                                        x={(shape.start.x + shape.end.x) / 2}
                                        y={(shape.start.y + shape.end.y) / 2}
                                        sides={6}
                                        radius={Math.abs(shape.end.x - shape.start.x) / 2}
                                        stroke={shape.color}
                                        strokeWidth={2}
                                        draggable
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </Layer>
            </Stage>
            <Modal
                isOpen={showTextModal}
                onClose={() => setShowTextModal(false)}
                onSubmit={handleTextSubmit}
            >
                <label htmlFor="sessionId" className="text-md font-semibold text-white">
                    Add Text
                </label>
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter text"
                    className="glassmorphism mt-4 w-full border p-2"
                />
            </Modal>
        </div>
    );
});

export default Canvas;
