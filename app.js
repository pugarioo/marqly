// Marqly - Unified Digital Marketing Management System
// Main Application Logic

const app = {
    currentUser: null,
    currentView: 'dashboard',
    contentItems: [],
    campaigns: [],
    suggestions: [],

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.renderContentGrid();
        this.renderCampaignsTable();
        this.initCharts();
    },

    // Setup event listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                this.showView(view);
            });
        });

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Content form
        const contentForm = document.getElementById('contentForm');
        if (contentForm) {
            contentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContentSubmit();
            });
        }

        // Campaign form
        const campaignForm = document.getElementById('campaignForm');
        if (campaignForm) {
            campaignForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCampaignSubmit();
            });
        }

        // Suggestion form
        const suggestionForm = document.getElementById('suggestionForm');
        if (suggestionForm) {
            suggestionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSuggestionSubmit();
            });
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterContent(e.target.textContent);
            });
        });

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeContentModal();
                    this.closeCampaignModal();
                }
            });
        });

        // Media upload drag and drop
        this.setupMediaUpload();
    },

    // Setup media upload drag and drop
    setupMediaUpload() {
        const dropZone = document.getElementById('mediaDropZone');
        const fileInput = document.getElementById('mediaFileInput');

        if (!dropZone || !fileInput) return;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            }, false);
        });

        // Handle dropped files
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.processMediaFiles(files);
            }
        }, false);
    },

    // Handle media file upload
    handleMediaUpload(event) {
        const files = event.target.files;
        if (files.length > 0) {
            this.processMediaFiles(files);
        }
    },

    // Process uploaded media files
    processMediaFiles(files) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        Array.from(files).forEach(file => {
            // Validate file type
            if (!allowedTypes.includes(file.type)) {
                this.showNotification(`File ${file.name} is not a supported image format`);
                return;
            }

            // Validate file size
            if (file.size > maxSize) {
                this.showNotification(`File ${file.name} exceeds 10MB limit`);
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                this.addMediaPreview(file.name, e.target.result, file);
            };
            reader.readAsDataURL(file);
        });
    },

    // Add media preview
    addMediaPreview(fileName, imageSrc, file) {
        const container = document.getElementById('mediaPreviewContainer');
        const grid = document.getElementById('mediaPreviewGrid');
        
        if (!container || !grid) return;

        container.classList.remove('hidden');

        const previewItem = document.createElement('div');
        previewItem.className = 'media-preview-item';
        previewItem.dataset.fileName = fileName;
        
        const uniqueId = Date.now() + Math.random();
        previewItem.innerHTML = `
            <img src="${imageSrc}" alt="${fileName}">
            <button type="button" class="remove-btn" onclick="app.removeMediaPreview('${uniqueId}')" title="Remove image">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <div class="file-name">${fileName}</div>
        `;
        previewItem.id = `media-preview-${uniqueId}`;
        previewItem.dataset.uniqueId = uniqueId;
        
        // Store file data
        previewItem.dataset.imageSrc = imageSrc;
        if (file) {
            previewItem.dataset.fileSize = file.size;
        }

        grid.appendChild(previewItem);
    },

    // Remove media preview
    removeMediaPreview(uniqueId) {
        const previewItem = document.getElementById(`media-preview-${uniqueId}`);
        if (previewItem) {
            previewItem.remove();
            this.checkMediaPreviewContainer();
        }
    },

    // Clear all media
    clearAllMedia() {
        const grid = document.getElementById('mediaPreviewGrid');
        if (grid) {
            grid.innerHTML = '';
            this.checkMediaPreviewContainer();
            // Reset file input
            const fileInput = document.getElementById('mediaFileInput');
            if (fileInput) {
                fileInput.value = '';
            }
        }
    },

    // Check if media preview container should be hidden
    checkMediaPreviewContainer() {
        const container = document.getElementById('mediaPreviewContainer');
        const grid = document.getElementById('mediaPreviewGrid');
        if (container && grid && grid.children.length === 0) {
            container.classList.add('hidden');
        }
    },

    // Get uploaded media data
    getUploadedMedia() {
        const grid = document.getElementById('mediaPreviewGrid');
        if (!grid) return [];

        const media = [];
        grid.querySelectorAll('.media-preview-item').forEach(item => {
            media.push({
                name: item.dataset.fileName,
                src: item.dataset.imageSrc,
                size: item.dataset.fileSize
            });
        });
        return media;
    },

    // Handle login
    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulate login (in real app, this would be an API call)
        if (email && password) {
            this.currentUser = { email, name: 'Christian Padilla' };
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
            this.showView('dashboard');
        }
    },

    // Handle logout
    handleLogout() {
        this.currentUser = null;
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('app').classList.add('hidden');
        document.getElementById('loginForm').reset();
    },

    // Show a specific view
    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view
        const view = document.getElementById(viewName + 'View');
        if (view) {
            view.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-view') === viewName) {
                item.classList.add('active');
            }
        });

        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            content: 'Content Management',
            campaigns: 'Campaign Management',
            analytics: 'Analytics & Reports',
            suggestions: 'AI Content Suggestions',
            account: 'Account Settings'
        };
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = titles[viewName] || 'Marqly';
        }

        this.currentView = viewName;

        // Load view-specific data
        if (viewName === 'campaigns') {
            this.renderCampaignCalendar();
        }
    },

    // Load sample data
    loadSampleData() {
        // Sample content items
        this.contentItems = [
            {
                id: 1,
                title: 'Summer Sale 2024',
                type: 'Social Media Post',
                body: 'Get ready for our biggest sale of the year! Up to 50% off on selected items. Limited time only. Shop now!',
                tags: ['sale', 'summer', 'promotion'],
                platforms: ['Facebook', 'Instagram'],
                createdAt: '2024-06-15'
            },
            {
                id: 2,
                title: 'Product Launch Announcement',
                type: 'Email',
                body: 'We are excited to announce our latest product line. Discover innovation and quality like never before.',
                tags: ['launch', 'product', 'announcement'],
                createdAt: '2024-06-14'
            },
            {
                id: 3,
                title: 'Brand Awareness Campaign',
                type: 'Ad Copy',
                body: 'Join thousands of satisfied customers who trust our brand. Experience quality and excellence.',
                tags: ['brand', 'awareness', 'trust'],
                createdAt: '2024-06-13'
            },
            {
                id: 4,
                title: 'Weekly Newsletter',
                type: 'Email',
                body: 'Stay updated with our latest news, tips, and exclusive offers. Your weekly dose of marketing insights.',
                tags: ['newsletter', 'weekly', 'updates'],
                createdAt: '2024-06-12'
            },
            {
                id: 5,
                title: 'Instagram Story Template',
                type: 'Social Media Post',
                body: 'Engage your audience with our new story template. Perfect for showcasing products and promotions.',
                tags: ['instagram', 'story', 'template'],
                platforms: ['Instagram'],
                createdAt: '2024-06-11'
            },
            {
                id: 6,
                title: 'Blog: Marketing Trends 2024',
                type: 'Blog Post',
                body: 'Explore the top marketing trends shaping 2024. Learn how to stay ahead in the digital landscape.',
                tags: ['blog', 'trends', '2024'],
                createdAt: '2024-06-10'
            }
        ];

        // Sample campaigns
        this.campaigns = [
            {
                id: 1,
                name: 'Summer Sale 2024',
                contentId: 1,
                platforms: ['Facebook', 'Instagram'],
                scheduleDate: '2024-06-20',
                scheduleTime: '10:00',
                status: 'Scheduled'
            },
            {
                id: 2,
                name: 'Product Launch',
                contentId: 2,
                platforms: ['LinkedIn', 'Twitter'],
                scheduleDate: '2024-06-18',
                scheduleTime: '14:00',
                status: 'Scheduled'
            },
            {
                id: 3,
                name: 'Brand Awareness',
                contentId: 3,
                platforms: ['Facebook', 'Instagram', 'Twitter'],
                scheduleDate: '2024-06-16',
                scheduleTime: '09:00',
                status: 'Published'
            }
        ];
    },

    // Render content grid
    renderContentGrid() {
        const grid = document.getElementById('contentGrid');
        if (!grid) return;

        grid.innerHTML = '';

        this.contentItems.forEach(item => {
            const platforms = item.platforms && item.platforms.length > 0 
                ? `<div class="mt-2 flex flex-wrap gap-1">
                    ${item.platforms.map(p => `<span class="text-xs px-2 py-1 bg-blue-50 text-primary rounded-full font-medium">${p}</span>`).join('')}
                   </div>`
                : '';
            
            // Media preview
            const mediaPreview = item.media && item.media.length > 0
                ? `<div class="mt-3 grid gap-2" style="grid-template-columns: repeat(${Math.min(item.media.length, 3)}, 1fr);">
                    ${item.media.slice(0, 3).map(media => `
                        <div class="relative rounded-lg overflow-hidden border-2 border-gray-200">
                            <img src="${media.src}" alt="${media.name}" class="w-full h-24 object-cover">
                        </div>
                    `).join('')}
                    ${item.media.length > 3 ? `<div class="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                        <span class="text-xs font-medium text-gray-600">+${item.media.length - 3} more</span>
                    </div>` : ''}
                   </div>`
                : '';
            
            const card = document.createElement('div');
            card.className = 'content-card';
            card.innerHTML = `
                <div class="content-card-header">
                    <div>
                        <h4 class="content-card-title">${item.title}</h4>
                        <span class="content-card-type">${item.type}</span>
                    </div>
                </div>
                ${mediaPreview}
                <div class="content-card-body">${item.body}</div>
                ${platforms}
                <div class="content-card-footer">
                    <div class="text-sm text-gray-500">${this.formatDate(item.createdAt)}</div>
                    <div class="content-card-actions">
                        <button onclick="app.editContent(${item.id})" class="action-btn action-btn-edit">Edit</button>
                        <button onclick="app.deleteContent(${item.id})" class="action-btn action-btn-delete">Delete</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    // Render campaigns table
    renderCampaignsTable() {
        const tbody = document.getElementById('campaignsTable');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.campaigns.forEach(campaign => {
            const content = this.contentItems.find(c => c.id === campaign.contentId);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="font-semibold">${campaign.name}</td>
                <td>${content ? content.title : 'N/A'}</td>
                <td>${campaign.platforms.join(', ')}</td>
                <td>${campaign.scheduleDate} at ${campaign.scheduleTime}</td>
                <td><span class="badge-${campaign.status === 'Published' ? 'success' : 'warning'}">${campaign.status}</span></td>
                <td>
                    <button onclick="app.editCampaign(${campaign.id})" class="action-btn action-btn-edit text-xs">Edit</button>
                    <button onclick="app.deleteCampaign(${campaign.id})" class="action-btn action-btn-delete text-xs">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    },

    // Render campaign calendar
    renderCampaignCalendar() {
        const calendar = document.getElementById('campaignCalendar');
        if (!calendar) return;

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        let html = `
            <div class="mb-4">
                <h4 class="text-lg font-semibold mb-2">${today.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
            </div>
            <div class="grid grid-cols-7 gap-2">
                ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => 
                    `<div class="text-center font-semibold text-gray-600 text-sm py-2">${day}</div>`
                ).join('')}
        `;

        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div class="h-16"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasCampaign = this.campaigns.some(c => c.scheduleDate === dateStr);
            const isToday = day === today.getDate() && currentMonth === today.getMonth();
            
            html += `
                <div class="h-16 border-2 ${isToday ? 'border-primary' : 'border-gray-200'} rounded-lg p-2 ${hasCampaign ? 'bg-blue-50' : 'bg-white'} ${isToday ? 'font-bold' : ''}">
                    <div class="text-sm">${day}</div>
                    ${hasCampaign ? '<div class="w-2 h-2 bg-primary rounded-full mt-1"></div>' : ''}
                </div>
            `;
        }

        html += '</div>';
        calendar.innerHTML = html;
    },

    // Open content modal
    openContentModal(contentId = null) {
        const modal = document.getElementById('contentModal');
        const form = document.getElementById('contentForm');
        const title = document.getElementById('contentModalTitle');
        const platformSelection = document.getElementById('platformSelection');
        const contentType = document.getElementById('contentType');

        // Clear media previews
        this.clearAllMedia();

        if (contentId) {
            // Edit mode
            const content = this.contentItems.find(c => c.id === contentId);
            if (content) {
                document.getElementById('contentTitle').value = content.title;
                contentType.value = content.type;
                document.getElementById('contentBody').value = content.body;
                document.getElementById('contentTags').value = content.tags.join(', ');
                
                // Handle platform selection
                if (content.type === 'Social Media Post') {
                    platformSelection.classList.remove('hidden');
                    if (content.platforms && content.platforms.length > 0) {
                        document.querySelectorAll('input[name="contentPlatform"]').forEach(cb => {
                            const platformName = cb.value.charAt(0).toUpperCase() + cb.value.slice(1);
                            cb.checked = content.platforms.includes(platformName);
                        });
                    }
                } else {
                    platformSelection.classList.add('hidden');
                }

                // Load existing media
                if (content.media && content.media.length > 0) {
                    content.media.forEach(mediaItem => {
                        this.addMediaPreview(mediaItem.name, mediaItem.src, null);
                    });
                }
                
                title.textContent = 'Edit Content';
                form.dataset.contentId = contentId;
            }
        } else {
            // Create mode
            form.reset();
            // Check if default selection is Social Media Post
            if (contentType.value === 'Social Media Post') {
                platformSelection.classList.remove('hidden');
            } else {
                platformSelection.classList.add('hidden');
            }
            title.textContent = 'Create New Content';
            delete form.dataset.contentId;
        }

        modal.classList.add('active');
    },

    // Close content modal
    closeContentModal() {
        const modal = document.getElementById('contentModal');
        modal.classList.remove('active');
        document.getElementById('contentForm').reset();
        this.clearAllMedia();
    },

    // Handle content type change
    handleContentTypeChange() {
        const contentType = document.getElementById('contentType').value;
        const platformSelection = document.getElementById('platformSelection');
        
        if (contentType === 'Social Media Post') {
            platformSelection.classList.remove('hidden');
            // Add a smooth transition
            setTimeout(() => {
                platformSelection.style.opacity = '1';
            }, 10);
        } else {
            platformSelection.classList.add('hidden');
            // Clear platform selections
            document.querySelectorAll('input[name="contentPlatform"]').forEach(cb => {
                cb.checked = false;
            });
        }
    },

    // Handle content form submit
    handleContentSubmit() {
        const form = document.getElementById('contentForm');
        const contentId = form.dataset.contentId;
        const title = document.getElementById('contentTitle').value;
        const type = document.getElementById('contentType').value;
        const body = document.getElementById('contentBody').value;
        const tags = document.getElementById('contentTags').value.split(',').map(t => t.trim());
        
        // Get selected platforms if Social Media Post
        let platforms = [];
        if (type === 'Social Media Post') {
            document.querySelectorAll('input[name="contentPlatform"]:checked').forEach(cb => {
                platforms.push(cb.value.charAt(0).toUpperCase() + cb.value.slice(1));
            });
            
            // Validate that at least one platform is selected
            if (platforms.length === 0) {
                this.showNotification('Please select at least one platform for Social Media Post');
                return;
            }
        }

        // Get uploaded media
        const media = this.getUploadedMedia();

        if (contentId) {
            // Update existing
            const index = this.contentItems.findIndex(c => c.id === parseInt(contentId));
            if (index !== -1) {
                this.contentItems[index] = {
                    ...this.contentItems[index],
                    title,
                    type,
                    body,
                    tags,
                    platforms: platforms.length > 0 ? platforms : this.contentItems[index].platforms || [],
                    media: media.length > 0 ? media : this.contentItems[index].media || []
                };
            }
        } else {
            // Create new
            const newId = Math.max(...this.contentItems.map(c => c.id), 0) + 1;
            this.contentItems.push({
                id: newId,
                title,
                type,
                body,
                tags,
                platforms: platforms,
                media: media,
                createdAt: new Date().toISOString().split('T')[0]
            });
        }

        this.renderContentGrid();
        this.closeContentModal();
        this.showNotification('Content saved successfully!');
    },

    // Edit content
    editContent(id) {
        this.openContentModal(id);
    },

    // Delete content
    deleteContent(id) {
        if (confirm('Are you sure you want to delete this content?')) {
            this.contentItems = this.contentItems.filter(c => c.id !== id);
            this.renderContentGrid();
            this.showNotification('Content deleted successfully!');
        }
    },

    // Open campaign modal
    openCampaignModal(campaignId = null) {
        const modal = document.getElementById('campaignModal');
        const form = document.getElementById('campaignForm');
        const contentSelect = document.getElementById('campaignContent');

        // Populate content dropdown
        contentSelect.innerHTML = '<option>Select content...</option>';
        this.contentItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.title;
            contentSelect.appendChild(option);
        });

        if (campaignId) {
            // Edit mode
            const campaign = this.campaigns.find(c => c.id === campaignId);
            if (campaign) {
                document.getElementById('campaignName').value = campaign.name;
                document.getElementById('campaignContent').value = campaign.contentId;
                document.getElementById('campaignDate').value = campaign.scheduleDate;
                document.getElementById('campaignTime').value = campaign.scheduleTime;
                form.dataset.campaignId = campaignId;
            }
        } else {
            // Create mode
            form.reset();
            delete form.dataset.campaignId;
        }

        modal.classList.add('active');
    },

    // Close campaign modal
    closeCampaignModal() {
        const modal = document.getElementById('campaignModal');
        modal.classList.remove('active');
        document.getElementById('campaignForm').reset();
    },

    // Handle campaign form submit
    handleCampaignSubmit() {
        const form = document.getElementById('campaignForm');
        const campaignId = form.dataset.campaignId;
        const name = document.getElementById('campaignName').value;
        const contentId = parseInt(document.getElementById('campaignContent').value);
        const date = document.getElementById('campaignDate').value;
        const time = document.getElementById('campaignTime').value;

        // Get selected platforms
        const platforms = [];
        document.querySelectorAll('#campaignForm input[type="checkbox"]:checked').forEach(cb => {
            platforms.push(cb.value.charAt(0).toUpperCase() + cb.value.slice(1));
        });

        if (campaignId) {
            // Update existing
            const index = this.campaigns.findIndex(c => c.id === parseInt(campaignId));
            if (index !== -1) {
                this.campaigns[index] = {
                    ...this.campaigns[index],
                    name,
                    contentId,
                    platforms,
                    scheduleDate: date,
                    scheduleTime: time,
                    status: 'Scheduled'
                };
            }
        } else {
            // Create new
            const newId = Math.max(...this.campaigns.map(c => c.id), 0) + 1;
            this.campaigns.push({
                id: newId,
                name,
                contentId,
                platforms,
                scheduleDate: date,
                scheduleTime: time,
                status: 'Scheduled'
            });
        }

        this.renderCampaignsTable();
        this.renderCampaignCalendar();
        this.closeCampaignModal();
        this.showNotification('Campaign scheduled successfully!');
    },

    // Edit campaign
    editCampaign(id) {
        this.openCampaignModal(id);
    },

    // Delete campaign
    deleteCampaign(id) {
        if (confirm('Are you sure you want to delete this campaign?')) {
            this.campaigns = this.campaigns.filter(c => c.id !== id);
            this.renderCampaignsTable();
            this.renderCampaignCalendar();
            this.showNotification('Campaign deleted successfully!');
        }
    },

    // Handle suggestion form submit
    handleSuggestionSubmit() {
        const type = document.getElementById('suggestionType').value;
        const topic = document.getElementById('suggestionTopic').value;
        const audience = document.getElementById('suggestionAudience').value;
        const tone = document.getElementById('suggestionTone').value;

        // Simulate AI generation
        const suggestions = this.generateAISuggestions(type, topic, audience, tone);
        this.displaySuggestions(suggestions);
        this.showNotification('AI suggestions generated!');
    },

    // Generate AI suggestions (simulated)
    generateAISuggestions(type, topic, audience, tone) {
        const suggestions = [
            {
                title: `${type} - Option 1`,
                content: `Engage your ${audience} with this compelling ${tone.toLowerCase()} message about ${topic}. This approach focuses on building connection and driving action through clear, impactful communication.`,
                score: 95
            },
            {
                title: `${type} - Option 2`,
                content: `A ${tone.toLowerCase()} take on ${topic} designed specifically for ${audience}. This version emphasizes benefits and creates urgency while maintaining authenticity.`,
                score: 88
            },
            {
                title: `${type} - Option 3`,
                content: `This ${tone.toLowerCase()} content piece about ${topic} speaks directly to ${audience}. It balances information with emotion to create memorable engagement.`,
                score: 82
            }
        ];

        return suggestions;
    },

    // Display suggestions
    displaySuggestions(suggestions) {
        const container = document.getElementById('suggestionsList');
        if (!container) return;

        container.innerHTML = '';

        suggestions.forEach((suggestion, index) => {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.innerHTML = `
                <div class="suggestion-card-header">
                    <div>
                        <h4 class="suggestion-card-title">${suggestion.title}</h4>
                        <div class="text-sm text-gray-500">AI Score: ${suggestion.score}/100</div>
                    </div>
                </div>
                <div class="suggestion-card-body">${suggestion.content}</div>
                <div class="suggestion-card-footer">
                    <button onclick="app.useSuggestion(${index})" class="btn-primary text-sm">Use This</button>
                    <button onclick="app.regenerateSuggestion(${index})" class="btn-secondary text-sm">Regenerate</button>
                </div>
            `;
            container.appendChild(card);
        });
    },

    // Use suggestion
    useSuggestion(index) {
        const container = document.getElementById('suggestionsList');
        const card = container.children[index];
        const content = card.querySelector('.suggestion-card-body').textContent;
        const title = card.querySelector('.suggestion-card-title').textContent;

        // Pre-fill content form
        this.showView('content');
        setTimeout(() => {
            this.openContentModal();
            document.getElementById('contentTitle').value = title;
            document.getElementById('contentBody').value = content;
        }, 100);

        this.showNotification('Suggestion loaded into content form!');
    },

    // Regenerate suggestion
    regenerateSuggestion(index) {
        // Simulate regeneration
        this.showNotification('Regenerating suggestion...');
        setTimeout(() => {
            this.handleSuggestionSubmit();
        }, 500);
    },

        // Filter content
    filterContent(filter) {
        const grid = document.getElementById('contentGrid');
        if (!grid) return;

        if (filter === 'All') {
            this.renderContentGrid();
            return;
        }

        const filtered = this.contentItems.filter(item => {
            if (filter === 'Social Media') return item.type.includes('Social');
            if (filter === 'Email') return item.type === 'Email';
            if (filter === 'Blog') return item.type.includes('Blog');
            if (filter === 'Ads') return item.type.includes('Ad');
            return true;
        });

        grid.innerHTML = '';
        filtered.forEach(item => {
            const platforms = item.platforms && item.platforms.length > 0 
                ? `<div class="mt-2 flex flex-wrap gap-1">
                    ${item.platforms.map(p => `<span class="text-xs px-2 py-1 bg-blue-50 text-primary rounded-full font-medium">${p}</span>`).join('')}
                   </div>`
                : '';
            
            // Media preview
            const mediaPreview = item.media && item.media.length > 0
                ? `<div class="mt-3 grid gap-2" style="grid-template-columns: repeat(${Math.min(item.media.length, 3)}, 1fr);">
                    ${item.media.slice(0, 3).map(media => `
                        <div class="relative rounded-lg overflow-hidden border-2 border-gray-200">
                            <img src="${media.src}" alt="${media.name}" class="w-full h-24 object-cover">
                        </div>
                    `).join('')}
                    ${item.media.length > 3 ? `<div class="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                        <span class="text-xs font-medium text-gray-600">+${item.media.length - 3} more</span>
                    </div>` : ''}
                   </div>`
                : '';
            
            const card = document.createElement('div');
            card.className = 'content-card';
            card.innerHTML = `
                <div class="content-card-header">
                    <div>
                        <h4 class="content-card-title">${item.title}</h4>
                        <span class="content-card-type">${item.type}</span>
                    </div>
                </div>
                ${mediaPreview}
                <div class="content-card-body">${item.body}</div>
                ${platforms}
                <div class="content-card-footer">
                    <div class="text-sm text-gray-500">${this.formatDate(item.createdAt)}</div>
                    <div class="content-card-actions">
                        <button onclick="app.editContent(${item.id})" class="action-btn action-btn-edit">Edit</button>
                        <button onclick="app.deleteContent(${item.id})" class="action-btn action-btn-delete">Delete</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    // Initialize charts
    initCharts() {
        // Engagement Chart
        const engagementCtx = document.getElementById('engagementChart');
        if (engagementCtx) {
            new Chart(engagementCtx, {
                type: 'line',
                data: {
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
                },
                options: {
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
                }
            });
        }

        // Performance Chart
        const performanceCtx = document.getElementById('performanceChart');
        if (performanceCtx) {
            new Chart(performanceCtx, {
                type: 'bar',
                data: {
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
                },
                options: {
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
                }
            });
        }

        // Platform Chart
        const platformCtx = document.getElementById('platformChart');
        if (platformCtx) {
            new Chart(platformCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'],
                    datasets: [{
                        data: [35, 30, 20, 15],
                        backgroundColor: [
                            '#4A90E2',
                            '#FF7A8A',
                            '#2C3E50',
                            '#0077B5'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
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
                }
            });
        }
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-white border-l-4 border-primary shadow-xl rounded-lg p-4 z-50 animate-slide-in';
        notification.style.borderLeftColor = 'var(--primary)';
        notification.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-900 font-medium">${message}</span>
            </div>
        `;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Make app globally available
window.app = app;

