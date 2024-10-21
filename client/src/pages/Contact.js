import React, { useState } from 'react'; // Importing React and useState hook
import { motion } from 'framer-motion'; // Importing motion for animations
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'; // Importing icons for contact information
import Notification from '../components/Notification'; // Importing Notification component

export default function ContactUs() {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // State to control notification visibility and content
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: '',
    });

    // Handler for input field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
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

    // Handler to close the notification
    const handleCloseNotification = () => {
        setNotification({ show: false, message: '', type: '' });
    };

    return (
        <div className="relative min-h-screen text-white"> {/* Main container with relative positioning and text color */}
            <main className="relative"> {/* Main content area */}
                <section className="py-20"> {/* Section with padding */}
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6"> {/* Centered container */}
                        <motion.div
                            className="text-center" // Centering text
                            initial={{ opacity: 0, y: -20 }} // Initial animation state
                            animate={{ opacity: 1, y: 0 }} // Animation when component mounts
                            transition={{ duration: 0.5 }} // Animation duration
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

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2"> {/* Responsive grid layout */}
                            <motion.div
                                className="glassmorphism rounded-xl p-8" // Styled container for the form
                                initial={{ opacity: 0, x: -50 }} // Initial animation state
                                animate={{ opacity: 1, x: 0 }} // Animation when component mounts
                                transition={{ duration: 0.5 }} // Animation duration
                            >
                                <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
                                <form onSubmit={handleSubmit}> {/* Form submission handler */}
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
                                            required // Required field
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
                                            required // Required field
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
                                            required // Required field
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
                                            required // Required field
                                            rows="4"
                                            className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <motion.button
                                        type="submit" // Submit button
                                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        whileHover={{ scale: 1.05 }} // Scale on hover
                                        whileTap={{ scale: 0.95 }} // Scale down on tap
                                    >
                                        Send Message
                                    </motion.button>
                                </form>
                            </motion.div>

                            <motion.div
                                className="glassmorphism rounded-xl p-8" // Styled container for contact information
                                initial={{ opacity: 0, x: 50 }} // Initial animation state
                                animate={{ opacity: 1, x: 0 }} // Animation when component mounts
                                transition={{ duration: 0.5 }} // Animation duration
                            >
                                <h2 className="mb-6 text-2xl font-semibold">
                                    Contact Information
                                </h2>
                                <div className="space-y-4"> {/* Spacing between contact details */}
                                    <p className="flex items-center">
                                        <FaEnvelope className="mr-2 text-indigo-400" /> {/* Email icon */}
                                        support@collabhub.com
                                    </p>
                                    <p className="flex items-center">
                                        <FaPhone className="mr-2 text-indigo-400" /> {/* Phone icon */}
                                        +1 (555) 123-4567
                                    </p>
                                    <p className="flex items-center">
                                        <FaMapMarkerAlt className="mr-2 text-indigo-400" /> {/* Location icon */}
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
            {notification.show && ( // Conditional rendering of notification
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={handleCloseNotification} // Close notification handler
                />
            )}
        </div>
    );
}
