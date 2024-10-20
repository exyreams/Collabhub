import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: '/mo',
        features: [
            'All features included',
            'Unlimited collaborators',
            'Basic support',
            'Perfect for individuals and students',
        ],
        cta: 'Get Started',
        ctaLink: '/signup',
    },
    {
        name: 'Pro',
        price: '$19',
        period: '/mo',
        features: [
            'All Free features',
            'Advanced team management',
            'Priority support',
            'Custom integrations',
            'Advanced analytics',
        ],
        cta: 'Start Free Trial',
        ctaLink: '/trial',
        highlight: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        features: [
            'All Pro features',
            'Dedicated account manager',
            'On-premise deployment option',
            'Custom SLA',
            'Advanced security features',
        ],
        cta: 'Contact Sales',
        ctaLink: '/contact',
    },
];

const faqs = [
    {
        id: 1,
        question: "What's included in the Free plan?",
        answer:
            "Our Free plan includes all core features, unlimited collaborators, and basic support. It's perfect for individuals, students, and small teams just getting started with collaborative work.",
    },
    {
        id: 2,
        question: 'How does the Pro plan differ from the Free plan?',
        answer:
            "The Pro plan includes everything in the Free plan, plus advanced team management features, priority support, custom integrations, and advanced analytics. It's designed for growing teams that need more powerful collaboration tools.",
    },
    {
        id: 3,
        question: 'Can I upgrade or downgrade my plan at any time?',
        answer:
            "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new features will be immediately available. If you downgrade, you'll continue to have access to your current plan until the end of your billing cycle.",
    },
    {
        id: 4,
        question: 'Is there a limit to the number of projects on the Free plan?',
        answer:
            "No, there's no limit to the number of projects you can create on any of our plans, including the Free plan. You can create and collaborate on as many projects as you need.",
    },
    {
        id: 5,
        question: 'What payment methods do you accept?',
        answer:
            'We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. For Enterprise plans, we also offer invoicing options.',
    },
    {
        id: 6,
        question:
            'Do you offer discounts for non-profit organizations or educational institutions?',
        answer:
            'Yes, we offer special pricing for non-profit organizations and educational institutions. Please contact our sales team for more information about these discounts.',
    },
];

export default function Pricing() {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="relative min-h-screen bg-gray-900 text-white">
            <main className="relative">
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="mb-6 text-4xl font-extrabold lg:text-7xl md:text-6xl sm:text-5xl">
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Simple Pricing for Teams of All Sizes
                </span>
                            </h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300 md:text-2xl">
                                Choose the plan that best fits your team's needs. All plans come
                                with a 14-day free trial.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={plan.name}
                                    className={`relative overflow-hidden rounded-xl bg-gray-800 p-8 ${
                                        plan.highlight ? 'ring-2 ring-indigo-400' : ''
                                    }`}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {plan.highlight && (
                                        <div className="absolute right-0 top-0 rounded-bl-lg bg-indigo-500 px-4 py-1 text-sm font-semibold text-white">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="mb-4 text-center text-3xl font-bold">
                                        {plan.name}
                                    </h3>
                                    <p className="mb-6 text-center text-5xl font-bold">
                                        <span className="text-indigo-400">{plan.price}</span>
                                        <span className="text-2xl font-normal text-gray-400">
                      {plan.period}
                    </span>
                                    </p>
                                    <ul className="mb-8 space-y-4">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center">
                                                <FaCheck className="mr-2 text-green-400" /> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        to={plan.ctaLink}
                                        className="block rounded-full bg-indigo-600 px-6 py-3 text-center text-lg font-semibold transition-all duration-300 hover:bg-indigo-700"
                                    >
                                        {plan.cta}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-center text-4xl font-extrabold text-transparent">
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
                                        onClick={() =>
                                            setOpenFaq(openFaq === faq.id ? null : faq.id)
                                        }
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
                    <div className="mt-8 text-center">
                        <p className="mx-auto mb-6 max-w-3xl text-xl text-gray-300">
                            Can't find the answer you're looking for? Reach out to our
                            customer support team.
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
                </section>
            </main>
        </div>
    );
}
