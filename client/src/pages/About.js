import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import exyreams from '../assets/exyreams.png';
import arxlyn from '../assets/arxlyn.png';
import cleren from '../assets/cleren.png';
import jergeon from '../assets/jergeon.png';

const teamMembers = [
    { name: 'exyreams', role: 'CTO & Founder', image: exyreams },
    { name: 'arxlyn', role: 'CEO', image: arxlyn },
    { name: 'cleren', role: 'Head of Design', image: cleren },
    { name: 'jergeon', role: 'Lead Developer', image: jergeon },
];

const values = [
    {
        icon: FaUsers,
        title: 'Collaboration',
        description: 'We believe in the power of teamwork and shared knowledge.',
    },
    {
        icon: FaLightbulb,
        title: 'Innovation',
        description: "We constantly push the boundaries of what's possible.",
    },
    {
        icon: FaRocket,
        title: 'Excellence',
        description: 'We strive for excellence in everything we do.',
    },
];

export default function About() {
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
                  About CollabHub
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                We're on a mission to revolutionize the way teams collaborate
                                and create together.
                            </p>
                        </motion.div>

                        <div className="mb-20">
                            <h2 className="mb-8 text-center text-3xl font-bold">Our Story</h2>
                            <p className="mx-auto max-w-3xl text-center text-gray-300">
                                Founded in 2024, CollabHub was born out of the need for better
                                collaboration tools in an increasingly remote world. Our
                                founders, Jane and John, experienced firsthand the challenges of
                                working across time zones and decided to create a solution that
                                would bring teams closer together, no matter where they are.
                            </p>
                        </div>

                        <div className="mb-20">
                            <h2 className="mb-8 text-center text-3xl font-bold">Our Team</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 sm:grid-cols-2">
                                {teamMembers.map((member, index) => (
                                    <motion.div
                                        key={member.name}
                                        className="text-center"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="mx-auto mb-4 w-20 rounded-full"
                                        />
                                        <h3 className="text-xl font-semibold">{member.name}</h3>
                                        <p className="text-gray-400">{member.role}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-8 text-center text-3xl font-bold">
                                Our Values
                            </h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        className="glassmorphism rounded-xl p-6 text-center"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <value.icon className="mx-auto mb-4 text-4xl text-indigo-400" />
                                        <h3 className="mb-2 text-xl font-semibold">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-300">{value.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <div className="text-center">
                            <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                                Join Our Team
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                We're always looking for talented individuals to join our
                                mission. Check out our open positions and become part of
                                something great.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link
                                    to="/careers"
                                    className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    View Open Positions
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
