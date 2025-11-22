"use client";

import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AnalyticsView = () => {
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="card">
                    <h3 className="card-title">Performance Trends</h3>
                    <div className="chart-container">
                        <Bar data={performanceData} options={performanceOptions} />
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-title">Platform Distribution</h3>
                    <div className="chart-container">
                        <Doughnut data={platformData} options={platformOptions} />
                    </div>
                </div>
            </div>

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
