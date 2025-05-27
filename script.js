// Microsoft Entra Administrator Training - Dynamic Module Loading
// Professional Training Platform JavaScript with Dynamic Content

// Dynamic task loading
let tasks = {};
let categorizedTasks = {};

// Application state
let currentTask = null;
let currentStep = 0;

// DOM elements cache
const elements = {
    dashboard: null,
    wizard: null,
    wizardTitle: null,
    stepCounter: null,
    progressFill: null,
    stepInstruction: null,
    stepDetails: null,
    stepImage: null,
    prevBtn: null,
    nextBtn: null,
    completeBtn: null,
    completionMessage: null
};

// Initialize the application
async function init() {
    console.log('Initializing dynamic training app...');
    cacheElements();
    
    // Load modules dynamically
    await loadTrainingModules();
    
    showDashboard();
    setupEventListeners();
    setupHeroCTA();
}

// Load training modules from Cloudflare KV
async function loadTrainingModules() {
    try {
        showLoadingState();
        
        // First try to load from API
        const response = await fetch('/api/load-modules');
        
        if (response.ok) {
            const dynamicModules = await response.json();
            tasks = { ...tasks, ...dynamicModules };
            
            console.log(`Loaded ${Object.keys(dynamicModules).length} dynamic modules`);
        } else {
            console.log('No dynamic modules found, using static modules');
            // Fall back to hardcoded modules if API fails
            loadStaticModules();
        }
        
        // Categorize tasks for display
        categorizeModules();
        
        // Render the training grid
        renderTrainingGrid();
        
        hideLoadingState();
        
    } catch (error) {
        console.error('Error loading training modules:', error);
        // Fall back to static modules
        loadStaticModules();
        categorizeModules();
        renderTrainingGrid();
        hideLoadingState();
    }
}

// Fallback static modules (your existing ones)
function loadStaticModules() {
    tasks = {
        'create-user': {
            title: 'Create New User Account',
            category: 'User Account Management',
            icon: '✨',
            steps: [
                {
                    instruction: 'Navigate to the Microsoft Entra admin center',
                    details: 'Open your web browser and go to entra.microsoft.com. Sign in with your administrator credentials.',
                    image: 'Screenshot: Entra admin center login page'
                },
                {
                    instruction: 'Access the Users section',
                    details: 'In the left navigation panel, click on "Identity" then select "Users" to view the user management interface.',
                    image: 'Screenshot: Navigation to Users section'
                },
                {
                    instruction: 'Click "New user" button',
                    details: 'At the top of the Users page, click the "New user" button to start creating a new user account.',
                    image: 'Screenshot: New user button highlighted'
                },
                {
                    instruction: 'Fill in user details',
                    details: 'Enter the required information: Display name, User principal name, and initial password. Choose whether to auto-generate or create a custom password.',
                    image: 'Screenshot: User creation form'
                },
                {
                    instruction: 'Review and create the user',
                    details: 'Review all the information entered, then click "Create" to finalize the new user account. The user will receive welcome instructions via email.',
                    image: 'Screenshot: User creation confirmation'
                }
            ]
        },
        'configure-mfa': {
            title: 'Configure Multi-Factor Authentication',
            category: 'Authentication & Security',
            icon: '🔒',
            steps: [
                {
                    instruction: 'Navigate to Security settings',
                    details: 'In the Entra admin center, go to "Protection" in the left menu, then select "Authentication methods".',
                    image: 'Screenshot: Security settings navigation'
                },
                {
                    instruction: 'Select MFA settings',
                    details: 'Click on "Multi-factor authentication" to access the MFA configuration options.',
                    image: 'Screenshot: MFA settings page'
                },
                {
                    instruction: 'Configure authentication methods',
                    details: 'Enable the desired authentication methods such as Microsoft Authenticator app, SMS, or phone calls. Set policies for which methods are required.',
                    image: 'Screenshot: Authentication methods configuration'
                },
                {
                    instruction: 'Set user requirements',
                    details: 'Define which users or groups require MFA. You can apply it to all users, specific groups, or based on conditional access policies.',
                    image: 'Screenshot: User MFA requirements'
                },
                {
                    instruction: 'Test and verify MFA setup',
                    details: 'Test the MFA configuration with a test user account to ensure it works correctly before applying to all users.',
                    image: 'Screenshot: MFA testing interface'
                }
            ]
        }
        // Add more static fallback modules as needed
    };
}

