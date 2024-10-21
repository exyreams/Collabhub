import React from 'react'; // Import React for component creation
import { motion } from 'framer-motion'; // Import motion for animations from Framer Motion
import { FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa'; // Import icons from react-icons
import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import exyreams from '../assets/exyreams.png'; // Import images for team members
import arxlyn from '../assets/arxlyn.png';
import cleren from '../assets/cleren.png';
import jergeon from '../assets/jergeon.png';

// Define an array of team members with their name, role, and image
const teamMembers = [
    { name: 'exyreams', role: 'CTO & Founder', image: exyreams },
    { name: 'arxlyn', role: 'CEO', image: arxlyn },
    { name: 'cleren', role: 'Head of Design', image: cleren },
    { name: 'jergeon', role: 'Lead Developer', image: jergeon },
];

// Define an array of company values with icons, titles, and descriptions
const values = [
    {
        icon: FaUsers, // Icon for collaboration
        title: 'Collaboration',
        description: 'We believe in the power of teamwork and shared knowledge.',
    },
    {
        icon: FaLightbulb, // Icon for innovation
        title: 'Innovation',
        description: "We constantly push the boundaries of what's possible.",
    },
    {
        icon: FaRocket, // Icon for excellence
        title: 'Excellence',
        description: 'We strive for excellence in everything we do.',
    },
];

// Main About component
export default function About() {
    return (
        <div className="relative min-h-screen text-white"> {/* Main wrapper with full screen height */}
            <main className="relative"> {/* Main content section */}
                <section className="py-20"> {/* First section with padding */}
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6"> {/* Container for responsive layout */}

                        {/* Motion div for animated heading and description */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }} // Initial animation state
                            animate={{ opacity: 1, y: 0 }} // Animation to full opacity and position
                            transition={{ duration: 0.5 }} // Animation duration
                        >
                            <h1 className="mb-6 text-5xl font-extrabold md:text-7xl">
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  About CollabHub {/* Title with gradient */}
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                We're on a mission to revolutionize the way teams collaborate
                                and create together. {/* Mission statement */}
                            </p>
                        </motion.div>

                        <div className="mb-20"> {/* Story section */}
                            <h2 className="mb-8 text-center text-3xl font-bold">Our Story</h2>
                            <p className="mx-auto max-w-3xl text-center text-gray-300">
                                Founded in 2024, CollabHub was born out of the need for better
                                collaboration tools in an increasingly remote world. Our
                                founders, Jane and John, experienced firsthand the challenges of
                                working across time zones and decided to create a solution that
                                would bring teams closer together, no matter where they are.
                                {/* Story of the company */}
                            </p>
                        </div>

                        <div className="mb-20"> {/* Team section */}
                            <h2 className="mb-8 text-center text-3xl font-bold">Our Team</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 sm:grid-cols-2">
                                {/* Mapping through team members array to display each member */}
                                {teamMembers.map((member, index) => (
                                    <motion.div
                                        key={member.name} // Key for unique identification
                                        className="text-center"
                                        initial={{ opacity: 0, y: 50 }} // Initial animation state for each member
                                        animate={{ opacity: 1, y: 0 }} // Animation to final state
                                        transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger animation by index
                                    >
                                        <img
                                            src={member.image} // Member image
                                            alt={member.name} // Image alt text for accessibility
                                            className="mx-auto mb-4 w-20 rounded-full" // Image styling
                                        />
                                        <h3 className="text-xl font-semibold">{member.name}</h3> {/* Member name */}
                                        <p className="text-gray-400">{member.role}</p> {/* Member role */}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div> {/* Values section */}
                            <h2 className="mb-8 text-center text-3xl font-bold">
                                Our Values
                            </h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3"> {/* Grid for values */}
                                {values.map((value, index) => (
                                    <motion.div
                                        key={value.title} // Key for each value
                                        className="glassmorphism rounded-xl p-6 text-center" // Styling for each value card
                                        initial={{ opacity: 0, y: 50 }} // Initial animation state
                                        animate={{ opacity: 1, y: 0 }} // Final animation state
                                        transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
                                    >
                                        <value.icon className="mx-auto mb-4 text-4xl text-indigo-400" /> {/* Value icon */}
                                        <h3 className="mb-2 text-xl font-semibold">
                                            {value.title} {/* Value title */}
                                        </h3>
                                        <p className="text-gray-300">{value.description}</p> {/* Value description */}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20"> {/* Join our team section */}
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <div className="text-center">
                            <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                                Join Our Team {/* Heading for team invitation */}
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                We're always looking for talented individuals to join our
                                mission. Check out our open positions and become part of
                                something great. {/* Invitation to view careers */}
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }} // Animation on hover
                                transition={{ type: 'spring', stiffness: 300 }} // Spring transition effect
                            >
                                <Link
                                    to="/careers" // Link to careers page
                                    className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    View Open Positions {/* Button to view job openings */}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
