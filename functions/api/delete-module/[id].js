// functions/api/delete-module/[id].js
// Delete training module

export async function onRequestDelete(context) {
    try {
        const { params, env } = context;
        const { id } = params;
        
        if (!id) {
            return new Response('Module ID required', { status: 400 });
        }
        
        // Delete from KV
        await env.TRAINING_MODULES.delete(`module:${id}`);
        
        // Update module list
        await removeFromModuleList(env, id);
        
        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Delete module error:', error);
        return new Response(`Server error: ${error.message}`, { status: 500 });
    }
}