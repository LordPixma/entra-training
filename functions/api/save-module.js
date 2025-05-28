// functions/api/save-module.js
// Save training module to Cloudflare KV with proper error handling

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        // Check if KV binding exists
        if (!env.TRAINING_MODULES) {
            console.error('KV namespace TRAINING_MODULES not bound');
            return new Response('KV storage not configured. Please check your KV namespace binding.', { 
                status: 500,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
        
        // Parse request body
        let requestData;
        try {
            requestData = await request.json();
        } catch (parseError) {
            return new Response('Invalid JSON in request body', { 
                status: 400,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
        
        const { id, data } = requestData;
        
        // Validate required fields
        if (!id || !data) {
            return new Response('Missing required fields: id and data', { 
                status: 400,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
        
        if (!data.title || !data.steps) {
            return new Response('Invalid module data: missing title or steps', { 
                status: 400,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
        
        // Add metadata
        const moduleData = {
            ...data,
            id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Save to KV storage
        try {
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
        } catch (kvError) {
            console.error('KV put error:', kvError);
            return new Response(`Failed to save to KV storage: ${kvError.message}`, { 
                status: 500,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
        
        // Update module list
        try {
            await updateModuleList(env, id, {
                id,
                title: data.title,
                category: data.category || 'General',
                stepCount: data.steps.length,
                updatedAt: moduleData.updatedAt
            });
        } catch (listError) {
            console.error('Module list update error:', listError);
            // Don't fail the request if list update fails
        }
        
        return new Response(JSON.stringify({ 
            success: true, 
            id,
            message: 'Module saved successfully'
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Save module error:', error);
        return new Response(`Server error: ${error.message}`, { 
            status: 500,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

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