import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Privacy() {
    return (
        <div className="relative min-h-screen text-white">
            <main className="relative">
                <section className="py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        {/*Hero Section*/}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="mb-6 text-5xl font-extrabold md:text-7xl">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                              Privacy Policy
                            </span>
                            </h1>
                            <p className="mb-12 text-xl text-gray-300">
                                Last updated: October 01, 2024
                            </p>
                        </motion.div>

                        {/*Mock Privacy Policy*/}
                        <div className="glassmorphism rounded-xl p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
                                <p className="mb-6 text-gray-300">
                                    CollabHub ("we", "our", or "us") is committed to protecting
                                    your privacy. This Privacy Policy explains how we collect,
                                    use, disclose, and safeguard your information when you use our
                                    collaboration platform and related services (collectively, the
                                    "Service").
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    2. Information We Collect
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    We collect information that you provide directly to us, such
                                    as when you create an account, use our Service, or communicate
                                    with us. This may include your name, email address, and any
                                    other information you choose to provide.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    3. How We Use Your Information
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    We use the information we collect to provide, maintain, and
                                    improve our Service, to communicate with you, and to comply
                                    with legal obligations. We may also use your information to
                                    personalize your experience and to send you promotional
                                    communications about our products and services.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    4. Data Sharing and Disclosure
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    We do not sell your personal information. We may share your
                                    information with third-party service providers who perform
                                    services on our behalf, such as hosting, data analysis, and
                                    customer service. We may also disclose your information if
                                    required by law or to protect our rights or the rights of
                                    others.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    5. Data Security
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    We implement appropriate technical and organizational measures
                                    to protect your information against unauthorized or unlawful
                                    processing and against accidental loss, destruction, or
                                    damage. However, no method of transmission over the Internet
                                    or electronic storage is 100% secure, so we cannot guarantee
                                    absolute security.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    6. Your Rights and Choices
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    You have the right to access, correct, or delete your personal
                                    information. You may also have the right to restrict or object
                                    to certain processing of your data. To exercise these rights,
                                    please contact us using the information provided at the end of
                                    this policy.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    7. Changes to This Privacy Policy
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    We may update this Privacy Policy from time to time. We will
                                    notify you of any changes by posting the new Privacy Policy on
                                    this page and updating the "Last updated" date at the top of
                                    this policy.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">8. Contact Us</h2>
                                <p className="mb-6 text-gray-300">
                                    If you have any questions about this Privacy Policy, please
                                    contact us at:
                                </p>
                                <p className="text-gray-300">
                                    Email: privacy@collabhub.com
                                    <br />
                                    Address: 123 Collaboration Street, Tech City, TC 12345, United
                                    States
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>
                {/*Contact Us Section*/}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="mb-8 text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                                Have Questions?
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                If you have any questions or concerns about our Privacy Policy,
                                please don't hesitate to reach out to us.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    to="/contact"
                                    className="glassmorphism-button inline-block rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-12 py-4 text-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Contact Us
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
