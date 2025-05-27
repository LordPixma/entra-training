
// functions/api/export-modules.js
// Export all modules as JSON

export async function onRequestGet(context) {
    try {
        const { env } = context;
        
        // Get all modules
        const moduleList = await env.TRAINING_MODULES.get('module-list', 'json') || [];
        const allModules = [];
        
        for (const moduleInfo of moduleList) {
            const moduleData = await env.TRAINING_MODULES.get(`module:${moduleInfo.id}`, 'json');
            if (moduleData) {
                allModules.push(moduleData);
            }
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            totalModules: allModules.length,
            modules: allModules
        };
        
        return new Response(JSON.stringify(exportData, null, 2), {
            headers: { 
                'Content-Type': 'application/json',
                'Content-Disposition': 'attachment; filename="training-modules-export.json"'
            }
        });
        
    } catch (error) {
        console.error('Export modules error:', error);
        return new Response(`Server error: ${error.message}`, { status: 500 });
    }
}

// Utility Functions

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
}