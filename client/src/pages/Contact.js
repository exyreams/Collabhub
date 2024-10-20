import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Notification from '../components/Notification';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        // Show success notification
        setNotification({
            show: true,
            message: 'Message sent Received!',
            type: 'success',
        });
        // Reset form after submission
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleCloseNotification = () => {
        setNotification({ show: false, message: '', type: '' });
    };

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
                  Contact Us
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                We're here to help. Reach out to us for any questions or
                                concerns.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <motion.div
                                className="glassmorphism rounded-xl p-8"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-medium"
                                        >
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-medium"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Send Message
                                    </motion.button>
                                </form>
                            </motion.div>

                            <motion.div
                                className="glassmorphism rounded-xl p-8"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="mb-6 text-2xl font-semibold">
                                    Contact Information
                                </h2>
                                <div className="space-y-4">
                                    <p className="flex items-center">
                                        <FaEnvelope className="mr-2 text-indigo-400" />
                                        support@collabhub.com
                                    </p>
                                    <p className="flex items-center">
                                        <FaPhone className="mr-2 text-indigo-400" />
                                        +1 (555) 123-4567
                                    </p>
                                    <p className="flex items-center">
                                        <FaMapMarkerAlt className="mr-2 text-indigo-400" />
                                        123 Collaboration St, Tech City, TC 12345
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <h3 className="mb-4 text-xl font-semibold">Office Hours</h3>
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                                    <p>Saturday - Sunday: Closed</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={handleCloseNotification}
                />
            )}
        </div>
    );
}
