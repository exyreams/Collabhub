import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import SessionModal from './components/SessionModal';
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Code from './pages/Code';
import Contact from './pages/Contact';
import Draw from './pages/Draw';
import Features from './pages/Features';
import Home from './pages/Home';
import NotFound from './pages/404';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Security from './pages/Security';
import Support from './pages/Support';
import Terms from './pages/Terms';
import Text from './pages/Text';

const socket = io('http://localhost:5000'); // Establish socket connection

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [modalMode, setModalMode] = useState('join'); // State for modal mode (join/create)
    const [sessionInfo, setSessionInfo] = useState(null); // State for session info

    useEffect(() => {
        const savedSessionInfo = localStorage.getItem('sessionInfo'); // Retrieve session info from localStorage
        if (savedSessionInfo) {
            const parsedSessionInfo = JSON.parse(savedSessionInfo);
            setSessionInfo(parsedSessionInfo);
            socket.emit('joinSession', parsedSessionInfo); // Rejoin session on load if session exists
        }

        socket.on('sessionJoined', ({ sessionId, initialData }) => {
            const newSessionInfo = { sessionId, ...initialData };
            setSessionInfo(newSessionInfo); // Update session info on join
            localStorage.setItem('sessionInfo', JSON.stringify(newSessionInfo)); // Save session info to localStorage
        });

        socket.on('sessionJoinError', (error) => {
            alert(error); // Alert if there's a session join error
        });

        return () => {
            socket.off('sessionJoined'); // Cleanup on unmount
            socket.off('sessionJoinError'); // Cleanup on unmount
        };
    }, []);

    const handleJoinSession = () => {
        setModalMode('join'); // Set modal mode to "join"
        setIsModalOpen(true); // Open modal
    };

    const handleCreateSession = () => {
        setModalMode('create'); // Set modal mode to "create"
        setIsModalOpen(true); // Open modal
    };

    const handleSessionSubmit = (data) => {
        socket.emit(modalMode === 'join' ? 'joinSession' : 'createSession', data); // Emit join/create session event
        setIsModalOpen(false); // Close modal after submitting session details
    };

    const handleLeaveSession = () => {
        socket.emit('leaveSession'); // Emit leave session event
        setSessionInfo(null); // Clear session info
        localStorage.removeItem('sessionInfo'); // Remove session info from localStorage
    };

    const handleSessionDetails = () => {
        setModalMode('details'); // Set modal mode to "details"
        setIsModalOpen(true); // Open modal for session details
    };

    return (
        <Router>
            <ScrollToTop /> {/* Scroll to top on route change */}
            <div className="z-10 flex min-h-screen flex-col bg-gray-900 text-white">
                <Navbar
                    onJoinSession={handleJoinSession} // Join session handler
                    onCreateSession={handleCreateSession} // Create session handler
                    onSessionDetails={handleSessionDetails} // Session details handler
                    onLeaveSession={handleLeaveSession} // Leave session handler
                    isSessionActive={!!sessionInfo} // Determine if session is active
                />
                <main className="grow">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home onJoinSession={handleJoinSession} />} // Home page with join session action
                        />
                        <Route
                            path="/draw"
                            element={(
                                <Draw
                                    onJoinSession={handleJoinSession}
                                    socket={socket}
                                    sessionInfo={sessionInfo} // Pass session info to Draw page
                                />
                            )}
                        />
                        <Route
                            path="/code"
                            element={(
                                <Code
                                    onJoinSession={handleJoinSession}
                                    socket={socket}
                                    sessionInfo={sessionInfo} // Pass session info to Code page
                                />
                            )}
                        />
                        <Route
                            path="/text"
                            element={(
                                <Text
                                    onJoinSession={handleJoinSession}
                                    socket={socket}
                                    sessionInfo={sessionInfo} // Pass session info to Text page
                                />
                            )}
                        />
                        <Route path="*" element={<NotFound />} /> {/* 404 page */}
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/features"
                            element={<Features onJoinSession={handleJoinSession} />} // Features page with join session action
                        />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/security" element={<Security />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/terms" element={<Terms />} />
                    </Routes>
                </main>
                <Footer /> {/* Footer component */}
                <SessionModal
                    isOpen={isModalOpen} // Modal visibility state
                    onClose={() => setIsModalOpen(false)} // Modal close handler
                    onSubmit={handleSessionSubmit} // Modal submit handler
                    mode={modalMode} // Modal mode (join/create/details)
                    sessionDetails={sessionInfo} // Session details for modal
                />
            </div>
        </Router>
    );
};

export default App;
