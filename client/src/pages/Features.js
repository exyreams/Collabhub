import React from 'react';
import { motion } from 'framer-motion';
import {
    FaCloudUploadAlt,
    FaCode,
    FaKeyboard,
    FaLock,
    FaPencilAlt,
    FaUsers,
} from 'react-icons/fa';

const features = [
    {
        id: 1,
        title: 'Real-time Drawing',
        description: 'Collaborate on visual ideas with our interactive whiteboard.',
        icon: FaPencilAlt,
    },
    {
        id: 2,
        title: 'Live Coding',
        description:
            'Code together in real-time with syntax highlighting and auto-completion.',
        icon: FaCode,
    },
    {
        id: 3,
        title: 'Collaborative Writing',
        description: 'Write and edit documents simultaneously, like in Etherpad.',
        icon: FaKeyboard,
    },
    {
        id: 4,
        title: 'Team Management',
        description:
            'Easily manage your team and projects with our intuitive interface.',
        icon: FaUsers,
    },
    {
        id: 5,
        title: 'Advanced Security',
        description:
            'Your data is protected with state-of-the-art encryption and security measures.',
        icon: FaLock,
    },
    {
        id: 6,
        title: 'Cloud Integration',
        description: 'Seamlessly integrate with popular cloud storage services.',
        icon: FaCloudUploadAlt,
    },
];

export default function Features({ onJoinSession }) {
    return (
        <div className="relative min-h-screen text-white">
            <main className="relative">
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="mb-6 text-5xl font-extrabold md:text-7xl">
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Powerful Features for Seamless Collaboration
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                Discover how CollabHub can transform your team's workflow and
                                boost productivity.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 md:grid-cols-2">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.id}
                                    className="glassmorphism relative overflow-hidden rounded-xl p-8"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="mb-6 flex justify-center text-indigo-400">
                                        <feature.icon className="text-6xl" />
                                    </div>
                                    <h3 className="mb-4 text-center text-2xl font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-center text-gray-300">
                                        {feature.description}
                                    </p>
                                    <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-500 opacity-10" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <div className="text-center">
                            <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                                Ready to Experience CollabHub?
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                Join thousands of teams already using CollabHub to boost their
                                productivity and creativity.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <button
                                    onClick={onJoinSession}
                                    className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Get Started Now
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
