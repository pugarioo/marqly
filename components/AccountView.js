"use client";

import React from 'react';

const AccountView = () => {
    return (
        <div id="accountView" className="view active">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card">
                        <h3 className="card-title mb-4">Profile Information</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-input" defaultValue="Christian" />
                                </div>
                                <div>
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-input" defaultValue="Padilla" />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Email</label>
                                <input type="email" className="form-input" defaultValue="chrisp@business.com" />
                            </div>
                            <div>
                                <label className="form-label">Company</label>
                                <input type="text" className="form-input" defaultValue="Acme Corporation" />
                            </div>
                            <div>
                                <label className="form-label">Role</label>
                                <select className="form-input">
                                    <option>Marketing Manager</option>
                                    <option>Content Creator</option>
                                    <option>Social Media Manager</option>
                                    <option>Marketing Director</option>
                                </select>
                            </div>
                            <button type="submit" className="btn-primary">Save Changes</button>
                        </form>
                    </div>

                    <div className="card">
                        <h3 className="card-title mb-4">Change Password</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="form-label">Current Password</label>
                                <input type="password" className="form-input" />
                            </div>
                            <div>
                                <label className="form-label">New Password</label>
                                <input type="password" className="form-input" />
                            </div>
                            <div>
                                <label className="form-label">Confirm New Password</label>
                                <input type="password" className="form-input" />
                            </div>
                            <button type="submit" className="btn-primary">Update Password</button>
                        </form>
                    </div>

                    <div className="card">
                        <h3 className="card-title mb-4">Notification Preferences</h3>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between">
                                <span>Email Notifications</span>
                                <input type="checkbox" className="toggle-switch" defaultChecked />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Campaign Reminders</span>
                                <input type="checkbox" className="toggle-switch" defaultChecked />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Weekly Reports</span>
                                <input type="checkbox" className="toggle-switch" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>AI Suggestions</span>
                                <input type="checkbox" className="toggle-switch" defaultChecked />
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card">
                        <h3 className="card-title mb-4">Profile Photo</h3>
                        <div className="text-center">
                            <img src="https://ui-avatars.com/api/?name=Christian+Padilla&background=007BFF&color=fff" alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <button className="btn-secondary w-full mb-2">Change Photo</button>
                            <button className="text-sm text-gray-600 hover:text-gray-900">Remove Photo</button>
                        </div>
                    </div>

                    <div className="card mt-6">
                        <h3 className="card-title mb-4">Connected Platforms</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold mr-3">f</div>
                                    <span className="font-medium">Facebook</span>
                                </div>
                                <span className="badge-success">Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center text-white font-bold mr-3">ig</div>
                                    <span className="font-medium">Instagram</span>
                                </div>
                                <span className="badge-success">Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold mr-3">tt</div>
                                    <span className="font-medium">TikTok</span>
                                </div>
                                <span className="badge-success">Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold mr-3">yt</div>
                                    <span className="font-medium">YouTube</span>
                                </div>
                                <button className="text-primary text-sm font-medium">Connect</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountView;
