"use client";

import React, { useState } from 'react';

const TopBar = ({ title, onNavigate, isSidebarOpen, onToggleSidebar }) => {
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: "New campaign 'Summer Sale' scheduled", time: "5m ago", unread: true },
        { id: 2, text: "Your post on Instagram is trending", time: "1h ago", unread: true },
        { id: 3, text: "Weekly analytics report is ready", time: "1d ago", unread: false },
    ];

    return (
        <header className="top-bar relative">
            <div className="flex items-center justify-between w-full">
                {/* Hamburger Menu Button for Mobile */}
                <button
                    className="hamburger-menu md:hidden"
                    onClick={onToggleSidebar}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isSidebarOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
                <h2 id="pageTitle" className="page-title">{title}</h2>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>

                    <div className="relative">
                        <button
                            className="notification-bell focus:outline-none"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            <span className="notification-badge">3</span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                                <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                    <button className="text-xs text-primary hover:text-primary-dark">Mark all as read</button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map(notification => (
                                        <div key={notification.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${notification.unread ? 'bg-blue-50/30' : ''}`}>
                                            <p className="text-sm text-gray-800 mb-1">{notification.text}</p>
                                            <p className="text-xs text-gray-500">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 text-center border-t border-gray-100">
                                    <button
                                        className="text-sm text-primary hover:text-primary-dark font-medium"
                                        onClick={() => {
                                            setShowNotifications(false);
                                            onNavigate('notifications');
                                        }}
                                    >
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="user-avatar">
                        <img src="https://ui-avatars.com/api/?name=Christian+Padilla&background=007BFF&color=fff" alt="User" className="w-10 h-10 rounded-full" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
