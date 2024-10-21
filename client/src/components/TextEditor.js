import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ socket }) => {
    const editorRef = useRef(null);
    const [typingUsers, setTypingUsers] = useState({});

    useEffect(() => {
        // Ensure that the socket connection exists
        if (!socket) return;

        // Function to handle text updates from other users
        const handleUpdateText = (delta) => {
            // Check if the editor reference is available
            if (editorRef.current) {
                const quill = editorRef.current.getEditor(); // Get the Quill editor instance
                quill.updateContents(delta); // Update the editor's content with the received delta
            }
        };

        // Function to handle user typing events
        const handleUserTyping = ({ username, isTyping }) => {
            // Update the state of typing users based on the event
            setTypingUsers((prev) => ({
                ...prev,
                [username]: isTyping, // Set the typing status for the user
            }));
        };

        // Set up socket listeners for text updates and typing notifications
        socket.on('updateText', handleUpdateText);
        socket.on('userTyping', handleUserTyping);

        // Cleanup function to remove listeners when the component unmounts
        return () => {
            socket.off('updateText', handleUpdateText); // Remove text update listener
            socket.off('userTyping', handleUserTyping); // Remove user typing listener
        };
    }, [socket]); // Re-run the effect if the socket changes

    const handleTextChange = (content, delta, source, editor) => {
        // Check if the change was made by the user
        if (source === 'user' && socket) {
            // Emit the updated text content to the server
            socket.emit('updateText', delta);

            // Notify the server that the user is currently typing
            socket.emit('userTyping', { isTyping: true });

            // Debounce the typing event to prevent excessive messages
            clearTimeout(editorRef.current.typingTimeout);
            editorRef.current.typingTimeout = setTimeout(() => {
                // Emit a message indicating that the user has stopped typing
                socket.emit('userTyping', { isTyping: false });
            }, 1000); // Set a timeout for 1 second
        }
    };


    // Rich Text Editor Toolbar icons
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

    // Various Text Styling for Texts
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

            {/*React Quill Implementation*/}
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
