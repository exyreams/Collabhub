import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const jobOpenings = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
    },
    {
        id: 2,
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'San Francisco, CA',
        type: 'Full-time',
    },
    {
        id: 3,
        title: 'DevOps Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
    },
    {
        id: 4,
        title: 'Product Manager',
        department: 'Product',
        location: 'New York, NY',
        type: 'Full-time',
    },
    {
        id: 5,
        title: 'Customer Success Specialist',
        department: 'Customer Support',
        location: 'Remote',
        type: 'Full-time',
    },
];

const benefits = [
    'Competitive salary and equity',
    'Health, dental, and vision insurance',
    'Flexible work hours and location',
    'Unlimited PTO',
    'Professional development budget',
    'Home office stipend',
    'Regular team retreats',
    '401(k) matching',
];

export default function Careers() {
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
                  Join Our Team
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                Help us shape the future of collaboration and make a meaningful
                                impact on how teams work together.
                            </p>
                        </motion.div>

                        <div className="mb-20">
                            <h2 className="mb-8 text-center text-3xl font-bold">
                                Open Positions
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                {jobOpenings.map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        className="glassmorphism rounded-xl p-6"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <h3 className="mb-2 text-xl font-semibold">{job.title}</h3>
                                        <div className="mb-4 flex flex-wrap text-sm text-gray-400">
                      <span className="mr-4 flex items-center">
                        <FaBriefcase className="mr-1" /> {job.department}
                      </span>
                                            <span className="mr-4 flex items-center">
                        <FaMapMarkerAlt className="mr-1" /> {job.location}
                      </span>
                                            <span className="flex items-center">
                        <FaClock className="mr-1" /> {job.type}
                      </span>
                                        </div>
                                        <p className="inline-block cursor-not-allowed rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-700">
                                            Learn More
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-8 text-center text-3xl font-bold">
                                Why Work at CollabHub?
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="mb-4 text-xl font-semibold">Our Mission</h3>
                                    <p className="text-gray-300">
                                        At CollabHub, we're on a mission to revolutionize the way
                                        teams collaborate and create together. We believe that great
                                        ideas can come from anywhere, and we're building the tools
                                        to make that possible.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="mb-4 text-xl font-semibold">Our Culture</h3>
                                    <p className="text-gray-300">
                                        We foster a culture of innovation, inclusivity, and
                                        continuous learning. Our team is passionate about solving
                                        complex problems and making a positive impact on the world
                                        of work.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="mb-4 text-xl font-semibold">Benefits</h3>
                            <ul className="grid gap-2 md:grid-cols-2">
                                {benefits.map((benefit, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-center"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <svg
                                            className="mr-2 h-5 w-5 text-green-400"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                        {benefit}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <div className="text-center">
                            <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                                Don't See a Perfect Fit?
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                We're always on the lookout for talented individuals. If you're
                                passionate about our mission, we'd love to hear from you!
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link
                                    to="/contact"
                                    className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Get in Touch
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
