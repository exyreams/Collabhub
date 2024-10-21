import React from 'react'; // Importing React library
import CodeEditor from '../components/CodeEditor'; // Importing CodeEditor component
import Chat from '../components/Chat'; // Importing Chat component

const Code = ({ socket, sessionInfo, onJoinSession }) => {
    // Check if sessionInfo is not available
    if (!sessionInfo) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-800/10 text-blue-600">
                <div className="glassmorphism w-full max-w-md rounded-lg p-8 text-center shadow-xl">
                    <h2 className="mb-4 text-3xl font-bold text-white">
                        Welcome to Collaborative Coding
                    </h2>
                    <p className="mb-6 text-gray-300">
                        Please join a session to start coding and chatting with others.
                    </p>
                    <button
                        onClick={onJoinSession} // Handle session joining
                        className="glassmorphism-button rounded-md px-3 py-2 text-sm transition-all duration-300 hover:scale-105 hover:bg-blue-600"
                    >
                        Join Session
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-1rem)] flex-col p-4 text-white md:flex-row">
            <div className="mb-2 flex h-full flex-col md:mb-0 md:w-[70%] md:pr-4">
                <div className="glassmorphism flex-1 overflow-hidden rounded-lg p-2">
                    <CodeEditor socket={socket} sessionInfo={sessionInfo} /> {/* Code editor component */}
                </div>
            </div>

            <div className="flex h-full flex-col md:w-[30%]">
                <h2 className="glassmorphism mb-2 py-4 text-center text-lg font-bold sm:text-base">
                    Live Chat
                </h2>
                <div className="flex-1 overflow-y-auto">
                    <Chat socket={socket} /> {/* Chat component */}
                </div>
            </div>
        </div>
    );
};

export default Code; // Exporting Code component
