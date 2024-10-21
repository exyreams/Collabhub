import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Terms() {
    return (
        <div className="relative min-h-screen text-white">
            <main className="relative">
                <section className="py-20">
                    <div className="mx-auto max-w-4xl px-4 lg:px-8 sm:px-6">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="mb-6 text-5xl font-extrabold md:text-7xl">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                              Terms of Service
                            </span>
                            </h1>
                            <p className="mb-12 text-xl text-gray-300">
                                Last updated: October 01, 2024
                            </p>
                        </motion.div>
                        {/*Mock Terms*/}
                        <div className="glassmorphism rounded-xl p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="mb-4 text-2xl font-semibold">
                                    1. Acceptance of Terms
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    By accessing or using the CollabHub service, you agree to be
                                    bound by these Terms of Service and all applicable laws and
                                    regulations. If you do not agree with any part of these terms,
                                    you may not use our service.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    2. Description of Service
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    CollabHub provides a collaboration platform for teams to work
                                    together on various projects. We reserve the right to modify
                                    or discontinue, temporarily or permanently, the service with
                                    or without notice.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    3. User Accounts
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    You are responsible for maintaining the confidentiality of
                                    your account and password. You agree to accept responsibility
                                    for all activities that occur under your account or password.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">4. User Content</h2>
                                <p className="mb-6 text-gray-300">
                                    You retain all rights to any content you submit, post or
                                    display on or through the service. By submitting, posting or
                                    displaying content, you grant us a worldwide, non-exclusive,
                                    royalty-free license to use, reproduce, adapt, publish,
                                    translate and distribute it.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    5. Prohibited Uses
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    You agree not to use the service for any unlawful purpose or
                                    in any way that interrupts, damages, or impairs the service.
                                    You must not transmit any worms or viruses or any code of a
                                    destructive nature.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">6. Termination</h2>
                                <p className="mb-6 text-gray-300">
                                    We may terminate or suspend your account and bar access to the
                                    service immediately, without prior notice or liability, under
                                    our sole discretion, for any reason whatsoever and without
                                    limitation, including but not limited to a breach of the
                                    Terms.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    7. Limitation of Liability
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    In no event shall CollabHub, nor its directors, employees,
                                    partners, agents, suppliers, or affiliates, be liable for any
                                    indirect, incidental, special, consequential or punitive
                                    damages, including without limitation, loss of profits, data,
                                    use, goodwill, or other intangible losses, resulting from your
                                    access to or use of or inability to access or use the service.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    8. Changes to Terms
                                </h2>
                                <p className="mb-6 text-gray-300">
                                    We reserve the right, at our sole discretion, to modify or
                                    replace these Terms at any time. We will provide notice of any
                                    significant changes by posting the new Terms on this page.
                                </p>

                                <h2 className="mb-4 text-2xl font-semibold">9. Contact Us</h2>
                                <p className="text-gray-300">
                                    If you have any questions about these Terms, please contact us
                                    at:
                                </p>
                                <p className="text-gray-300">
                                    Email: legal@collabhub.com
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
                    <div className="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
                        <div className="text-center">
                            <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                                Need Clarification?
                            </h2>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
                                If you have any questions about our Terms of Service, please
                                don't hesitate to contact our support team.
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
                    </div>
                </section>
            </main>
        </div>
    );
}
