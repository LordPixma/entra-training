// functions/api/get-module/[id].js
// Get specific training module

export async function onRequestGet(context) {
    try {
        const { params, env } = context;
        const { id } = params;
        
        if (!id) {
            return new Response('Module ID required', { status: 400 });
        }
        
        const moduleData = await env.TRAINING_MODULES.get(`module:${id}`, 'json');
        
        if (!moduleData) {
            return new Response('Module not found', { status: 404 });
        }
        
        return new Response(JSON.stringify(moduleData), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
            }
        });
        
    } catch (error) {
        console.error('Get module error:', error);
        return new Response(`Server error: ${error.message}`, { status: 500 });
    }
}