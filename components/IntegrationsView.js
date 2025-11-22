"use client";

import React, { useState } from 'react';

const IntegrationsView = () => {
    const [platforms, setPlatforms] = useState([
        {
            id: 'facebook',
            name: 'Facebook',
            icon: '📘',
            color: '#1877F2',
            connected: true,
            lastSync: '2 hours ago',
            stats: { posts: 45, followers: '12.5K', engagement: '4.2%' }
        },
        {
            id: 'instagram',
            name: 'Instagram',
            icon: '📷',
            color: '#E1306C',
            connected: true,
            lastSync: '1 hour ago',
            stats: { posts: 38, followers: '8.3K', engagement: '5.8%' }
        },
        {
            id: 'tiktok',
            name: 'TikTok',
            icon: '🎵',
            color: '#000000',
            connected: false,
            lastSync: null,
            stats: null
        },
        {
            id: 'youtube',
            name: 'YouTube',
            icon: '📺',
            color: '#FF0000',
            connected: true,
            lastSync: '5 hours ago',
            stats: { videos: 12, subscribers: '3.2K', views: '45.6K' }
        },
        {
            id: 'google-analytics',
            name: 'Google Analytics',
            icon: '📊',
            color: '#F9AB00',
            connected: true,
            lastSync: '30 minutes ago',
            stats: { sessions: '25.4K', users: '18.2K', pageviews: '67.8K' }
        },
        {
            id: 'twitter',
            name: 'Twitter (X)',
            icon: '🐦',
            color: '#1DA1F2',
            connected: false,
            lastSync: null,
            stats: null
        }
    ]);

    const handleConnect = (platformId) => {
        setPlatforms(platforms.map(p =>
            p.id === platformId
                ? { ...p, connected: true, lastSync: 'Just now', stats: { status: 'Connected' } }
                : p
        ));
    };

    const handleDisconnect = (platformId) => {
        setPlatforms(platforms.map(p =>
            p.id === platformId
                ? { ...p, connected: false, lastSync: null, stats: null }
                : p
        ));
    };

    return (
        <div id="integrationsView" className="view active">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Integrations</h2>
                <p className="text-gray-600">Connect and manage your social media and analytics platforms</p>
            </div>

            {/* Connection Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Connected Platforms</p>
                            <p className="text-3xl font-bold text-blue-600">
                                {platforms.filter(p => p.connected).length}/{platforms.length}
                            </p>
                        </div>
                        <div className="text-4xl">🔗</div>
                    </div>
                </div>
                <div className="card bg-gradient-to-br from-green-50 to-green-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Reach</p>
                            <p className="text-3xl font-bold text-green-600">24.0K</p>
                        </div>
                        <div className="text-4xl">👥</div>
                    </div>
                </div>
                <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Avg Engagement</p>
                            <p className="text-3xl font-bold text-purple-600">4.8%</p>
                        </div>
                        <div className="text-4xl">📈</div>
                    </div>
                </div>
            </div>

            {/* Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map(platform => (
                    <div key={platform.id} className="card hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <div className="text-4xl mr-3">{platform.icon}</div>
                                <div>
                                    <h3 className="font-bold text-lg">{platform.name}</h3>
                                    {platform.connected ? (
                                        <div className="flex items-center mt-1">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                                Connected
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 mt-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
                                            Disconnected
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {platform.connected && platform.stats && (
                            <div className="mb-4 pb-4 border-b border-gray-100">
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    {Object.entries(platform.stats).map(([key, value]) => (
                                        <div key={key}>
                                            <p className="text-xs text-gray-500 capitalize">{key}</p>
                                            <p className="text-sm font-semibold text-gray-800">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {platform.connected && platform.lastSync && (
                            <p className="text-xs text-gray-500 mb-3">
                                <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Last synced: {platform.lastSync}
                            </p>
                        )}

                        <div className="flex space-x-2">
                            {platform.connected ? (
                                <>
                                    <button
                                        className="btn-secondary text-sm flex-1"
                                        onClick={() => handleDisconnect(platform.id)}
                                    >
                                        Disconnect
                                    </button>
                                    <button className="btn-primary text-sm flex-1">
                                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        Sync Now
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="btn-primary text-sm w-full"
                                    onClick={() => handleConnect(platform.id)}
                                    style={{ backgroundColor: platform.color }}
                                >
                                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    Connect {platform.name}
                                </button>
                            )}
                        </div>

                        {platform.connected && (
                            <button className="text-xs text-gray-500 hover:text-gray-700 mt-3 w-full text-center">
                                ⚙️ Configure Settings
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Help Section */}
            <div className="card bg-blue-50 mt-6">
                <div className="flex items-start">
                    <div className="text-3xl mr-4">💡</div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Need Help Connecting?</h3>
                        <p className="text-sm text-gray-600 mb-3">
                            Follow our step-by-step guides to connect your platforms securely.
                            All integrations use OAuth 2.0 for maximum security.
                        </p>
                        <button className="text-sm text-primary font-medium hover:underline">
                            View Integration Guides →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationsView;
