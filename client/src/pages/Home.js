import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaChevronDown,
    FaChevronUp,
    FaCode,
    FaKeyboard,
    FaLightbulb,
    FaPencilAlt,
    FaPuzzlePiece,
    FaRocket,
    FaUsers,
} from 'react-icons/fa';
import cyberdynamics from '../assets/cyberdynamics.png';
import innovativeai from '../assets/innovativeai.png';
import nexuscorp from '../assets/nexuscorp.png';
import quantsystems from '../assets/quantsystems.png';
import synergysolutions from '../assets/synergysolutions.png';
import technova from '../assets/technova.png';

const features = [
    {
        id: 1,
        title: 'Real-time Drawing',
        description: 'Collaborate on visual ideas with our interactive whiteboard.',
        icon: FaPencilAlt,
    },
    {
        id: 2,
        title: 'Live Coding',
        description:
            'Code together in real-time with syntax highlighting and auto-completion.',
        icon: FaCode,
    },
    {
        id: 3,
        title: 'Collaborative Writing',
        description: 'Write and edit documents simultaneously, like in Etherpad.',
        icon: FaKeyboard,
    },
];

const companies = [
    { id: 1, name: 'TechNova', logo: technova },
    { id: 2, name: 'Quantum Systems', logo: quantsystems },
    { id: 3, name: 'Nexus Corp', logo: nexuscorp },
    { id: 4, name: 'Synergy Solutions', logo: synergysolutions },
    { id: 5, name: 'Innovate AI', logo: innovativeai },
    { id: 6, name: 'Cyber Dynamics', logo: cyberdynamics },
];

const testimonials = [
    {
        id: 1,
        name: 'John Doe',
        role: 'CTO at TechCorp',
        content:
            "CollabHub has revolutionized our team's workflow. It's an indispensable tool for our daily operations.",
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'Product Manager at InnovateTech',
        content:
            'The real-time collaboration features have significantly improved our productivity and creativity.',
    },
    {
        id: 3,
        name: 'Mike Johnson',
        role: 'Lead Developer at CodeMasters',
        content:
            'As a remote team, CollabHub has been a game-changer for our collaborative coding sessions.',
    },
    {
        id: 4,
        name: 'Emily Davis',
        role: 'UX Designer at PixelPerfect',
        content:
            'CollabHub has made cross-functional collaboration seamless and has enhanced our design feedback process.',
    },
    {
        id: 5,
        name: 'Carlos Rodriguez',
        role: 'Marketing Director at BrandBuilders',
        content:
            'Thanks to CollabHub, our marketing team can easily align with other departments. It has streamlined our campaigns.',
    },
    {
        id: 6,
        name: 'Samantha Lee',
        role: 'CEO at Visionary Ventures',
        content:
            'CollabHub has empowered our entire organization to work more efficiently, regardless of location. A must-have tool!',
    },
];

const faqs = [
    {
        id: 1,
        question: 'Is CollabHub really free for individuals and students?',
        answer:
            'Yes, CollabHub is completely free for individual users and students. We believe in empowering creativity and collaboration at all levels.',
    },
    {
        id: 2,
        question: 'How does pricing work for institutions?',
        answer:
            'For institutions, we offer custom pricing based on the size of your organization and specific needs. Please contact our sales team for a tailored quote.',
    },
    {
        id: 3,
        question: 'Can I use CollabHub with my existing tools?',
        answer:
            "Yes, CollabHub integrates seamlessly with many popular tools and platforms. We're constantly expanding our integration options.",
    },
    {
        id: 4,
        question: 'Is my data secure with CollabHub?',
        answer:
            'Absolutely. We use industry-standard encryption and security measures to protect your data. Your privacy and security are our top priorities.',
    },
    {
        id: 5,
        question: 'How many people can collaborate on a project simultaneously?',
        answer:
            "There's no limit to the number of collaborators on a project. Whether you're working in a small team or a large organization, CollabHub scales to meet your needs.",
    },
    {
        id: 6,
        question: 'Do you offer training or onboarding for new users?',
        answer:
            'Yes, we provide comprehensive documentation, video tutorials, and webinars to help new users get started. For institutions, we also offer personalized onboarding sessions.',
    },
];

