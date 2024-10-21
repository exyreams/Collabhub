import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaBars,
    FaCode,
    FaKeyboard,
    FaPencilAlt,
    FaTimes,
} from 'react-icons/fa';
import { Loader, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

// Navbar_Header Component
export default function Navbar({
                                   onJoinSession,
                                   onCreateSession,
                                   onSessionDetails,
                                   onLeaveSession,
                                   isSessionActive,
                                   isLoading,
                               }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const NavLink = ({ to, icon, children }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`text-md flex items-center rounded-md px-3 py-2 font-medium transition duration-150 ease-in-out ${
                    isActive
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
                {icon}
                <span className="ml-2">{children}</span>
            </Link>
        );
    };

    const SessionButton = ({ onClick, children, className }) => (
        <button
            onClick={onClick}
            className={`glassmorphism-button rounded-md px-3 py-2 text-sm transition-all duration-300 hover:scale-105 ${className}`}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader className="mr-2 inline-block h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );

    return (
        <nav className="glassmorphism m-4 text-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex shrink-0 items-center">
                            <img className="h-8 w-8" src={logo} alt="CollabHub" />
                            <p className="ml-2 text-2xl font-semibold">
                                Collab<span className="font-bold text-purple-400">Hub</span>
                            </p>
                        </Link>
                    </div>
                    <div className="hidden md:flex md:flex-1 md:justify-center md:space-x-2">
                        <NavLink to="/code" icon={<FaCode className="mr-2" />}>
                            Code
                        </NavLink>
                        <NavLink to="/draw" icon={<FaPencilAlt className="mr-2" />}>
                            Draw
                        </NavLink>
                        <NavLink to="/text" icon={<FaKeyboard className="mr-2" />}>
                            Text
                        </NavLink>
                    </div>
                    <div className="hidden md:flex md:space-x-4">
                        {isSessionActive ? (
                            <>
                                <SessionButton
                                    onClick={onSessionDetails}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Session Details
                                </SessionButton>
                                <SessionButton
                                    onClick={onLeaveSession}
                                    className="bg-red-500 hover:bg-red-600"
                                >
                                    <LogOut size={20} />
                                </SessionButton>
                            </>
                        ) : (
                            <>
                                <SessionButton
                                    onClick={onJoinSession}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Join Session
                                </SessionButton>
                                <SessionButton
                                    onClick={onCreateSession}
                                    className="bg-purple-500 hover:bg-purple-600"
                                >
                                    Create Session
                                </SessionButton>
                            </>
                        )}
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <FaBars className="block h-6 w-6" />
                            ) : (
                                <FaTimes className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <NavLink to="/code" icon={<FaCode className="mr-2" />}>
                        Code
                    </NavLink>
                    <NavLink to="/draw" icon={<FaPencilAlt className="mr-2" />}>
                        Draw
                    </NavLink>
                    <NavLink to="/text" icon={<FaKeyboard className="mr-2" />}>
                        Text
                    </NavLink>
                    {isSessionActive ? (
                        <>
                            <SessionButton
                                onClick={onSessionDetails}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                            >
                                Session Details
                            </SessionButton>
                            <SessionButton
                                onClick={onLeaveSession}
                                className="w-full bg-red-500 hover:bg-red-600"
                            >
                                Leave Session
                            </SessionButton>
                        </>
                    ) : (
                        <>
                            <SessionButton
                                onClick={onJoinSession}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                            >
                                Join Session
                            </SessionButton>
                            <SessionButton
                                onClick={onCreateSession}
                                className="w-full bg-purple-500 hover:bg-purple-600"
                            >
                                Create Session
                            </SessionButton>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
