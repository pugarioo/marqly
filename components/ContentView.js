"use client";

import React, { useState } from 'react';

const ContentView = ({ contentItems, onEdit, onDelete, onOpenModal }) => {
    const [filter, setFilter] = useState('All');

    const filteredItems = contentItems.filter(item => {
        if (filter === 'All') return true;
        if (filter === 'Social Media') return item.type.includes('Social');
        if (filter === 'Email') return item.type === 'Email';
        if (filter === 'Blog') return item.type.includes('Blog');
        if (filter === 'Ads') return item.type.includes('Ad');
        return true;
    });

    return (
        <div id="contentView" className="view active">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Marketing Content</h2>
                <button onClick={onOpenModal} className="btn-primary">
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Create New Content
                </button>
            </div>

            <div className="mb-4 flex space-x-2">
                {['All', 'Social Media', 'Email', 'Blog', 'Ads'].map(f => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="contentGrid">
                {filteredItems.map(item => (
                    <div key={item.id} className="content-card">
                        <div className="content-card-header">
                            <div>
                                <h4 className="content-card-title">{item.title}</h4>
                                <span className="content-card-type">{item.type}</span>
                            </div>
                        </div>
                        {item.media && item.media.length > 0 && (
                            <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(item.media.length, 3)}, 1fr)` }}>
                                {item.media.slice(0, 3).map((media, idx) => (
                                    <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-gray-200">
                                        <img src={media.src} alt={media.name} className="w-full h-24 object-cover" />
                                    </div>
                                ))}
                                {item.media.length > 3 && (
                                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                                        <span className="text-xs font-medium text-gray-600">+{item.media.length - 3} more</span>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="content-card-body">{item.body}</div>
                        {item.platforms && item.platforms.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                                {item.platforms.map((p, idx) => (
                                    <span key={idx} className="text-xs px-2 py-1 bg-blue-50 text-primary rounded-full font-medium">{p}</span>
                                ))}
                            </div>
                        )}
                        <div className="content-card-footer">
                            <div className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                            <div className="content-card-actions">
                                <button onClick={() => onEdit(item.id)} className="action-btn action-btn-edit">Edit</button>
                                <button onClick={() => onDelete(item.id)} className="action-btn action-btn-delete">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentView;
