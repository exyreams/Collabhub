import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen items-center justify-center text-white">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaExclamationTriangle className="mx-auto mb-6 text-8xl text-yellow-400" />
                    <h1 className="mb-6 text-5xl font-extrabold md:text-7xl">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              404
            </span>
                    </h1>
                    <p className="mb-8 text-2xl font-semibold">Oops! Page not found</p>
                    <p className="mb-12 text-xl text-gray-300">
                        The page you are looking for might have been removed, had its name
                        changed, or is temporarily unavailable.
                    </p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <Link
                        to="/"
                        className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                    >
                        Go Back Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
