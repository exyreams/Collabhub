import React, { useEffect, useState } from 'react';

const Avatar = ({ username }) => (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 font-semibold text-white">
        {username[0].toUpperCase()}
    </div>
);

const Button = ({ children, ...props }) => (
    <button
        className="glassmorphism-button focus:shadow-outline w-full rounded px-4 py-2 font-bold text-white hover:bg-purple-600 focus:outline-none"
        {...props}
    >
        {children}
    </button>
);

const Input = ({ ...props }) => (
    <input
        className="focus:shadow-outline w-full appearance-none rounded border bg-gray-700 px-3 py-2 leading-tight text-gray-200 shadow focus:outline-none"
        {...props}
    />
);

export default function Component({ socket }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            socket.emit('sendMessage', inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="glassmorphism mx-auto flex h-full w-full flex-col rounded-lg border border-gray-700 text-white shadow-lg">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-4 flex items-start space-x-4">
                        <Avatar username={msg.username} />
                        <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-400">
                {msg.username}
              </span>
                            <span className="mt-1 rounded-lg bg-gray-700 p-2 text-sm">
                {msg.message}
              </span>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="border-t border-gray-700 p-4">
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <div className="grow">
                        <Input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full rounded-md bg-gray-700 py-3 pl-3"
                        />
                    </div>
                    <div className="sm:w-24">
                        <Button type="submit">
                            <span className="text-base font-medium text-white">Send</span>
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
