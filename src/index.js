// Read the HTML file and serve it
import htmlContent from '../index.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle different routes
    switch (url.pathname) {
      case '/':
      case '/index.html':
        return new Response(htmlContent, {
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            'Cache-Control': 'public, max-age=3600',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
          },
        });
      
      case '/health':
        return new Response('OK', { 
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        });
      
      default:
        return new Response('Not Found', { status: 404 });
    }
  },
};