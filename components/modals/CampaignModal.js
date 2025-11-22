"use client";

import React, { useState, useEffect } from 'react';

const CampaignModal = ({ isOpen, onClose, onSave, campaign, contentItems }) => {
    const [name, setName] = useState('');
    const [contentId, setContentId] = useState('');
    const [platforms, setPlatforms] = useState([]);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');

    useEffect(() => {
        if (campaign) {
            setName(campaign.name);
            setContentId(campaign.contentId);
            setPlatforms(campaign.platforms);
            setScheduleDate(campaign.scheduleDate);
            setScheduleTime(campaign.scheduleTime);
        } else {
            setName('');
            setContentId('');
            setPlatforms([]);
            setScheduleDate('');
            setScheduleTime('');
        }
    }, [campaign, isOpen]);

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
            id: campaign ? campaign.id : Date.now(),
            name,
            contentId: parseInt(contentId),
            platforms,
            scheduleDate,
            scheduleTime,
            status: 'Scheduled'
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div id="campaignModal" className="modal active">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="text-xl font-bold" id="campaignModalTitle">{campaign ? 'Edit Campaign' : 'Schedule Campaign'}</h3>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>
                <div className="modal-body">
                    <form id="campaignForm" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="form-label">Campaign Name</label>
                                <input
                                    type="text"
                                    id="campaignName"
                                    className="form-input"
                                    placeholder="e.g., Summer Sale Launch"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="form-label">Select Content</label>
                                <select
                                    id="campaignContent"
                                    className="form-input"
                                    required
                                    value={contentId}
                                    onChange={(e) => setContentId(e.target.value)}
                                >
                                    <option value="">Choose content to promote...</option>
                                    {contentItems.map(item => (
                                        <option key={item.id} value={item.id}>{item.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="form-label">Platforms</label>
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Date</label>
                                    <input
                                        type="date"
                                        id="campaignDate"
                                        className="form-input"
                                        required
                                        value={scheduleDate}
                                        onChange={(e) => setScheduleDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Time</label>
                                    <input
                                        type="time"
                                        id="campaignTime"
                                        className="form-input"
                                        required
                                        value={scheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Schedule</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CampaignModal;
