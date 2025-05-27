// functions/api/load-modules.js
// Load all modules for the training site

export async function onRequestGet(context) {
    try {
        const { env } = context;
        
        // Get all modules from KV
        const moduleList = await env.TRAINING_MODULES.get('module-list', 'json') || [];
        const modules = {};
        
        // Load each module
        for (const moduleInfo of moduleList) {
            const moduleData = await env.TRAINING_MODULES.get(`module:${moduleInfo.id}`, 'json');
            if (moduleData) {
                modules[moduleInfo.id] = moduleData;
            }
        }
        
        return new Response(JSON.stringify(modules), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
            }
        });
        
    } catch (error) {
        console.error('Load modules error:', error);
        return new Response(`Server error: ${error.message}`, { status: 500 });
    }
}