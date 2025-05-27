// functions/api/import-existing.js
// Import existing hardcoded modules to KV storage

export async function onRequestPost(context) {
    try {
        const { env } = context;
        
        // Hardcoded modules from your current scripts.js
        const existingModules = {
            'create-user': {
                title: 'Create New User Account',
                category: 'User Account Management',
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
            // Add more existing modules here as needed
        };
        
        let importedCount = 0;
        
        // Import each module
        for (const [id, moduleData] of Object.entries(existingModules)) {
            const fullModuleData = {
                ...moduleData,
                id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                source: 'imported'
            };
            
            await env.TRAINING_MODULES.put(
                `module:${id}`, 
                JSON.stringify(fullModuleData),
                {
                    metadata: {
                        title: moduleData.title,
                        category: moduleData.category,
                        stepCount: moduleData.steps.length
                    }
                }
            );
            
            // Update module list
            await updateModuleList(env, id, {
                id,
                title: moduleData.title,
                category: moduleData.category,
                stepCount: moduleData.steps.length,
                updatedAt: fullModuleData.updatedAt
            });
            
            importedCount++;
        }
        
        return new Response(JSON.stringify({ 
            success: true, 
            imported: importedCount,
            message: `Successfully imported ${importedCount} training modules`
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Import existing modules error:', error);
        return new Response(`Server error: ${error.message}`, { status: 500 });
    }
}

// Utility Functions (shared across functions)

async function updateModuleList(env, moduleId, moduleInfo) {
    try {
        const currentList = await env.TRAINING_MODULES.get('module-list', 'json') || [];
        
        // Remove existing entry if it exists
        const filteredList = currentList.filter(item => item.id !== moduleId);
        
        // Add new/updated entry
        filteredList.push(moduleInfo);
        
        // Sort by title
        filteredList.sort((a, b) => a.title.localeCompare(b.title));
        
        await env.TRAINING_MODULES.put('module-list', JSON.stringify(filteredList));
        
    } catch (error) {
        console.error('Update module list error:', error);
        throw error;
    }
}

async function removeFromModuleList(env, moduleId) {
    try {
        const currentList = await env.TRAINING_MODULES.get('module-list', 'json') || [];
        const filteredList = currentList.filter(item => item.id !== moduleId);
        
        await env.TRAINING_MODULES.put('module-list', JSON.stringify(filteredList));
        
    } catch (error) {
        console.error('Remove from module list error:', error);
        throw error;
    }
}/save-module.js
// Save training module to Cloudflare KV

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const { id, data } = await request.json();
        
        // Validate required fields
        if (!id || !data || !data.title || !data.steps) {
            return new Response('Invalid module data', { status: 400 });
        }
        
        // Add metadata
        const moduleData = {
            ...data,
            id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Save to KV storage
        await env.TRAINING_MODULES.put(
            `module:${id}`, 
            JSON.stringify(moduleData),
            {
                metadata: {
                    title: data.title,
                    category: data.category || 'General',
                    stepCount: data.steps.length
                }
            }
        );
        
        // Update module list
        await updateModuleList(env, id, {
            id,
            title: data.title,
            category: data.category || 'General',
            stepCount: data.steps.length,
            updatedAt: moduleData.updatedAt
        });
        
        return new Response(JSON.stringify({ success: true, id }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Save module error:', error);
        return new Response(`Server error: ${error.message}`, { status: 500 });
    }
}