const innovationSteps = [
    { icon: FaRocket, text: 'Launch Your Ideas' },
    { icon: FaPuzzlePiece, text: 'Collaborate Seamlessly' },
    { icon: FaLightbulb, text: 'Innovate Together' },
    { icon: FaUsers, text: 'Grow Your Team' },
];

export default function Home({ onJoinSession }) {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="relative min-h-screen text-white">
            <main className="relative">
                <section className="relative overflow-hidden py-20">
                    <div className="relative mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="relative mb-6 text-5xl font-extrabold md:text-7xl">
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Elevate Your Team's Collaboration
                </span>
                            </h1>
                            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                Experience the future of teamwork with our cutting-edge
                                platform. Draw, code, and write together in real-time.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={onJoinSession}
                                    className="glassmorphism-button rounded-full bg-blue-600 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
                                >
                                    Get Started
                                </button>
                                <Link
                                    to="/demo"
                                    className="glassmorphism-button rounded-full bg-purple-600 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:bg-purple-700"
                                >
                                    Watch Demo
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <h2 className="mb-12 text-center text-3xl font-extrabold">
                            Trusted by Innovative Companies
                        </h2>
                        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 md:grid-cols-3">
                            {companies.map((company) => (
                                <motion.div
                                    key={company.id}
                                    className="glassmorphism flex items-center justify-center rounded-lg p-4"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <img
                                        src={company.logo}
                                        alt={company.name}
                                        className="h-16 w-auto"
                                    />
                                    <span className="ml-2 text-sm">{company.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="features" className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <h2 className="mb-16 text-center text-4xl font-extrabold">
                            Powerful Features for Seamless Collaboration
                        </h2>
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.id}
                                    className="glassmorphism relative overflow-hidden rounded-xl p-8"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
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
                                    <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-500 opacity-10" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <h2 className="mb-16 text-center text-4xl font-extrabold">
                            What Our Users Say
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    className="glassmorphism rounded-xl p-6"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <p className="mb-4 text-gray-300">"{testimonial.content}"</p>
                                    <div className="flex items-center">
                                        <div className="mr-4 h-12 w-12 rounded-full bg-indigo-500" />
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-gray-400">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="innovation-cycle" className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <h2 className="mb-16 text-center text-4xl font-extrabold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                The CollabHub Innovation Cycle
              </span>
                        </h2>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin-slow h-64 w-64 rounded-full border-4 border-dashed border-indigo-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                                {innovationSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        className="glassmorphism relative z-10 flex flex-col items-center justify-center rounded-xl p-6"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <step.icon className="mb-4 text-4xl text-indigo-400" />
                                        <p className="text-center font-semibold">{step.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-16 text-center">
                            <button
                                onClick={onJoinSession}
                                className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                            >
                                Start Your Innovation Journey
                            </button>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <h2 className="mb-16 text-center text-4xl font-extrabold">
                            Frequently Asked Questions
                        </h2>
                        <div className="mx-auto max-w-3xl space-y-4">
                            {faqs.map((faq) => (
                                <motion.div
                                    key={faq.id}
                                    className="glassmorphism overflow-hidden rounded-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <button
                                        className="flex w-full items-center justify-between p-4 text-left"
                                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                    >
                    <span className="text-xl font-semibold">
                      {faq.question}
                    </span>
                                        {openFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === faq.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <p className="p-4 text-gray-300">{faq.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 text-center lg:px-8 sm:px-6">
                        <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                            Ready to Transform Your Team's Collaboration?
                        </h2>
                        <p className="mx-auto mb-12 max-w-3xl text-xl">
                            Join thousands of teams already using CollabHub to boost their
                            productivity and creativity.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <button
                                onClick={onJoinSession}
                                className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                            >
                                Get Started Now
                            </button>
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}
