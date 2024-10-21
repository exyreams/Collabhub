import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaBook,
    FaComments,
    FaHeadset,
    FaQuestionCircle,
} from 'react-icons/fa';

const supportOptions = [
    {
        icon: FaHeadset,
        title: 'Live Support',
        description: 'Get real-time assistance from our expert team',
        link: '/live-support',
    },
    {
        icon: FaComments,
        title: 'Community Forum',
        description: 'Connect with other users and share knowledge',
        link: '/community',
    },
    {
        icon: FaBook,
        title: 'Knowledge Base',
        description: 'Find answers in our comprehensive documentation',
        link: '/knowledge-base',
    },
    {
        icon: FaQuestionCircle,
        title: 'FAQs',
        description: 'Quick answers to common questions',
        link: '/faqs',
    },
];

export default function CustomerSupport() {
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
                  Customer Support
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                We're here to help you make the most of CollabHub. Choose from
                                our range of support options below.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
                            {supportOptions.map((option, index) => (
                                <motion.div
                                    key={option.title}
                                    className="glassmorphism rounded-xl p-6 text-center"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <option.icon className="mx-auto mb-4 text-4xl text-indigo-400" />
                                    <h3 className="mb-2 text-xl font-semibold">{option.title}</h3>
                                    <p className="mb-4 text-gray-300">{option.description}</p>
                                    <Link
                                        to={option.link}
                                        className="inline-block rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-700"
                                    >
                                        Learn More
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/*Contact Us Section*/}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <div className="text-center">
                            <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                                Need More Help?
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                Our dedicated support team is always ready to assist you with
                                any questions or issues you may have.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link
                                    to="/contact"
                                    className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Contact Support
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
