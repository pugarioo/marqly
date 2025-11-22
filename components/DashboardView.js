"use client";

import React from 'react';
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="card">
                    <h3 className="card-title">Recent Campaigns</h3>
                    <div className="space-y-4">
                        <div className="campaign-item">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900">Summer Sale 2024</p>
                                    <p className="text-sm text-gray-500">Published 2 hours ago</p>
                                </div>
                                <span className="badge-success">Active</span>
                            </div>
                        </div>
                        <div className="campaign-item">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900">Product Launch</p>
                                    <p className="text-sm text-gray-500">Scheduled for tomorrow</p>
                                </div>
                                <span className="badge-warning">Scheduled</span>
                            </div>
                        </div>
                        <div className="campaign-item">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900">Brand Awareness</p>
                                    <p className="text-sm text-gray-500">Published yesterday</p>
                                </div>
                                <span className="badge-info">Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-title">Quick Actions</h3>
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
