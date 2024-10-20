import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ socket }) => {
    const editorRef = useRef(null);
    const [typingUsers, setTypingUsers] = useState({});

    useEffect(() => {
        if (!socket) return;

        const handleUpdateText = (delta) => {
            if (editorRef.current) {
                const quill = editorRef.current.getEditor();
                quill.updateContents(delta);
            }
        };

        const handleUserTyping = ({ username, isTyping }) => {
            setTypingUsers((prev) => ({
                ...prev,
                [username]: isTyping,
            }));
        };

        socket.on('updateText', handleUpdateText);
        socket.on('userTyping', handleUserTyping);

        return () => {
            socket.off('updateText', handleUpdateText);
            socket.off('userTyping', handleUserTyping);
        };
    }, [socket]);

    const handleTextChange = (content, delta, source, editor) => {
        if (source === 'user' && socket) {
            socket.emit('updateText', delta);
            socket.emit('userTyping', { isTyping: true });

            // Debounce the typing event
            clearTimeout(editorRef.current.typingTimeout);
            editorRef.current.typingTimeout = setTimeout(() => {
                socket.emit('userTyping', { isTyping: false });
            }, 1000);
        }
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image', 'video'],
            ['formula'],
            ['code-block'],
            [{ color: [] }],
        ],
    };

    const formats = [
        'header',
        'font',
        'bold',
        'italic',
        'underline',
        'list',
        'bullet',
        'align',
        'link',
        'image',
        'video',
        'formula',
        'code-block',
        'color',
    ];

    return (
        <div className="glassmorphism flex h-full flex-col rounded-lg p-2 relative">
            <div className="absolute top-2 right-2 z-10 max-w-[200px] overflow-hidden">
                <div className="bg-gray-800 bg-opacity-50 rounded p-2 text-sm text-gray-300">
                    {Object.entries(typingUsers).map(
                        ([username, isTyping]) =>
                            isTyping && (
                                <div
                                    key={username}
                                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                                >
                                    {username} is typing...
                                </div>
                            ),
                    )}
                </div>
            </div>
            <ReactQuill
                ref={editorRef}
                theme="snow"
                onChange={handleTextChange}
                modules={modules}
                formats={formats}
                className="flex flex-1 flex-col"
                placeholder="Start Writing.."
            />
        </div>
    );
};

export default TextEditor;