// Categorize modules by category
function categorizeModules() {
    categorizedTasks = {};
    
    // Category icons mapping
    const categoryIcons = {
        'User Account Management': '👥',
        'Password Management': '🔑',
        'License Management': '📋',
        'Group Management': '👪',
        'Authentication & Security': '🔐',
        'B2B Guest Management': '🌐',
        'Directory Settings': '⚙️',
        'Monitoring & Reports': '📊',
        'Device Management': '📱'
    };
    
    Object.entries(tasks).forEach(([id, task]) => {
        const category = task.category || 'General';
        const icon = task.icon || categoryIcons[category] || '📄';
        
        if (!categorizedTasks[category]) {
            categorizedTasks[category] = {
                icon: categoryIcons[category] || '📄',
                tasks: []
            };
        }
        
        categorizedTasks[category].tasks.push({
            id,
            ...task,
            icon
        });
    });
}

// Render the training grid dynamically
function renderTrainingGrid() {
    const gridContainer = document.querySelector('.training-grid');
    if (!gridContainer) return;
    
    const categoryCards = Object.entries(categorizedTasks).map(([categoryName, categoryData]) => {
        const taskButtons = categoryData.tasks.map(task => `
            <button class="task-button" onclick="startTask('${task.id}')">
                <span class="task-icon">${task.icon}</span>
                ${task.title}
            </button>
        `).join('');
        
        return `
            <div class="category-card">
                <div class="card-header">
                    <div class="card-icon">${categoryData.icon}</div>
                    <h3>${categoryName}</h3>
                    <p>${getCategoryDescription(categoryName)}</p>
                </div>
                <div class="card-tasks">
                    ${taskButtons}
                </div>
            </div>
        `;
    }).join('');
    
    gridContainer.innerHTML = categoryCards;
    
    // Update stats in hero section
    updateHeroStats();
}

// Get category descriptions
function getCategoryDescription(category) {
    const descriptions = {
        'User Account Management': 'Master user lifecycle management and account administration',
        'Password Management': 'Handle password resets and security for all user types',
        'License Management': 'Efficiently manage Microsoft 365 and Azure licenses',
        'Group Management': 'Create and manage security groups and Microsoft 365 groups',
        'Authentication & Security': 'Implement robust security policies and authentication',
        'B2B Guest Management': 'Manage external collaborators and guest access',
        'Directory Settings': 'Configure organizational policies and administrative units',
        'Monitoring & Reports': 'Track activity, monitor health, and generate reports',
        'Device Management': 'Manage device registration and compliance policies'
    };
    
    return descriptions[category] || 'Training modules for this category';
}

// Update hero statistics
function updateHeroStats() {
    const totalModules = Object.keys(tasks).length;
    const totalCategories = Object.keys(categorizedTasks).length;
    
    // Update hero stats if elements exist
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 2) {
        statNumbers[0].textContent = totalModules;
        statNumbers[1].textContent = totalCategories;
    }
}

