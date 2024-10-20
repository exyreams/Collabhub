import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaTags, FaUser } from 'react-icons/fa';
import Notification from '../components/Notification';
import future from '../assets/future.jpg';
import productivity from '../assets/productivity.jpg';
import securitypractices from '../assets/securitypractices.jpg';
import collabimportance from '../assets/collabimportance.jpg';

const blogPosts = [
    {
        id: 1,
        title: 'The Future of Remote Collaboration',
        excerpt:
            'Explore how emerging technologies are shaping the way teams work together across distances.',
        author: 'Jane Doe',
        date: 'May 15, 2024',
        tags: ['Remote Work', 'Technology'],
        image: future,
    },
    {
        id: 2,
        title: 'Maximizing Productivity with CollabHub',
        excerpt:
            "Learn how to leverage CollabHub's features to boost your team's efficiency and output.",
        author: 'John Smith',
        date: 'April 28, 2024',
        tags: ['Productivity', 'Tutorial'],
        image: productivity,
    },
    {
        id: 3,
        title: 'The Importance of Real-Time Collaboration in Design',
        excerpt:
            'Discover why real-time collaboration is crucial for modern design teams and how to implement it effectively.',
        author: 'Alice Johnson',
        date: 'April 10, 2024',
        tags: ['Design', 'Collaboration'],
        image: collabimportance,
    },
    {
        id: 4,
        title: 'Security Best Practices for Remote Teams',
        excerpt:
            "Ensure your team's work remains secure with these essential security practices for remote collaboration.",
        author: 'Bob Williams',
        date: 'March 22, 2024',
        tags: ['Security', 'Remote Work'],
        image: securitypractices,
    },
];

export default function Blog() {
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Here you would typically send the email to your server
            console.log('Subscribing email:', email);
            setNotification({ message: 'Successfully subscribed!', type: 'success' });
            setEmail('');
        } else {
            setNotification({ message: 'Please enter a valid email', type: 'error' });
        }
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
                  CollabHub Blog
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                Insights, tips, and news about collaboration, productivity, and
                                the future of work.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                            {blogPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    className="glassmorphism overflow-hidden rounded-xl"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-48 w-full object-cover"
                                    />
                                    <div className="p-6">
                                        <h2 className="mb-2 text-2xl font-bold">
                                            <button
                                                className="transition-colors hover:text-indigo-400"
                                                onClick={() => console.log(`Clicked on ${post.title}`)}
                                            >
                                                {post.title}
                                            </button>
                                        </h2>
                                        <p className="mb-4 text-gray-300">{post.excerpt}</p>
                                        <div className="flex flex-wrap items-center text-sm text-gray-400">
                      <span className="mr-4 flex items-center">
                        <FaUser className="mr-1" /> {post.author}
                      </span>
                                            <span className="mr-4 flex items-center">
                        <FaCalendar className="mr-1" /> {post.date}
                      </span>
                                            <span className="flex items-center">
                        <FaTags className="mr-1" /> {post.tags.join(', ')}
                      </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

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
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <form
                                    onSubmit={handleSubmit}
                                    className="mx-auto flex max-w-md flex-col sm:flex-row"
                                >
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mb-2 w-full rounded-md bg-gray-700 px-4 py-2 text-white placeholder:text-gray-400 sm:mb-0 sm:mr-2"
                                        aria-label="Email for newsletter"
                                        required
                                    />
                                    <button
                                        type="submit"
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
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}
        </div>
    );
}
