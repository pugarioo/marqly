"use client";

import React from 'react';

const CampaignsView = ({ campaigns, contentItems, onEdit, onDelete, onOpenModal }) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const renderCalendar = () => {
        const days = [];
        // Empty cells
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="h-16"></div>);
        }
        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasCampaign = campaigns.some(c => c.scheduleDate === dateStr);
            const isToday = day === today.getDate() && currentMonth === today.getMonth();

            days.push(
                <div key={day} className={`h-16 border-2 ${isToday ? 'border-primary' : 'border-gray-200'} rounded-lg p-2 ${hasCampaign ? 'bg-blue-50' : 'bg-white'} ${isToday ? 'font-bold' : ''}`}>
                    <div className="text-sm">{day}</div>
                    {hasCampaign && <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>}
                </div>
            );
        }
        return days;
    };

    return (
        <div id="campaignsView" className="view active">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
                <button onClick={onOpenModal} className="btn-primary">
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Schedule Campaign
                </button>
            </div>

            <div className="card mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Campaign Calendar</h3>
                    <div className="flex space-x-2">
                        <button className="btn-secondary text-sm">Today</button>
                        <button className="btn-secondary text-sm">Week</button>
                        <button className="btn-secondary text-sm">Month</button>
                    </div>
                </div>
                <div id="campaignCalendar" className="calendar-view">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">{today.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day =>
                            <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">{day}</div>
                        )}
                        {renderCalendar()}
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 className="card-title mb-4">All Campaigns</h3>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Campaign Name</th>
                                <th>Content</th>
                                <th>Platforms</th>
                                <th>Schedule</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="campaignsTable">
                            {campaigns.map(campaign => {
                                const content = contentItems.find(c => c.id === campaign.contentId);
                                return (
                                    <tr key={campaign.id}>
                                        <td className="font-semibold">{campaign.name}</td>
                                        <td>{content ? content.title : 'N/A'}</td>
                                        <td>{campaign.platforms.join(', ')}</td>
                                        <td>{campaign.scheduleDate} at {campaign.scheduleTime}</td>
                                        <td><span className={`badge-${campaign.status === 'Published' ? 'success' : 'warning'}`}>{campaign.status}</span></td>
                                        <td>
                                            <button onClick={() => onEdit(campaign.id)} className="action-btn action-btn-edit text-xs mr-2">Edit</button>
                                            <button onClick={() => onDelete(campaign.id)} className="action-btn action-btn-delete text-xs">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CampaignsView;
