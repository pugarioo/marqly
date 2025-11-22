"use client";

import React, { useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AnalyticsView = () => {
    const [activePlatform, setActivePlatform] = useState('all');

    const platforms = [
        { id: 'all', name: 'All Platforms', icon: '📊' },
        { id: 'facebook', name: 'Facebook', icon: '📘' },
        { id: 'instagram', name: 'Instagram', icon: '📷' },
        { id: 'tiktok', name: 'TikTok', icon: '🎵' },
        { id: 'youtube', name: 'YouTube', icon: '📺' },
        { id: 'email', name: 'Email', icon: '📧' },
    ];

    const performanceData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Impressions',
                data: [450, 520, 480, 600],
                backgroundColor: '#4A90E2',
                borderRadius: 8
            },
            {
                label: 'Clicks',
                data: [180, 210, 190, 240],
                backgroundColor: '#FF7A8A',
                borderRadius: 8
            }
        ]
    };

    const performanceOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 15
                }
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

    const platformData = {
        labels: ['Facebook', 'Instagram', 'TikTok', 'YouTube'],
        datasets: [{
            data: [35, 30, 20, 15],
            backgroundColor: [
                '#1877F2', // Facebook Blue
                '#E1306C', // Instagram Pink
                '#000000', // TikTok Black
                '#FF0000'  // YouTube Red
            ],
            borderWidth: 0
        }]
    };

    const platformOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    const aiInsights = [
        { type: 'positive', icon: '📈', title: 'Engagement Trending Up', text: 'Your engagement rate increased by 15% this week. Keep posting similar content!' },
        { type: 'suggestion', icon: '💡', title: 'Best Time to Post', text: 'Data shows your audience is most active between 6-8 PM. Schedule posts during this window.' },
        { type: 'warning', icon: '⚠️', title: 'TikTok Performance', text: 'TikTok reach has declined 8%. Consider posting more video content.' },
        { type: 'suggestion', icon: '🎯', title: 'Content Recommendation', text: 'Video posts get 2.5x more engagement than images. Try incorporating more videos.' },
    ];

    const emailMetrics = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Open Rate %',
            data: [22, 25, 28, 30],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true,
        }]
    };

    const customerSegments = [
        { name: 'Age 18-24', percentage: 25, count: '5.2K' },
        { name: 'Age 25-34', percentage: 40, count: '8.5K' },
        { name: 'Age 35-44', percentage: 20, count: '4.1K' },
        { name: 'Age 45+', percentage: 15, count: '3.1K' },
    ];

    return (
        <div id="analyticsView" className="view active">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                <div className="flex space-x-2">
                    <select className="form-input">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Custom Range</option>
                    </select>
                    <button className="btn-secondary">
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Export Report
                    </button>
                </div>
            </div>

            {/* Platform Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {platforms.map(platform => (
                    <button
                        key={platform.id}
                        onClick={() => setActivePlatform(platform.id)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activePlatform === platform.id
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <span className="mr-2">{platform.icon}</span>
                        {platform.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Total Impressions</p>
                        <p className="stat-value text-3xl">2.4M</p>
                        <p className="text-sm text-green-600 mt-2">↑ 12.5% from last period</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Click-Through Rate</p>
                        <p className="stat-value text-3xl">3.2%</p>
                        <p className="text-sm text-green-600 mt-2">↑ 0.8% from last period</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Conversions</p>
                        <p className="stat-value text-3xl">1,247</p>
                        <p className="text-sm text-green-600 mt-2">↑ 18.3% from last period</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div>
                        <p className="stat-label">ROI</p>
                        <p className="stat-value text-3xl">4.2x</p>
                        <p className="text-sm text-green-600 mt-2">↑ 0.5x from last period</p>
                    </div>
                </div>
            </div>

            {/* AI Insights Panel */}
            <div className="card mb-6 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="flex items-center mb-4">
                    <span className="text-2xl mr-2">🤖</span>
                    <h3 className="card-title">AI-Powered Insights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiInsights.map((insight, idx) => (
                        <div key={idx} className={`p-4 rounded-lg ${insight.type === 'positive' ? 'bg-green-50' :
                                insight.type === 'warning' ? 'bg-yellow-50' :
                                    'bg-blue-50'
                            }`}>
                            <div className="flex items-start">
                                <span className="text-2xl mr-3">{insight.icon}</span>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                                    <p className="text-sm text-gray-700">{insight.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Social Media Performance */}
                <div className="card">
                    <h3 className="card-title">Social Media Performance</h3>
                    <div className="chart-container">
                        <Bar data={performanceData} options={performanceOptions} />
                    </div>
                </div>

                {/* Platform Distribution */}
                <div className="card">
                    <h3 className="card-title">Platform Distribution</h3>
                    <div className="chart-container">
                        <Doughnut data={platformData} options={platformOptions} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Google Analytics Widget */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">📊</span>
                            <h3 className="font-semibold">Google Analytics</h3>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            Connected
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Sessions</p>
                            <p className="text-lg font-bold text-gray-900">25.4K</p>
                            <p className="text-xs text-green-600">↑ 8%</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Users</p>
                            <p className="text-lg font-bold text-gray-900">18.2K</p>
                            <p className="text-xs text-green-600">↑ 12%</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Pageviews</p>
                            <p className="text-lg font-bold text-gray-900">67.8K</p>
                            <p className="text-xs text-green-600">↑ 5%</p>
                        </div>
                    </div>
                    <div className="border-t pt-3">
                        <p className="text-sm text-gray-600 mb-2">Top Pages:</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700">/products</span>
                                <span className="font-semibold">12.5K views</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700">/about</span>
                                <span className="font-semibold">8.3K views</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-700">/blog</span>
                                <span className="font-semibold">6.1K views</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Campaign Analytics */}
                <div className="card">
                    <div className="flex items-center mb-4">
                        <span className="text-2xl mr-2">📧</span>
                        <h3 className="font-semibold">Email Campaign Performance</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Open Rate</p>
                            <p className="text-2xl font-bold text-blue-600">30%</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">Click Rate</p>
                            <p className="text-2xl font-bold text-green-600">8.5%</p>
                        </div>
                    </div>
                    <div className="h-48">
                        <Line data={emailMetrics} options={{ ...performanceOptions, plugins: { legend: { display: false } } }} />
                    </div>
                    <div className="mt-4 border-t pt-3">
                        <p className="text-sm text-gray-600 mb-2">Recent Campaigns:</p>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">Summer Newsletter</span>
                                <span className="text-green-600">35% open</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">Product Announcement</span>
                                <span className="text-green-600">42% open</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Audience Segmentation */}
            <div className="card mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="card-title">Audience Segmentation</h3>
                    <button className="text-sm text-primary hover:underline">View All Segments →</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {customerSegments.map((segment, idx) => (
                        <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                            <p className="text-sm font-semibold text-gray-900 mb-2">{segment.name}</p>
                            <p className="text-2xl font-bold text-primary mb-2">{segment.count}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${segment.percentage}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500">{segment.percentage}% of total</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Performing Content */}
            <div className="card">
                <h3 className="card-title">Top Performing Content</h3>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Content</th>
                                <th>Platform</th>
                                <th>Impressions</th>
                                <th>Engagement</th>
                                <th>CTR</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Summer Sale Banner</td>
                                <td>Facebook, Instagram</td>
                                <td>450K</td>
                                <td>12.4%</td>
                                <td>4.2%</td>
                                <td><span className="badge-success">Active</span></td>
                            </tr>
                            <tr>
                                <td>Product Launch Video</td>
                                <td>YouTube, TikTok</td>
                                <td>320K</td>
                                <td>15.8%</td>
                                <td>5.1%</td>
                                <td><span className="badge-success">Active</span></td>
                            </tr>
                            <tr>
                                <td>Newsletter - June</td>
                                <td>Email</td>
                                <td>180K</td>
                                <td>8.2%</td>
                                <td>3.5%</td>
                                <td><span className="badge-info">Completed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
