// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Check-In', path: '/check-in' },
        { name: 'Tips', path: '/tips' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo and Slogan */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-600">MindTrack</h1>
                    <p className="text-sm text-gray-500 -mt-1">Track your thoughts, transform your mind</p>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`pb-1 transition-all duration-200 ${location.pathname === item.path
                                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`block py-2 px-2 rounded-md transition-colors ${location.pathname === item.path
                                    ? 'bg-blue-100 text-blue-700 font-semibold'
                                    : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}


                    <button
                        onClick={() => {
                            setIsOpen(false);
                            handleLogout();
                        }}
                        className="mt-2 bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
