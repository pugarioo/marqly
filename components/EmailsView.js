"use client";

import React, { useState } from 'react';

const MessagesView = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [emailBuilderOpen, setEmailBuilderOpen] = useState(false);
    const [showAutoReplyTemplates, setShowAutoReplyTemplates] = useState(false);

    const autoReplyTemplates = [
        { id: 1, name: 'Business Hours', trigger: 'business hours', template: 'Thank you for your message! Our business hours are Monday-Friday, 9AM-5PM. We\'ll respond within 24 hours.' },
        { id: 2, name: 'Pricing Inquiry', trigger: 'pricing|price|cost', template: 'Thanks for your interest! You can view our pricing at www.example.com/pricing or contact us at sales@example.com for a custom quote.' },
        { id: 3, name: 'Product Information', trigger: 'product|information', template: 'Thank you for your inquiry! Please visit our product page for detailed information, or feel free to ask specific questions.' },
        { id: 4, name: 'Support Request', trigger: 'help|support|issue', template: 'We\'re here to help! Please describe your issue in detail and we\'ll get back to you as soon as possible.' },
    ];

    const messages = [
        { id: 1, source: 'email', sender: "John Doe", subject: "Collaboration Proposal", preview: "Hi Christian, I'd love to discuss a potential partnership...", time: "10:30 AM", unread: true, tag: "Business" },
        { id: 2, source: 'facebook', sender: "Sarah Mitchell", subject: "RE: Your post about summer sale", preview: "This looks amazing! When does it start?", time: "Yesterday", unread: true, tag: "Comment" },
        { id: 3, source: 'instagram', sender: "@mike_designs", subject: "Direct Message", preview: "Love your content! Would love to collaborate...", time: "Yesterday", unread: false, tag: "DM" },
        { id: 4, source: 'email', sender: "Support Team", subject: "Ticket #1234 Resolved", preview: "Your support ticket regarding the API integration has been...", time: "2 days ago", unread: false, tag: "Support" },
        { id: 5, source: 'tiktok', sender: "@creative_user", subject: "Comment on your video", preview: "This is so helpful! Thanks for sharing!", time: "2 days ago", unread: false, tag: "Comment" },
        { id: 6, source: 'youtube', sender: "Tech Reviewer", subject: "Comment on 'How to Market'", preview: "Great tutorial! Looking forward to more...", time: "3 days ago", unread: false, tag: "Comment" },
    ];

    const tabs = [
        { id: 'all', label: 'All Messages', icon: '💬', count: messages.length },
        { id: 'email', label: 'Email', icon: '📧', count: messages.filter(m => m.source === 'email').length },
        { id: 'facebook', label: 'Facebook', icon: '📘', count: messages.filter(m => m.source === 'facebook').length },
        { id: 'instagram', label: 'Instagram', icon: '📷', count: messages.filter(m => m.source === 'instagram').length },
        { id: 'tiktok', label: 'TikTok', icon: '🎵', count: messages.filter(m => m.source === 'tiktok').length },
        { id: 'youtube', label: 'YouTube', icon: '📺', count: messages.filter(m => m.source === 'youtube').length },
    ];

    const filteredMessages = activeTab === 'all'
        ? messages
        : messages.filter(m => m.source === activeTab);

    return (
        <div id="messagesView" className="view active h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Unified Inbox</h2>
                <div className="flex gap-2">
                    <button
                        className="btn-secondary"
                        onClick={() => setShowAutoReplyTemplates(!showAutoReplyTemplates)}
                    >
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                        Auto-Reply Templates
                    </button>
                    <button className="btn-primary" onClick={() => setEmailBuilderOpen(true)}>
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        New Email Campaign
                    </button>
                </div>
            </div>

            {/* Auto-Reply Templates Panel */}
            {showAutoReplyTemplates && (
                <div className="card mb-4 bg-blue-50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">🤖</span>
                            <h3 className="font-semibold">Auto-Reply Templates</h3>
                        </div>
                        <button onClick={() => setShowAutoReplyTemplates(false)} className="text-gray-500 hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {autoReplyTemplates.map(template => (
                            <div key={template.id} className="p-4 bg-white rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-900">{template.name}</h4>
                                    <button className="text-xs text-primary hover:underline">Edit</button>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">Trigger: {template.trigger}</p>
                                <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded italic">"{template.template}"</p>
                                <div className="mt-3 flex gap-2">
                                    <button className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                                        ✓ Enabled
                                    </button>
                                    <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                                        Test
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-primary w-full mt-4">+ Add New Template</button>
                </div>
            )}

            {/* Source Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === tab.id
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                        <span className="ml-2 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            <div className="card flex-1 flex overflow-hidden p-0">
                {/* Sidebar Filters */}
                <div className="w-64 border-r border-gray-100 bg-gray-50 p-4 flex flex-col">
                    <div className="space-y-1">
                        <button className="w-full text-left px-4 py-2 rounded-lg bg-white shadow-sm text-primary font-medium flex items-center justify-between">
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                Inbox
                            </span>
                            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">2</span>
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                            Sent
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            Drafts
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                            Saved
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredMessages.map(message => (
                        <div key={message.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${message.unread ? 'bg-blue-50/30' : ''}`}>
                            <div className="mr-4">
                                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            </div>

                            {/* Source Icon */}
                            <div className="mr-3 text-2xl flex-shrink-0">
                                {message.source === 'email' && '📧'}
                                {message.source === 'facebook' && '📘'}
                                {message.source === 'instagram' && '📷'}
                                {message.source === 'tiktok' && '🎵'}
                                {message.source === 'youtube' && '📺'}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`font-medium truncate ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>{message.sender}</span>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{message.time}</span>
                                </div>
                                <h4 className={`text-sm mb-1 truncate ${message.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{message.subject}</h4>
                                <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                            </div>

                            <div className="ml-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${message.tag === 'Business' ? 'bg-purple-100 text-purple-600' :
                                    message.tag === 'Support' ? 'bg-green-100 text-green-600' :
                                        message.tag === 'DM' ? 'bg-blue-100 text-blue-600' :
                                            message.tag === 'Comment' ? 'bg-orange-100 text-orange-600' :
                                                'bg-gray-100 text-gray-600'
                                    }`}>
                                    {message.tag}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessagesView;
