"use client";

import React, { useState } from 'react';

const EmailsView = () => {
    const [activeTab, setActiveTab] = useState('inbox');

    const emails = [
        { id: 1, sender: "John Doe", subject: "Collaboration Proposal", preview: "Hi Christian, I'd love to discuss a potential partnership...", time: "10:30 AM", unread: true, tag: "Business" },
        { id: 2, sender: "Support Team", subject: "Ticket #1234 Resolved", preview: "Your support ticket regarding the API integration has been...", time: "Yesterday", unread: false, tag: "Support" },
        { id: 3, sender: "Sarah Smith", subject: "Content Strategy Meeting", preview: "Can we reschedule our meeting to next Tuesday?", time: "Yesterday", unread: false, tag: "Team" },
        { id: 4, sender: "Newsletter", subject: "Marketing Trends 2024", preview: "Discover the top marketing trends that will define...", time: "2 days ago", unread: true, tag: "News" },
    ];

    return (
        <div id="emailsView" className="view active h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Emails</h2>
                <button className="btn-primary">
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Compose
                </button>
            </div>

            <div className="card flex-1 flex overflow-hidden p-0">
                {/* Email Sidebar */}
                <div className="w-64 border-r border-gray-100 bg-gray-50 p-4 flex flex-col">
                    <div className="space-y-1">
                        <button
                            onClick={() => setActiveTab('inbox')}
                            className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between ${activeTab === 'inbox' ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                Inbox
                            </span>
                            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">2</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('sent')}
                            className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'sent' ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                            Sent
                        </button>
                        <button
                            onClick={() => setActiveTab('drafts')}
                            className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'drafts' ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            Drafts
                        </button>
                        <button
                            onClick={() => setActiveTab('trash')}
                            className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'trash' ? 'bg-white shadow-sm text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            Trash
                        </button>
                    </div>
                </div>

                {/* Email List */}
                <div className="flex-1 overflow-y-auto">
                    {emails.map(email => (
                        <div key={email.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center ${email.unread ? 'bg-blue-50/30' : ''}`}>
                            <div className="mr-4">
                                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`font-medium truncate ${email.unread ? 'text-gray-900' : 'text-gray-700'}`}>{email.sender}</span>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{email.time}</span>
                                </div>
                                <h4 className={`text-sm mb-1 truncate ${email.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{email.subject}</h4>
                                <p className="text-sm text-gray-500 truncate">{email.preview}</p>
                            </div>
                            <div className="ml-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${email.tag === 'Business' ? 'bg-purple-100 text-purple-600' :
                                        email.tag === 'Support' ? 'bg-green-100 text-green-600' :
                                            email.tag === 'Team' ? 'bg-blue-100 text-blue-600' :
                                                'bg-gray-100 text-gray-600'
                                    }`}>
                                    {email.tag}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmailsView;
