"use client";

import React, { useState } from 'react';

const EmailBuilderModal = ({ isOpen, onClose, onSave }) => {
    const [emailData, setEmailData] = useState({
        subject: '',
        fromName: 'Marqly Team',
        preheader: '',
        template: 'newsletter',
        content: {
            header: 'Welcome to Our Newsletter!',
            body: 'Your content goes here...',
            footer: '© 2024 Marqly. All rights reserved.'
        }
    });
    const [previewMode, setPreviewMode] = useState('desktop');

    const templates = [
        { id: 'newsletter', name: 'Newsletter', icon: '📰', description: 'Regular updates and news' },
        { id: 'promotion', name: 'Promotion', icon: '🎁', description: 'Sales and offers' },
        { id: 'announcement', name: 'Announcement', icon: '📢', description: 'Important updates' },
        { id: 'welcome', name: 'Welcome Email', icon: '👋', description: 'New subscriber greeting' },
    ];

    const contentBlocks = [
        { type: 'text', icon: '📝', label: 'Text Block' },
        { type: 'image', icon: '🖼️', label: 'Image' },
        { type: 'button', icon: '🔘', label: 'Button' },
        { type: 'divider', icon: '➖', label: 'Divider' },
        { type: 'social', icon: '🔗', label: 'Social Links' },
    ];

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content max-w-6xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Email Campaign Builder</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Editor Panel */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Template Selection */}
                        <div>
                            <label className="form-label">Choose Template</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {templates.map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => setEmailData({ ...emailData, template: template.id })}
                                        className={`p-4 rounded-lg border-2 text-center transition-all ${emailData.template === template.id
                                                ? 'border-primary bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">{template.icon}</div>
                                        <div className="font-semibold text-sm mb-1">{template.name}</div>
                                        <div className="text-xs text-gray-500">{template.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Email Details */}
                        <div className="card">
                            <h3 className="font-semibold mb-4">Email Settings</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="form-label">Subject Line</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter email subject..."
                                        value={emailData.subject}
                                        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">From Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={emailData.fromName}
                                        onChange={(e) => setEmailData({ ...emailData, fromName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Preheader Text</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Preview text that appears after subject..."
                                        value={emailData.preheader}
                                        onChange={(e) => setEmailData({ ...emailData, preheader: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Blocks */}
                        <div className="card">
                            <h3 className="font-semibold mb-4">Design Email (Drag & Drop)</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {contentBlocks.map(block => (
                                    <button
                                        key={block.type}
                                        className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <span className="mr-2">{block.icon}</span>
                                        {block.label}
                                    </button>
                                ))}
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                                <p className="text-gray-500 mb-2">📦 Drop content blocks here</p>
                                <p className="text-sm text-gray-400">Or click blocks above to add them</p>
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <div className="card">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold">Preview</h3>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setPreviewMode('desktop')}
                                            className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                                            title="Desktop"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setPreviewMode('mobile')}
                                            className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                                            title="Mobile"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className={`border rounded-lg bg-white p-4 ${previewMode === 'mobile' ? 'max-w-xs mx-auto' : ''}`}>
                                    <div className="text-xs text-gray-500 mb-2">From: {emailData.fromName}</div>
                                    <div className="font-bold mb-2">{emailData.subject || 'Your Subject Line'}</div>
                                    {emailData.preheader && (
                                        <div className="text-xs text-gray-600 mb-4">{emailData.preheader}</div>
                                    )}
                                    <div className="border-t pt-4">
                                        <h3 className="text-lg font-bold text-center mb-4">{emailData.content.header}</h3>
                                        <p className="text-sm text-gray-700 mb-4">{emailData.content.body}</p>
                                        <div className="text-center">
                                            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold">
                                                Call to Action
                                            </button>
                                        </div>
                                        <div className="text-xs text-gray-500 text-center mt-6 pt-4 border-t">
                                            {emailData.content.footer}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 space-y-2">
                                <button className="btn-primary w-full">
                                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    Schedule Campaign
                                </button>
                                <button className="btn-secondary w-full">Save as Draft</button>
                                <button className="btn-secondary w-full">Send Test Email</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailBuilderModal;
