import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { AnimatePresence, motion } from 'framer-motion';

const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'dart', label: 'Dart' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'go', label: 'Go' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'java', label: 'Java' },
    { value: 'julia', label: 'Julia' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'lua', label: 'Lua' },
    { value: 'perl', label: 'Perl' },
    { value: 'php', label: 'PHP' },
    { value: 'python', label: 'Python' },
    { value: 'r', label: 'R' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'rust', label: 'Rust' },
    { value: 'scala', label: 'Scala' },
    { value: 'swift', label: 'Swift' },
    { value: 'typescript', label: 'TypeScript' },
];

const CodeEditor = ({ socket, sessionInfo }) => {
    const editorRef = useRef(null);
    const [language, setLanguage] = useState('javascript');
    const [isOpen, setIsOpen] = useState(false);
    const [typingUsers, setTypingUsers] = useState({});

    useEffect(() => {
        if (!socket) return;

        const handleUpdateCode = (data) => {
            if (editorRef.current) {
                const model = editorRef.current.getModel();
                const currentCode = model.getValue();
                if (currentCode !== data.code) {
                    const position = editorRef.current.getPosition();
                    model.pushEditOperations(
                        [],
                        [
                            {
                                range: model.getFullModelRange(),
                                text: data.code,
                            },
                        ],
                        () => [position],
                    );
                }
                if (data.language !== language) {
                    setLanguage(data.language);
                }
            }
        };

        const handleUserTyping = ({ username, isTyping }) => {
            setTypingUsers((prev) => ({
                ...prev,
                [username]: isTyping,
            }));
        };

        socket.on('updateCode', handleUpdateCode);
        socket.on('userTyping', handleUserTyping);

        return () => {
            socket.off('updateCode', handleUpdateCode);
            socket.off('userTyping', handleUserTyping);
        };
    }, [socket, language]);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleEditorChange = (value) => {
        if (socket) {
            socket.emit('updateCode', { code: value, language });
            socket.emit('userTyping', { isTyping: true });

            // Debounce the typing event
            clearTimeout(editorRef.current.typingTimeout);
            editorRef.current.typingTimeout = setTimeout(() => {
                socket.emit('userTyping', { isTyping: false });
            }, 1000);
        }
    };

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        setIsOpen(false);
        if (socket && editorRef.current) {
            socket.emit('updateCode', {
                code: editorRef.current.getValue(),
                language: newLanguage,
            });
        }
    };

    return (
        <div className="flex h-full flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative">
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="glassmorphism hover:shadow-glassmorphism-shadow w-48 px-4 py-2 transition-all duration-300 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {languageOptions.find((option) => option.value === language)
                            ?.label || 'Select Language'}
                    </motion.button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.ul
                                className="glassmorphism scroll absolute z-10 mt-1 max-h-60 w-48 overflow-y-auto overflow-x-hidden rounded-md py-1 shadow-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {languageOptions.map((option) => (
                                    <motion.li
                                        key={option.value}
                                        onClick={() => handleLanguageChange(option.value)}
                                        className="cursor-pointer rounded-md p-2 px-4 py-2 hover:bg-gray-700"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {option.label}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
                <div className="flex items-center space-x-2">
                    {Object.entries(typingUsers).map(
                        ([username, isTyping]) => isTyping && (
                            <div key={username} className="text-sm text-gray-300">
                                {username} is typing...
                            </div>
                        ),
                    )}
                </div>
            </div>
            <div className="relative grow overflow-hidden rounded-md">
                <Editor
                    height="100%"
                    language={language}
                    defaultValue="// Welcome to the Collabhub coding session! In this environment, you have the opportunity to write code in real-time with others.
// Collaboration is a key part of software development, allowing for diverse perspectives and problem-solving strategies.
// Happy coding! Let's create something amazing together!"
                    onMount={handleEditorDidMount}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: true },
                        fontSize: 14,
                        wordWrap: 'on',
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                        roundedSelection: true,
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
