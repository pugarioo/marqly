"use client";

import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import DashboardView from '../components/DashboardView';
import ContentView from '../components/ContentView';
import CampaignsView from '../components/CampaignsView';
import AnalyticsView from '../components/AnalyticsView';
import SuggestionsView from '../components/SuggestionsView';
import AccountView from '../components/AccountView';
import NotificationsView from '../components/NotificationsView';
import EmailsView from '../components/EmailsView';
import IntegrationsView from '../components/IntegrationsView';
import ContentModal from '../components/modals/ContentModal';
import CampaignModal from '../components/modals/CampaignModal';

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [contentItems, setContentItems] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal states
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // Load sample data on mount
  useEffect(() => {
    const sampleContent = [
      {
        id: 1,
        title: 'Summer Sale Announcement',
        type: 'Social Media Post',
        body: 'Get ready for our biggest sale of the year! ☀️ Up to 50% off on all summer essentials. #SummerSale #Deals',
        tags: ['Summer', 'Sale', 'Promotion'],
        platforms: ['Facebook', 'Instagram'],
        media: [
          { name: 'summer-banner.jpg', src: 'https://via.placeholder.com/800x400?text=Summer+Sale', size: 1024000 }
        ],
        createdAt: '2024-06-15T10:00:00'
      },
      {
        id: 2,
        title: 'New Product Launch: Eco-Friendly Water Bottle',
        type: 'Blog Article',
        body: 'Introducing our new sustainable water bottle line. Made from 100% recycled materials...',
        tags: ['Product Launch', 'Sustainability', 'Eco-Friendly'],
        platforms: [],
        media: [],
        createdAt: '2024-06-18T14:30:00'
      },
      {
        id: 3,
        title: 'Weekly Newsletter - June Week 3',
        type: 'Email Campaign',
        body: 'Hi {Name}, Check out what\'s new this week at Marqly...',
        tags: ['Newsletter', 'Weekly Update'],
        platforms: [],
        media: [],
        createdAt: '2024-06-20T09:00:00'
      }
    ];

    const sampleCampaigns = [
      {
        id: 1,
        name: 'Summer Sale 2024',
        contentId: 1,
        platforms: ['Facebook', 'Instagram'],
        scheduleDate: '2024-07-01',
        scheduleTime: '10:00',
        status: 'Scheduled'
      },
      {
        id: 2,
        name: 'Product Launch',
        contentId: 2,
        platforms: ['TikTok', 'YouTube'],
        scheduleDate: '2024-07-05',
        scheduleTime: '14:00',
        status: 'Draft'
      }
    ];

    setContentItems(sampleContent);
    setCampaigns(sampleCampaigns);
  }, []);

  const handleLogin = (email) => {
    setCurrentUser({ email, name: 'Christian Padilla' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSaveContent = (content) => {
    if (contentItems.find(c => c.id === content.id)) {
      setContentItems(contentItems.map(c => c.id === content.id ? content : c));
    } else {
      setContentItems([content, ...contentItems]);
    }
  };

  const handleDeleteContent = (id) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContentItems(contentItems.filter(c => c.id !== id));
    }
  };

  const handleEditContent = (id) => {
    const content = contentItems.find(c => c.id === id);
    setEditingContent(content);
    setIsContentModalOpen(true);
  };

  const handleSaveCampaign = (campaign) => {
    if (campaigns.find(c => c.id === campaign.id)) {
      setCampaigns(campaigns.map(c => c.id === campaign.id ? campaign : c));
    } else {
      setCampaigns([campaign, ...campaigns]);
    }
  };

  const handleDeleteCampaign = (id) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  const handleEditCampaign = (id) => {
    const campaign = campaigns.find(c => c.id === id);
    setEditingCampaign(campaign);
    setIsCampaignModalOpen(true);
  };

  const handleUseSuggestion = (title, content) => {
    setEditingContent({
      id: null, // New content
      title: title,
      type: 'Social Media Post', // Default
      body: content,
      tags: [],
      platforms: [],
      media: [],
      createdAt: new Date().toISOString()
    });
    setIsContentModalOpen(true);
    setCurrentView('content');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard';
      case 'content': return 'Content Management';
      case 'campaigns': return 'Campaign Management';
      case 'analytics': return 'Analytics & Reports';
      case 'suggestions': return 'AI Suggestions';
      case 'integrations': return 'Platform Integrations';
      case 'notifications': return 'Notifications';
      case 'emails': return 'Messages';
      case 'account': return 'Account Settings';
      default: return 'Marqly';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={closeSidebar}
      />

      <main className="main-content flex-1">
        <TopBar
          title={getPageTitle()}
          onNavigate={setCurrentView}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        <div className="content-wrapper">
          {currentView === 'dashboard' && (
            <DashboardView onNavigate={setCurrentView} />
          )}
          {currentView === 'content' && (
            <ContentView
              contentItems={contentItems}
              onEdit={handleEditContent}
              onDelete={handleDeleteContent}
              onOpenModal={() => {
                setEditingContent(null);
                setIsContentModalOpen(true);
              }}
            />
          )}
          {currentView === 'campaigns' && (
            <CampaignsView
              campaigns={campaigns}
              contentItems={contentItems}
              onEdit={handleEditCampaign}
              onDelete={handleDeleteCampaign}
              onOpenModal={() => {
                setEditingCampaign(null);
                setIsCampaignModalOpen(true);
              }}
            />
          )}
          {currentView === 'analytics' && <AnalyticsView />}
          {currentView === 'suggestions' && (
            <SuggestionsView onUseSuggestion={handleUseSuggestion} />
          )}
          {currentView === 'integrations' && <IntegrationsView />}
          {currentView === 'notifications' && <NotificationsView />}
          {currentView === 'emails' && <EmailsView />}
          {currentView === 'account' && <AccountView />}
        </div>
      </main>

      <ContentModal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        onSave={handleSaveContent}
        content={editingContent}
      />

      <CampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        onSave={handleSaveCampaign}
        campaign={editingCampaign}
        contentItems={contentItems}
      />
    </div>
  );
}
