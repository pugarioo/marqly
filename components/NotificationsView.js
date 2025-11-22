"use client";

import React from 'react';

const NotificationsView = () => {
    const notifications = [
        { id: 1, title: "New campaign 'Summer Sale' scheduled", message: "Your campaign has been successfully scheduled for July 1st, 2024 at 10:00 AM.", time: "5m ago", type: "success", read: false },
        { id: 2, title: "Your post on Instagram is trending", message: "Your post 'Summer Vibes' has reached 10k likes! Keep up the good work.", time: "1h ago", type: "info", read: false },
        { id: 3, title: "Weekly analytics report is ready", message: "Your weekly performance report for June Week 3 is now available for download.", time: "1d ago", type: "info", read: true },
        { id: 4, title: "Account security alert", message: "We noticed a login attempt from a new device. Was this you?", time: "2d ago", type: "warning", read: true },
        { id: 5, title: "Subscription renewal", message: "Your Pro plan subscription will renew in 3 days.", time: "3d ago", type: "info", read: true },
    ];

    return (
        <div id="notificationsView" className="view active">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <button className="text-primary hover:text-primary-dark font-medium text-sm">Mark all as read</button>
            </div>

            <div className="space-y-4">
                {notifications.map(notification => (
                    <div key={notification.id} className={`card p-4 flex items-start space-x-4 ${notification.read ? 'opacity-75' : 'border-l-4 border-primary'}`}>
                        <div className={`p-2 rounded-full flex-shrink-0 ${notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-blue-100 text-blue-600'
                            }`}>
                            {notification.type === 'success' && (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            )}
                            {notification.type === 'warning' && (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            )}
                            {notification.type === 'info' && (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>{notification.title}</h3>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-gray-600 mt-1 text-sm">{notification.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsView;
