"use client";

import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DashboardView = ({ onNavigate }) => {
    const [checklistTasks, setChecklistTasks] = useState([
        { id: 1, text: 'Post to Facebook', completed: true },
        { id: 2, text: 'Review analytics report', completed: true },
        { id: 3, text: 'Reply to messages', completed: false },
        { id: 4, text: 'Schedule Instagram story', completed: false },
        { id: 5, text: 'Prepare newsletter content', completed: false },
    ]);

    const activityFeed = [
        { id: 1, type: 'campaign', text: 'Campaign "Summer Sale 2024" published', time: '2 hours ago', icon: '🚀', color: 'text-blue-600' },
        { id: 2, type: 'content', text: 'New content created: "Product Showcase"', time: '3 hours ago', icon: '✍️', color: 'text-green-600' },
        { id: 3, type: 'analytics', text: 'Instagram post reached 5K impressions', time: '5 hours ago', icon: '📈', color: 'text-purple-600' },
        { id: 4, type: 'message', text: '3 new comments on Facebook', time: '6 hours ago', icon: '💬', color: 'text-orange-600' },
        { id: 5, type: 'sync', text: 'All platforms synced successfully', time: '1 day ago', icon: '🔄', color: 'text-teal-600' },
    ];

    const platforms = [
        { name: 'Facebook', status: 'connected', lastSync: '2h ago', icon: '📘', color: 'bg-blue-500' },
        { name: 'Instagram', status: 'connected', lastSync: '1h ago', icon: '📷', color: 'bg-pink-500' },
        { name: 'TikTok', status: 'disconnected', lastSync: null, icon: '🎵', color: 'bg-gray-400' },
        { name: 'YouTube', status: 'connected', lastSync: '5h ago', icon: '📺', color: 'bg-red-500' },
    ];

    const aiInsights = [
        { text: 'Best posting time for Instagram: 6-8 PM', type: 'suggestion' },
        { text: 'Engagement up 15% this week', type: 'positive' },
        { text: 'Consider posting more video content', type: 'suggestion' },
    ];

    const toggleTask = (id) => {
        setChecklistTasks(checklistTasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const completedCount = checklistTasks.filter(t => t.completed).length;
    const progressPercent = (completedCount / checklistTasks.length) * 100;

    const engagementData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Engagement',
            data: [12, 19, 15, 25, 22, 18, 24],
            borderColor: '#4A90E2',
            backgroundColor: 'rgba(74, 144, 226, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    const engagementOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div id="dashboardView" className="view active">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'var(--blue-100)', color: 'var(--primary)' }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </div>
                    <div>
                        <p className="stat-label">Total Content</p>
                        <p className="stat-value">247</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'var(--coral-100)', color: 'var(--secondary)' }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                        <p className="stat-label">Active Campaigns</p>
                        <p className="stat-value">12</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                    <div>
                        <p className="stat-label">Engagement Rate</p>
                        <p className="stat-value">8.4%</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'var(--lavender-light)', color: 'var(--lavender)' }}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <p className="stat-label">Total Reach</p>
                        <p className="stat-value">1.2M</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Marketing Checklist */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="card-title">Today's Checklist</h3>
                        <span className="text-sm text-gray-500">{completedCount}/{checklistTasks.length}</span>
                    </div>
                    <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {checklistTasks.map(task => (
                            <div key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={() => toggleTask(task.id)}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    className="mr-3 h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                                />
                                <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                    {task.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="btn-secondary w-full mt-4 text-sm">Add Task</button>
                </div>

                {/* Platform Status */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="card-title">Platform Status</h3>
                        <button onClick={() => onNavigate('integrations')} className="text-xs text-primary hover:underline">
                            Manage →
                        </button>
                    </div>
                    <div className="space-y-3">
                        {platforms.map((platform, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">{platform.icon}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{platform.name}</p>
                                        {platform.status === 'connected' && (
                                            <p className="text-xs text-gray-500">Synced {platform.lastSync}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {platform.status === 'connected' ? (
                                        <span className="inline-flex items-center">
                                            <span className={`w-2 h-2 ${platform.color} rounded-full animate-pulse`}></span>
                                        </span>
                                    ) : (
                                        <span className="text-xs text-gray-400">Offline</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Insights */}
                <div className="card">
                    <h3 className="card-title mb-4">AI Insights</h3>
                    <div className="space-y-3">
                        {aiInsights.map((insight, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${insight.type === 'positive' ? 'bg-green-50' : 'bg-blue-50'}`}>
                                <p className="text-sm text-gray-700 flex items-start">
                                    <span className="mr-2">{insight.type === 'positive' ? '📊' : '💡'}</span>
                                    {insight.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => onNavigate('analytics')} className="btn-primary w-full mt-4 text-sm">
                        View Full Analytics
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Activity Feed */}
                <div className="card">
                    <h3 className="card-title mb-4">Recent Activity</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {activityFeed.map(activity => (
                            <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <span className="text-2xl mr-3">{activity.icon}</span>
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${activity.color}`}>{activity.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h3 className="card-title mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="quick-action-btn" onClick={() => onNavigate('content')}>
                            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Create Content
                        </button>
                        <button className="quick-action-btn" onClick={() => onNavigate('campaigns')}>
                            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            Schedule Campaign
                        </button>
                        <button className="quick-action-btn" onClick={() => onNavigate('suggestions')}>
                            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a3 3 0 11-6 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                            AI Suggestions
                        </button>
                        <button className="quick-action-btn" onClick={() => onNavigate('analytics')}>
                            <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            View Analytics
                        </button>
                    </div>
                </div>
            </div>

            {/* Engagement Chart */}
            <div className="card">
                <h3 className="card-title">Engagement Overview</h3>
                <div className="chart-container">
                    <Line data={engagementData} options={engagementOptions} />
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
