// Microsoft Entra Administrator Training - Interactive Script
// Professional Training Platform JavaScript

// Task definitions with comprehensive procedures
const tasks = {
    'create-user': {
        title: 'Create New User Account',
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
    'create-guest-user': {
        title: 'Create Guest User Account',
        steps: [
            {
                instruction: 'Navigate to Users section',
                details: 'In the Entra admin center, go to Identity > Users to access user management.',
                image: 'Screenshot: Users section navigation'
            },
            {
                instruction: 'Select "New guest user"',
                details: 'Click the "New user" dropdown and select "Invite external user" to create a guest account.',
                image: 'Screenshot: New guest user option'
            },
            {
                instruction: 'Enter guest user details',
                details: 'Fill in the external user\'s email address, display name, and personal message for the invitation.',
                image: 'Screenshot: Guest user invitation form'
            },
            {
                instruction: 'Configure guest permissions',
                details: 'Set the appropriate guest user permissions and assign to groups if needed.',
                image: 'Screenshot: Guest permissions configuration'
            },
            {
                instruction: 'Send invitation',
                details: 'Review the invitation details and click "Invite" to send the guest user invitation email.',
                image: 'Screenshot: Send guest invitation'
            }
        ]
    },
    'update-user-profile': {
        title: 'Update User Profile & Properties',
        steps: [
            {
                instruction: 'Locate the user account',
                details: 'Navigate to Identity > Users and search for the user whose profile needs updating.',
                image: 'Screenshot: User search interface'
            },
            {
                instruction: 'Access user profile',
                details: 'Click on the user\'s name to open their detailed profile page.',
                image: 'Screenshot: User profile page'
            },
            {
                instruction: 'Edit profile information',
                details: 'Click "Edit" and update the necessary fields such as display name, job title, department, contact information.',
                image: 'Screenshot: Edit user profile form'
            },
            {
                instruction: 'Configure additional properties',
                details: 'Update extended properties like manager, employee ID, cost center, and custom attributes as needed.',
                image: 'Screenshot: Additional user properties'
            },
            {
                instruction: 'Save changes',
                details: 'Review all changes and click "Save" to update the user profile. Changes will be reflected immediately.',
                image: 'Screenshot: Save profile changes'
            }
        ]
    },
    'delete-user': {
        title: 'Delete User Account',
        steps: [
            {
                instruction: 'Navigate to the user account',
                details: 'Go to Identity > Users and locate the user account that needs to be deleted.',
                image: 'Screenshot: User list with target user'
            },
            {
                instruction: 'Select the user',
                details: 'Click the checkbox next to the user\'s name or click on the user to open their profile.',
                image: 'Screenshot: Select user for deletion'
            },
            {
                instruction: 'Initiate deletion',
                details: 'Click the "Delete" button in the toolbar or user profile page.',
                image: 'Screenshot: Delete user button'
            },
            {
                instruction: 'Confirm deletion',
                details: 'Review the deletion warning message and confirm by typing the user\'s name if required.',
                image: 'Screenshot: Delete confirmation dialog'
            },
            {
                instruction: 'Verify deletion',
                details: 'The user is moved to "Deleted users" and can be restored within 30 days if needed.',
                image: 'Screenshot: Deleted users confirmation'
            }
        ]
    },
    'restore-deleted-user': {
        title: 'Restore Deleted User',
        steps: [
            {
                instruction: 'Access deleted users',
                details: 'Navigate to Identity > Users and click on "Deleted users" to view recently deleted accounts.',
                image: 'Screenshot: Deleted users section'
            },
            {
                instruction: 'Locate the deleted user',
                details: 'Find the user you want to restore from the list of deleted users (available for 30 days).',
                image: 'Screenshot: List of deleted users'
            },
            {
                instruction: 'Select the user to restore',
                details: 'Click the checkbox next to the user\'s name or click on the user to view details.',
                image: 'Screenshot: Select deleted user'
            },
            {
                instruction: 'Restore the user',
                details: 'Click the "Restore user" button to begin the restoration process.',
                image: 'Screenshot: Restore user button'
            },
            {
                instruction: 'Verify restoration',
                details: 'The user is restored with their previous group memberships and licenses. Verify the user appears in the active users list.',
                image: 'Screenshot: Restored user confirmation'
            }
        ]
    },
    'block-user-signin': {
        title: 'Block/Unblock User Sign-in',
        steps: [
            {
                instruction: 'Navigate to the user account',
                details: 'Go to Identity > Users and locate the user whose sign-in status needs to be changed.',
                image: 'Screenshot: User account location'
            },
            {
                instruction: 'Open user profile',
                details: 'Click on the user\'s name to access their detailed profile page.',
                image: 'Screenshot: User profile access'
            },
            {
                instruction: 'Access sign-in settings',
                details: 'Look for the "Block sign in" toggle or "Account status" section in the user\'s profile.',
                image: 'Screenshot: Sign-in status controls'
            },
            {
                instruction: 'Toggle sign-in status',
                details: 'Click the toggle to block or unblock the user\'s sign-in capability as needed.',
                image: 'Screenshot: Block/unblock toggle'
            },
            {
                instruction: 'Confirm the change',
                details: 'Save the changes and verify the user\'s sign-in status is updated. Blocked users cannot authenticate to any services.',
                image: 'Screenshot: Sign-in status confirmation'
            }
        ]
    },
    'reset-user-password': {
        title: 'Reset User Password',
        steps: [
            {
                instruction: 'Locate the user account',
                details: 'Navigate to Identity > Users and search for the user who needs a password reset.',
                image: 'Screenshot: User search for password reset'
            },
            {
                instruction: 'Access password reset',
                details: 'Click on the user\'s name, then select "Reset password" from the user profile or toolbar.',
                image: 'Screenshot: Reset password option'
            },
            {
                instruction: 'Generate or set password',
                details: 'Choose to auto-generate a secure password or create a custom one. Decide if the user must change it on first sign-in.',
                image: 'Screenshot: Password reset options'
            },
            {
                instruction: 'Configure password requirements',
                details: 'Set whether the user must change the password on next sign-in and configure any additional requirements.',
                image: 'Screenshot: Password requirements settings'
            },
            {
                instruction: 'Complete password reset',
                details: 'Click "Reset password" and securely communicate the new password to the user through approved channels.',
                image: 'Screenshot: Password reset confirmation'
            }
        ]
    },
    'assign-license': {
        title: 'Assign User License',
        steps: [
            {
                instruction: 'Navigate to user account',
                details: 'Go to Identity > Users and locate the user who needs license assignment.',
                image: 'Screenshot: User account for licensing'
            },
            {
                instruction: 'Access licenses section',
                details: 'Click on the user\'s name and select "Licenses" from the left menu in their profile.',
                image: 'Screenshot: User licenses section'
            },
            {
                instruction: 'Add license assignment',
                details: 'Click "Assignments" or "Add assignments" to begin assigning licenses to the user.',
                image: 'Screenshot: Add license assignments'
            },
            {
                instruction: 'Select license products',
                details: 'Choose the appropriate license products (Microsoft 365, Azure, etc.) from the available options.',
                image: 'Screenshot: License product selection'
            },
            {
                instruction: 'Configure license options',
                details: 'Enable or disable specific service plans within the license and set any usage location requirements.',
                image: 'Screenshot: License configuration options'
            },
            {
                instruction: 'Complete assignment',
                details: 'Review the license assignment and click "Save" to apply the licenses to the user.',
                image: 'Screenshot: License assignment confirmation'
            }
        ]
    },
    'configure-mfa': {
        title: 'Configure Multi-Factor Authentication',
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
    },
    'create-security-group': {
        title: 'Create Security Group',
        steps: [
            {
                instruction: 'Navigate to Groups section',
                details: 'In the Entra admin center, go to "Identity" then select "Groups" from the left navigation menu.',
                image: 'Screenshot: Groups navigation'
            },
            {
                instruction: 'Click "New group"',
                details: 'At the top of the Groups page, click the "New group" button to start creating a new security group.',
                image: 'Screenshot: New group button'
            },
            {
                instruction: 'Configure group settings',
                details: 'Select "Security" as the group type, enter a group name and description. Choose membership type (Assigned or Dynamic).',
                image: 'Screenshot: Group configuration form'
            },
            {
                instruction: 'Add group members',
                details: 'Add initial members to the group by searching for and selecting users from your organization.',
                image: 'Screenshot: Adding group members'
            },
            {
                instruction: 'Review and create group',
                details: 'Review the group settings and member list, then click "Create" to finalize the new security group.',
                image: 'Screenshot: Group creation confirmation'
            }
        ]
    },
    // Additional tasks (abbreviated for space - include all 37 tasks)
    'view-audit-logs': {
        title: 'View Audit Logs',
        steps: [
            {
                instruction: 'Navigate to Monitoring section',
                details: 'In the Entra admin center, go to "Monitoring & health" and select "Audit logs".',
                image: 'Screenshot: Audit logs navigation'
            },
            {
                instruction: 'Apply filters',
                details: 'Use the filter options to narrow down audit log results by date range, activity, user, or service.',
                image: 'Screenshot: Audit log filters'
            },
            {
                instruction: 'Review audit entries',
                details: 'Examine the audit log entries to understand what administrative actions were performed and by whom.',
                image: 'Screenshot: Audit log entries'
            },
            {
                instruction: 'Export audit data',
                details: 'If needed, export the audit log data to CSV format for further analysis or compliance reporting.',
                image: 'Screenshot: Export audit logs'
            }
        ]
    }
    // Note: Add all remaining tasks here following the same pattern
};

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
function init() {
    cacheElements();
    showDashboard();
    setupEventListeners();
    
    // Add smooth scrolling for hero CTA
    const heroButton = document.querySelector('.hero-cta');
    if (heroButton) {
        heroButton.addEventListener('click', scrollToTraining);
    }
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

// Setup event listeners
function setupEventListeners() {
    // Escape key to close modals
    document.addEventListener('keydown', handleKeyDown);
    
    // Click outside modal to close
    window.addEventListener('click', handleModalOutsideClick);
    
    // Smooth scroll behavior
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

// Handle smooth scrolling
function handleSmoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
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
    
    // Update page title
    document.title = 'Microsoft Entra Administrator Training | Professional Learning Platform';
}

// Start a specific task
function startTask(taskId) {
    currentTask = tasks[taskId];
    
    if (!currentTask) {
        console.error(`Task ${taskId} not found`);
        return;
    }

    currentStep = 0;
    
    if (elements.dashboard && elements.wizard) {
        elements.dashboard.style.display = 'none';
        elements.wizard.style.display = 'block';
    }
    
    updateWizardUI();
    
    // Update page title
    document.title = `${currentTask.title} | Microsoft Entra Training`;
    
    // Scroll to top of wizard
    elements.wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Update wizard UI elements
function updateWizardUI() {
    if (!currentTask || !elements.wizardTitle) return;

    const step = currentTask.steps[currentStep];
    const totalSteps = currentTask.steps.length;

    // Update title and progress
    elements.wizardTitle.textContent = currentTask.title;
    elements.stepCounter.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
    
    // Update progress bar with smooth animation
    const progressPercent = ((currentStep + 1) / totalSteps) * 100;
    elements.progressFill.style.width = progressPercent + '%';

    // Update step content
    elements.stepInstruction.textContent = step.instruction;
    elements.stepDetails.textContent = step.details;
    elements.stepImage.textContent = step.image;

    // Update button states
    updateNavigationButtons(totalSteps);
    
    // Hide completion message
    elements.completionMessage.classList.add('hidden');
    
    // Show step content
    const stepContent = document.getElementById('step-content');
    if (stepContent) {
        stepContent.style.display = 'block';
    }
}

// Update navigation button states
function updateNavigationButtons(totalSteps) {
    // Previous button
    if (elements.prevBtn) {
        elements.prevBtn.style.display = currentStep > 0 ? 'inline-flex' : 'none';
    }
    
    // Next/Complete buttons
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
    
    // Add smooth transition effect
    animateStepTransition();
}

// Navigate to previous step
function previousStep() {
    if (!currentTask || currentStep <= 0) return;
    
    currentStep--;
    updateWizardUI();
    
    // Add smooth transition effect
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
        
        // Remove transition after animation
        setTimeout(() => {
            stepContent.style.transition = '';
        }, 350);
    }
}

// Complete current task
function completeTask() {
    if (!elements.completionMessage) return;
    
    // Hide step content
    const stepContent = document.getElementById('step-content');
    if (stepContent) {
        stepContent.style.display = 'none';
    }
    
    // Show completion message with animation
    elements.completionMessage.classList.remove('hidden');
    elements.completionMessage.style.opacity = '0';
    elements.completionMessage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        elements.completionMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        elements.completionMessage.style.opacity = '1';
        elements.completionMessage.style.transform = 'scale(1)';
    }, 50);
    
    // Hide navigation buttons
    if (elements.prevBtn) elements.prevBtn.style.display = 'none';
    if (elements.nextBtn) elements.nextBtn.style.display = 'none';
    if (elements.completeBtn) elements.completeBtn.classList.add('hidden');
    
    // Update page title
    document.title = 'Task Complete | Microsoft Entra Training';
}

// Return to dashboard
function backToDashboard() {
    showDashboard();
    
    // Smooth scroll to training section
    const trainingSection = document.querySelector('.training-grid');
    if (trainingSection) {
        trainingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Scroll to training section from hero
function scrollToTraining() {
    const trainingSection = document.querySelector('.section-header');
    if (trainingSection) {
        trainingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

// Show notification (custom alert replacement)
function showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <h3>${title}</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
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
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        padding: 20px;
        position: relative;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    `;
    
    // Add to DOM and animate
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Performance optimization: Lazy load task definitions
function loadTaskDefinitions() {
    // This could be used to load task definitions from an external file
    // For now, they're included in this file for simplicity
    return tasks;
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event:', eventName, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
}

// Error handling
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    showNotification('Error', 'An unexpected error occurred. Please refresh the page and try again.', 'error');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Initialize when page loads (fallback)
window.addEventListener('load', init);

// Export functions for global access (if needed)
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
    scrollToTraining
};