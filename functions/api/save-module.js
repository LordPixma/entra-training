// functions/api/save-module.js
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