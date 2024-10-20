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

const socket = io('http://localhost:5000');

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('join');
    const [sessionInfo, setSessionInfo] = useState(null);

    useEffect(() => {
        const savedSessionInfo = localStorage.getItem('sessionInfo');
        if (savedSessionInfo) {
            const parsedSessionInfo = JSON.parse(savedSessionInfo);
            setSessionInfo(parsedSessionInfo);
            socket.emit('joinSession', parsedSessionInfo);
        }

        socket.on('sessionJoined', ({ sessionId, initialData }) => {
            const newSessionInfo = { sessionId, ...initialData };
            setSessionInfo(newSessionInfo);
            localStorage.setItem('sessionInfo', JSON.stringify(newSessionInfo));
        });

        socket.on('sessionJoinError', (error) => {
            alert(error);
        });

        return () => {
            socket.off('sessionJoined');
            socket.off('sessionJoinError');
        };
    }, []);

    const handleJoinSession = () => {
        setModalMode('join');
        setIsModalOpen(true);
    };

    const handleCreateSession = () => {
        setModalMode('create');
        setIsModalOpen(true);
    };

    const handleSessionSubmit = (data) => {
        socket.emit(modalMode === 'join' ? 'joinSession' : 'createSession', data);
        setIsModalOpen(false);
    };

    const handleLeaveSession = () => {
        socket.emit('leaveSession');
        setSessionInfo(null);
        localStorage.removeItem('sessionInfo');
    };

    const handleSessionDetails = () => {
        setModalMode('details');
        setIsModalOpen(true);
    };

    return (
        <Router>
            <ScrollToTop />
            <div className="z-10 flex min-h-screen flex-col bg-gray-900 text-white">
                <Navbar
                    onJoinSession={handleJoinSession}
                    onCreateSession={handleCreateSession}
                    onSessionDetails={handleSessionDetails}
                    onLeaveSession={handleLeaveSession}
                    isSessionActive={!!sessionInfo}
                />
                <main className="grow">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home onJoinSession={handleJoinSession} />}
                        />
                        <Route
                            path="/draw"
                            element={(
                                <Draw
                                    onJoinSession={handleJoinSession}
                                    socket={socket}
                                    sessionInfo={sessionInfo}
                                />
                            )}
                        />
                        <Route
                            path="/code"
                            element={(
                                <Code
                                    onJoinSession={handleJoinSession}
                                    socket={socket}
                                    sessionInfo={sessionInfo}
                                />
                            )}
                        />
                        <Route
                            path="/text"
                            element={(
                                <Text
                                    onJoinSession={handleJoinSession}
                                    socket={socket}
                                    sessionInfo={sessionInfo}
                                />
                            )}
                        />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/features"
                            element={<Features onJoinSession={handleJoinSession} />}
                        />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/security" element={<Security />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/terms" element={<Terms />} />
                    </Routes>
                </main>
                <Footer />
                <SessionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSessionSubmit}
                    mode={modalMode}
                    sessionDetails={sessionInfo}
                />
            </div>
        </Router>
    );
};

export default App;
