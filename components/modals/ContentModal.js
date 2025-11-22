"use client";

import React, { useState, useEffect } from 'react';

const ContentModal = ({ isOpen, onClose, onSave, content }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Social Media Post');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [platforms, setPlatforms] = useState([]);
    const [media, setMedia] = useState([]);

    useEffect(() => {
        if (content) {
            setTitle(content.title);
            setType(content.type);
            setBody(content.body);
            setTags(content.tags.join(', '));
            setPlatforms(content.platforms || []);
            setMedia(content.media || []);
        } else {
            setTitle('');
            setType('Social Media Post');
            setBody('');
            setTags('');
            setPlatforms([]);
            setMedia([]);
        }
    }, [content, isOpen]);

    const handlePlatformChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setPlatforms([...platforms, value]);
        } else {
            setPlatforms(platforms.filter(p => p !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: content ? content.id : Date.now(),
            title,
            type,
            body,
            tags: tags.split(',').map(t => t.trim()),
            platforms: type === 'Social Media Post' ? platforms : [],
            media,
            createdAt: content ? content.createdAt : new Date().toISOString()
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div id="contentModal" className="modal active">
            <div className="modal-content modal-large">
                <div className="modal-header">
                    <h3 className="text-xl font-bold" id="contentModalTitle">{content ? 'Edit Content' : 'Create New Content'}</h3>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>
                <div className="modal-body">
                    <form id="contentForm" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="form-label">Content Title</label>
                                    <input
                                        type="text"
                                        id="contentTitle"
                                        className="form-input"
                                        placeholder="Enter a descriptive title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Content Type</label>
                                    <select
                                        id="contentType"
                                        className="form-input"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option>Social Media Post</option>
                                        <option>Email Campaign</option>
                                        <option>Blog Article</option>
                                        <option>Ad Copy</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Content Body</label>
                                    <textarea
                                        id="contentBody"
                                        className="form-input h-32 resize-none"
                                        placeholder="Write your content here..."
                                        required
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="form-label">Tags</label>
                                    <input
                                        type="text"
                                        id="contentTags"
                                        className="form-input"
                                        placeholder="Separate tags with commas"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div id="platformSelection" className={type === 'Social Media Post' ? '' : 'hidden'}>
                                    <label className="form-label">Target Platforms</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <label className="platform-checkbox">
                                            <input
                                                type="checkbox"
                                                value="Facebook"
                                                checked={platforms.includes('Facebook')}
                                                onChange={handlePlatformChange}
                                            />
                                            <span>Facebook</span>
                                        </label>
                                        <label className="platform-checkbox">
                                            <input
                                                type="checkbox"
                                                value="Instagram"
                                                checked={platforms.includes('Instagram')}
                                                onChange={handlePlatformChange}
                                            />
                                            <span>Instagram</span>
                                        </label>
                                        <label className="platform-checkbox">
                                            <input
                                                type="checkbox"
                                                value="TikTok"
                                                checked={platforms.includes('TikTok')}
                                                onChange={handlePlatformChange}
                                            />
                                            <span>TikTok</span>
                                        </label>
                                        <label className="platform-checkbox">
                                            <input
                                                type="checkbox"
                                                value="YouTube"
                                                checked={platforms.includes('YouTube')}
                                                onChange={handlePlatformChange}
                                            />
                                            <span>YouTube</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label">Media Assets</label>
                                    <div className="media-upload-area">
                                        <div className="media-drop-zone" id="mediaDropZone">
                                            <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className="text-sm text-gray-600">Drag & drop files here or click to upload</p>
                                            <input type="file" id="mediaInput" multiple className="hidden" />
                                        </div>
                                        <div id="mediaPreview" className="media-preview-container">
                                            {media.length > 0 && (
                                                <div className="media-preview-grid">
                                                    {media.map((m, idx) => (
                                                        <div key={idx} className="media-preview-item">
                                                            <img src={m.src} alt={m.name} />
                                                            <button type="button" className="remove-btn" onClick={() => setMedia(media.filter((_, i) => i !== idx))}>&times;</button>
                                                            <div className="file-name">{m.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Save Content</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContentModal;
