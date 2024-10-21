import React from 'react';
import { motion } from 'framer-motion';
import {
    FaCertificate,
    FaCloudDownloadAlt,
    FaLock,
    FaServer,
    FaShieldAlt,
    FaUserSecret,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Array of Mock Security Features
const securityFeatures = [
    {
        icon: FaShieldAlt,
        title: 'End-to-End Encryption',
        description:
            'Your data is encrypted in transit and at rest, ensuring maximum security.',
    },
    {
        icon: FaLock,
        title: 'Multi-Factor Authentication',
        description: 'Add an extra layer of security to your account with 2FA.',
    },
    {
        icon: FaUserSecret,
        title: 'Privacy Controls',
        description:
            'Granular privacy settings give you full control over your data.',
    },
    {
        icon: FaServer,
        title: 'Secure Infrastructure',
        description:
            'Our servers are protected by industry-leading security measures.',
    },
    {
        icon: FaCloudDownloadAlt,
        title: 'Regular Backups',
        description: 'Your data is backed up regularly to prevent loss.',
    },
    {
        icon: FaCertificate,
        title: 'Compliance',
        description:
            'We adhere to GDPR, CCPA, and other global privacy regulations.',
    },
];

export default function Security() {
    return (
        <div className="relative min-h-screen text-white">
            <main className="relative">
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        {/*Hero Section*/}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="mb-6 text-5xl font-extrabold md:text-7xl">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                              Your Security is Our Top Priority
                            </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                At CollabHub, we implement state-of-the-art security measures to
                                protect your data and privacy.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                            {securityFeatures.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
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
                                Our Commitment to Your Security
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                We continuously update our security measures to stay ahead of
                                potential threats. Your trust is important to us.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link
                                    to="/contact"
                                    className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Contact Our Security Team
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
