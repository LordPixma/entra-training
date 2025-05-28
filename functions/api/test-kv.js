// functions/api/test-kv.js
// Test KV namespace binding

export async function onRequestGet(context) {
    try {
        const { env } = context;
        
        // Check if KV binding exists
        if (!env.TRAINING_MODULES) {
            return new Response(JSON.stringify({
                error: 'KV namespace TRAINING_MODULES not bound',
                bindings: Object.keys(env || {}),
                help: 'Configure KV binding in Cloudflare Pages dashboard under Settings > Environment variables'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Test write
        const testKey = 'test-' + Date.now();
        const testValue = { message: 'KV is working!', timestamp: new Date().toISOString() };
        
        await env.TRAINING_MODULES.put(testKey, JSON.stringify(testValue));
        
        // Test read
        const retrievedValue = await env.TRAINING_MODULES.get(testKey, 'json');
        
        // Cleanup
        await env.TRAINING_MODULES.delete(testKey);
        
        return new Response(JSON.stringify({
            success: true,
            message: 'KV namespace is working correctly!',
            testData: retrievedValue,
            bindings: Object.keys(env || {})
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}