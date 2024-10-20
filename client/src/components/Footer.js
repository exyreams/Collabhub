import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Footer() {
    return (
        <footer className="glassmorphism mt-2 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 sm:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <div className="flex justify-start">
                            <img className="h-8" src={logo} alt="CollabHub" />
                            <p className="ml-2 text-2xl font-semibold">
                                Collab<span className="font-bold text-purple-400">Hub</span>
                            </p>
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                            Empowering teams to collaborate seamlessly.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold uppercase tracking-wider text-purple-400">
                            Product
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    to="/features"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/pricing"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/security"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    Security
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold uppercase tracking-wider text-purple-400">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/careers"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/support"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold uppercase tracking-wider text-purple-400">
                            Legal
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-base text-gray-300 transition duration-150 ease-in-out hover:text-white"
                                >
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-700 pt-8 md:flex-row">
                    <p className="text-base text-gray-400">
                        &copy; 2024 CollabHub. All rights reserved.
                    </p>
                    <div className="mt-4 flex space-x-6 md:mt-0">
                        <a
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-300"
                            target=" _blank"
                            rel=" noopener noreferrer"
                        >
                            <span className="sr-only">Facebook</span>
                            <FaFacebookF className="h-6 w-6" />
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-300"
                        >
                            <span className="sr-only">Twitter</span>
                            <FaTwitter className="h-6 w-6" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-300"
                        >
                            <span className="sr-only">GitHub</span>
                            <FaGithub className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
