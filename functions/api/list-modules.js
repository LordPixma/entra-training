// functions/api/list-modules.js
// List all training modules

export async function onRequestGet(context) {
    try {
        const { env } = context;
        
        // Get module list from KV
        const moduleListData = await env.TRAINING_MODULES.get('module-list', 'json');
        const moduleList = moduleListData || [];
        
        return new Response(JSON.stringify(moduleList), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=60' // Cache for 1 minute
            }
        });
        
    } catch (error) {
        console.error('List modules error:', error);
        return new Response(`Server error: ${error.message}`, { status: 500 });
    }
}