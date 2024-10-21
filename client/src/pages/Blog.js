import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importing motion for animations
import { FaCalendar, FaTags, FaUser } from 'react-icons/fa'; // Importing icons
import Notification from '../components/Notification'; // Importing Notification component
import future from '../assets/future.jpg'; // Importing blog post images
import productivity from '../assets/productivity.jpg';
import securitypractices from '../assets/securitypractices.jpg';
import collabimportance from '../assets/collabimportance.jpg';

// Defining the blog posts data
const blogPosts = [
    {
        id: 1,
        title: 'The Future of Remote Collaboration', // Blog post title
        excerpt:
            'Explore how emerging technologies are shaping the way teams work together across distances.', // Blog post excerpt
        author: 'Jane Doe', // Author name
        date: 'May 15, 2024', // Blog post date
        tags: ['Remote Work', 'Technology'], // Tags related to the post
        image: future, // Blog post image
    },
    {
        id: 2,
        title: 'Maximizing Productivity with CollabHub', // Blog post title
        excerpt:
            "Learn how to leverage CollabHub's features to boost your team's efficiency and output.", // Blog post excerpt
        author: 'John Smith', // Author name
        date: 'April 28, 2024', // Blog post date
        tags: ['Productivity', 'Tutorial'], // Tags related to the post
        image: productivity, // Blog post image
    },
    {
        id: 3,
        title: 'The Importance of Real-Time Collaboration in Design', // Blog post title
        excerpt:
            'Discover why real-time collaboration is crucial for modern design teams and how to implement it effectively.', // Blog post excerpt
        author: 'Alice Johnson', // Author name
        date: 'April 10, 2024', // Blog post date
        tags: ['Design', 'Collaboration'], // Tags related to the post
        image: collabimportance, // Blog post image
    },
    {
        id: 4,
        title: 'Security Best Practices for Remote Teams', // Blog post title
        excerpt:
            "Ensure your team's work remains secure with these essential security practices for remote collaboration.", // Blog post excerpt
        author: 'Bob Williams', // Author name
        date: 'March 22, 2024', // Blog post date
        tags: ['Security', 'Remote Work'], // Tags related to the post
        image: securitypractices, // Blog post image
    },
];

// Blog component that displays the posts and newsletter subscription form
export default function Blog() {
    const [email, setEmail] = useState(''); // State for handling email input
    const [notification, setNotification] = useState({ message: '', type: '' }); // State for handling notification messages

    // Function to handle email subscription form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        if (email) {
            // Simulate sending email to server
            console.log('Subscribing email:', email);
            setNotification({ message: 'Successfully subscribed!', type: 'success' }); // Show success notification
            setEmail(''); // Reset email input
        } else {
            setNotification({ message: 'Please enter a valid email', type: 'error' }); // Show error notification
        }
    };

    return (
        <div className="relative min-h-screen text-white">
            <main className="relative">
                {/* Blog header section */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }} // Initial animation values
                            animate={{ opacity: 1, y: 0 }} // Final animation values
                            transition={{ duration: 0.5 }} // Animation duration
                        >
                            <h1 className="mb-6 text-5xl font-extrabold md:text-7xl">
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  CollabHub Blog
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                Insights, tips, and news about collaboration, productivity, and
                                the future of work.
                            </p>
                        </motion.div>

                        {/* Blog posts section */}
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                            {blogPosts.map((post, index) => (
                                <motion.article
                                    key={post.id} // Unique key for each post
                                    className="glassmorphism overflow-hidden rounded-xl" // Custom styling
                                    initial={{ opacity: 0, y: 50 }} // Initial animation values
                                    animate={{ opacity: 1, y: 0 }} // Final animation values
                                    transition={{ duration: 0.5, delay: index * 0.1 }} // Delayed animation based on index
                                >
                                    <img
                                        src={post.image} // Blog post image
                                        alt={post.title} // Image alt text
                                        className="h-48 w-full object-cover" // Styling for the image
                                    />
                                    <div className="p-6">
                                        <h2 className="mb-2 text-2xl font-bold">
                                            <button
                                                className="transition-colors hover:text-indigo-400" // Button hover effect
                                                onClick={() => console.log(`Clicked on ${post.title}`)} // Log post title on click
                                            >
                                                {post.title} {/* Display post title */}
                                            </button>
                                        </h2>
                                        <p className="mb-4 text-gray-300">{post.excerpt}</p> {/* Display post excerpt */}
                                        <div className="flex flex-wrap items-center text-sm text-gray-400">
                      <span className="mr-4 flex items-center">
                        <FaUser className="mr-1" /> {post.author} {/* Display post author */}
                      </span>
                                            <span className="mr-4 flex items-center">
                        <FaCalendar className="mr-1" /> {post.date} {/* Display post date */}
                      </span>
                                            <span className="flex items-center">
                        <FaTags className="mr-1" /> {post.tags.join(', ')} {/* Display post tags */}
                      </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter subscription section */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <div className="text-center">
                            <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                                Stay Updated
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                Subscribe to our newsletter to receive the latest blog posts,
                                tips, and CollabHub updates directly in your inbox.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }} // Animation on hover
                                transition={{ type: 'spring', stiffness: 300 }} // Transition properties
                            >
                                {/* Form for email subscription */}
                                <form
                                    onSubmit={handleSubmit} // Handle form submission
                                    className="mx-auto flex max-w-md flex-col sm:flex-row"
                                >
                                    <input
                                        type="email"
                                        placeholder="Enter your email" // Placeholder text
                                        value={email} // Bind email state
                                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                                        className="mb-2 w-full rounded-md bg-gray-700 px-4 py-2 text-white placeholder:text-gray-400 sm:mb-0 sm:mr-2"
                                        aria-label="Email for newsletter" // Accessibility label
                                        required // Mark input as required
                                    />
                                    <button
                                        type="submit" // Submit button
                                        className="glassmorphism-button rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Notification component for showing success or error messages */}
            {notification.message && (
                <Notification
                    message={notification.message} // Notification message
                    type={notification.type} // Notification type (success or error)
                    onClose={() => setNotification({ message: '', type: '' })} // Clear notification on close
                />
            )}
        </div>
    );
}