// Show loading state
function showLoadingState() {
    const gridContainer = document.querySelector('.training-grid');
    if (gridContainer) {
        gridContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #6b7280;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
                <h3>Loading Training Modules...</h3>
                <p>Fetching the latest training content for you.</p>
            </div>
        `;
    }
}

// Hide loading state
function hideLoadingState() {
    // Loading state is replaced by rendered content
}

// Cache DOM elements for better performance
function cacheElements() {
    elements.dashboard = document.getElementById('dashboard');
    elements.wizard = document.getElementById('wizard');
    elements.wizardTitle = document.getElementById('wizard-title');
    elements.stepCounter = document.getElementById('step-counter');
    elements.progressFill = document.getElementById('progress-fill');
    elements.stepInstruction = document.getElementById('step-instruction');
    elements.stepDetails = document.getElementById('step-details');
    elements.stepImage = document.getElementById('step-image');
    elements.prevBtn = document.getElementById('prev-btn');
    elements.nextBtn = document.getElementById('next-btn');
    elements.completeBtn = document.getElementById('complete-btn');
    elements.completionMessage = document.getElementById('completion-message');
}

// Setup hero call-to-action button
function setupHeroCTA() {
    const heroButton = document.querySelector('.hero-cta');
    if (heroButton) {
        console.log('Hero CTA button found, attaching event listener');
        heroButton.removeAttribute('onclick');
        
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hero CTA clicked');
            scrollToTraining();
        });
    } else {
        console.log('Hero CTA button not found');
        setTimeout(setupHeroCTA, 100);
    }
}

// Setup event listeners
function setupEventListeners() {
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleModalOutsideClick);
    
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
}

// Handle keyboard events
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        closeAllModals();
    }
}

// Handle modal outside clicks
function handleModalOutsideClick(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// Handle smooth scrolling for anchor links
function handleSmoothScroll(event) {
    const href = event.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
        event.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Show dashboard view
function showDashboard() {
    if (elements.dashboard && elements.wizard) {
        elements.dashboard.style.display = 'block';
        elements.wizard.style.display = 'none';
    }
    
    currentTask = null;
    currentStep = 0;
    
    document.title = 'Microsoft Entra Administrator Training | Professional Learning Platform';
}

// Start a specific task with enhanced error handling
function startTask(taskId) {
    console.log(`Starting task: ${taskId}`);
    
    currentTask = tasks[taskId];
    
    if (!currentTask) {
        console.error(`Task ${taskId} not found`);
        showNotification('Task Not Found', 
            `The requested training module "${taskId}" is not available. The content may be loading or temporarily unavailable.`, 
            'error'
        );
        return;
    }

    currentStep = 0;
    
    if (elements.dashboard && elements.wizard) {
        elements.dashboard.style.display = 'none';
        elements.wizard.style.display = 'block';
    }
    
    updateWizardUI();
    
    document.title = `${currentTask.title} | Microsoft Entra Training`;
    
    if (elements.wizard) {
        elements.wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    trackEvent('task_started', { taskId, taskTitle: currentTask.title });
}

// Update wizard UI elements with enhanced error handling
function updateWizardUI() {
    if (!currentTask) {
        console.error('No current task available');
        return;
    }
    
    if (!elements.wizardTitle) {
        console.error('Wizard elements not properly cached');
        return;
    }

    const step = currentTask.steps[currentStep];
    const totalSteps = currentTask.steps.length;

    elements.wizardTitle.textContent = currentTask.title;
    elements.stepCounter.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
    
    const progressPercent = ((currentStep + 1) / totalSteps) * 100;
    elements.progressFill.style.width = progressPercent + '%';

    elements.stepInstruction.textContent = step.instruction;
    elements.stepDetails.textContent = step.details;
    elements.stepImage.textContent = step.image;

    updateNavigationButtons(totalSteps);
    
    elements.completionMessage.classList.add('hidden');
    
    const stepContent = document.getElementById('step-content');
    if (stepContent) {
        stepContent.style.display = 'block';
    }
}

// Update navigation button states
function updateNavigationButtons(totalSteps) {
    if (elements.prevBtn) {
        elements.prevBtn.style.display = currentStep > 0 ? 'inline-flex' : 'none';
    }
    
    if (currentStep < totalSteps - 1) {
        if (elements.nextBtn) elements.nextBtn.style.display = 'inline-flex';
        if (elements.completeBtn) elements.completeBtn.classList.add('hidden');
    } else {
        if (elements.nextBtn) elements.nextBtn.style.display = 'none';
        if (elements.completeBtn) elements.completeBtn.classList.remove('hidden');
    }
}

// Navigate to next step
function nextStep() {
    if (!currentTask || currentStep >= currentTask.steps.length - 1) return;
    
    currentStep++;
    updateWizardUI();
    animateStepTransition();
    
    trackEvent('step_completed', { 
        taskId: Object.keys(tasks).find(key => tasks[key] === currentTask),
        step: currentStep,
        totalSteps: currentTask.steps.length 
    });
}

// Navigate to previous step
function previousStep() {
    if (!currentTask || currentStep <= 0) return;
    
    currentStep--;
    updateWizardUI();
    animateStepTransition();
}

// Add smooth transition animation
function animateStepTransition() {
    const stepContent = document.getElementById('step-content');
    if (stepContent) {
        stepContent.style.opacity = '0';
        stepContent.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            stepContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            stepContent.style.opacity = '1';
            stepContent.style.transform = 'translateX(0)';
        }, 50);
        
        setTimeout(() => {
            stepContent.style.transition = '';
        }, 350);
    }
}

// Complete current task
function completeTask() {
    if (!elements.completionMessage || !currentTask) return;
    
    const stepContent = document.getElementById('step-content');
    if (stepContent) {
        stepContent.style.display = 'none';
    }
    
    elements.completionMessage.classList.remove('hidden');
    elements.completionMessage.style.opacity = '0';
    elements.completionMessage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        elements.completionMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        elements.completionMessage.style.opacity = '1';
        elements.completionMessage.style.transform = 'scale(1)';
    }, 50);
    
    if (elements.prevBtn) elements.prevBtn.style.display = 'none';
    if (elements.nextBtn) elements.nextBtn.style.display = 'none';
    if (elements.completeBtn) elements.completeBtn.classList.add('hidden');
    
    document.title = 'Task Complete | Microsoft Entra Training';
    
    trackEvent('task_completed', { 
        taskId: Object.keys(tasks).find(key => tasks[key] === currentTask),
        taskTitle: currentTask.title,
        totalSteps: currentTask.steps.length 
    });
}

// Return to dashboard
function backToDashboard() {
    showDashboard();
    
    const trainingSection = document.querySelector('.training-grid');
    if (trainingSection) {
        trainingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Scroll to training section from hero
function scrollToTraining() {
    const selectors = ['.main-content', '.section-header', '.training-grid', '#dashboard'];
    
    let targetElement = null;
    for (const selector of selectors) {
        targetElement = document.querySelector(selector);
        if (targetElement) break;
    }
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 20;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
}

// Refresh modules (for admin use)
async function refreshModules() {
    await loadTrainingModules();
    showNotification('Training Modules Updated', 'Successfully loaded the latest training content!', 'success');
}

// Modal functions
function showLicenseInfo() {
    const modal = document.getElementById('license-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
        }, 10);
    }
}

function showContributeInfo() {
    showNotification('Want to contribute?', 
        '1. Fork the repository on GitHub\n2. Make your improvements\n3. Submit a pull request\n\nThanks for helping improve this training resource!', 
        'info'
    );
}

function showAbout() {
    showNotification('Microsoft Entra Administrator Training',
        'An open-source, interactive training platform for learning Microsoft Entra ID administration tasks.\n\nBuilt with vanilla HTML, CSS, and JavaScript.\nLicensed under GNU GPL v3.0\n\nNot affiliated with Microsoft Corporation.',
        'info'
    );
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.style.transition = '';
        }, 300);
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
}

// Enhanced notification system
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <h3>${title}</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
        z-index: 1001;
        max-width: 400px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        border-left: 4px solid ${type === 'error' ? '#dc2626' : type === 'warning' ? '#d97706' : '#059669'};
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = 'padding: 20px; position: relative;';
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        position: absolute; top: 10px; right: 15px; background: none; border: none;
        font-size: 24px; cursor: pointer; color: #666; transition: color 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#333');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = '#666');
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Analytics tracking
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    
    const eventData = {
        ...properties,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };
    
    // Add your analytics service here
    // Example: gtag('event', eventName, eventData);
}

// Error handling with user feedback
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    trackEvent('error_occurred', {
        context,
        error: error.message,
        stack: error.stack
    });
    
    showNotification('Error', 
        'An unexpected error occurred. Please refresh the page and try again.',
        'error'
    );
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', init);

// Global error handlers
window.addEventListener('error', (event) => {
    handleError(event.error, 'Global error handler');
});

window.addEventListener('unhandledrejection', (event) => {
    handleError(new Error(event.reason), 'Unhandled promise rejection');
});

// Make functions globally available
window.scrollToTraining = scrollToTraining;
window.startTask = startTask;
window.nextStep = nextStep;
window.previousStep = previousStep;
window.completeTask = completeTask;
window.backToDashboard = backToDashboard;
window.showLicenseInfo = showLicenseInfo;
window.showContributeInfo = showContributeInfo;
window.showAbout = showAbout;
window.closeModal = closeModal;
window.refreshModules = refreshModules;

// Export the main training app
window.TrainingApp = {
    init,
    startTask,
    nextStep,
    previousStep,
    completeTask,
    backToDashboard,
    showLicenseInfo,
    showContributeInfo,
    showAbout,
    closeModal,
    scrollToTraining,
    trackEvent,
    handleError,
    refreshModules,
    loadTrainingModules
};