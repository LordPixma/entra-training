# GitHub Copilot Instructions for Microsoft Entra ID Administrator Training

This repository contains a professional interactive training platform for Microsoft Entra ID administrators. Follow these guidelines when contributing code or making suggestions.

## Project Overview

**Purpose**: Interactive training platform providing step-by-step guidance for Microsoft Entra ID administrative tasks.

**Architecture**: Single-page application with Cloudflare Functions backend and KV storage for dynamic content.

**Target Audience**: Microsoft Entra ID administrators learning through hands-on interactive modules.

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend**: Cloudflare Functions (serverless)
- **Storage**: Cloudflare KV (NoSQL key-value store)
- **Hosting**: Cloudflare Pages
- **Styling**: Custom CSS with CSS custom properties (no frameworks)
- **Fonts**: Inter font family from Google Fonts

## Project Structure

```
/
├── index.html              # Main application page
├── admin.html              # Admin interface for content management
├── script.js               # Main application logic
├── styles.css              # All styling with CSS custom properties
├── wrangler.toml           # Cloudflare configuration
├── functions/
│   └── api/
│       ├── load-modules.js    # Load training modules from KV
│       ├── save-module.js     # Save training modules to KV
│       ├── list-modules.js    # List all available modules
│       ├── delete-module      # Delete training modules
│       ├── export-modules.js  # Export modules for backup
│       ├── import-existing.js # Import modules from backup
│       └── test-kv.js         # Test KV storage connectivity
└── LICENSE                 # GNU GPL v3.0 license
```

## Code Style and Conventions

### JavaScript
- **Style**: Modern ES6+ vanilla JavaScript, no frameworks
- **Async/Await**: Prefer async/await over Promises for better readability
- **Error Handling**: Comprehensive try-catch blocks with user feedback
- **Comments**: JSDoc-style comments for functions, inline comments for complex logic
- **Variables**: Use `const` by default, `let` when reassignment needed, avoid `var`
- **Functions**: Prefer function declarations for main functions, arrow functions for callbacks
- **Event Handling**: Use addEventListener with proper cleanup

### CSS
- **Architecture**: CSS custom properties (CSS variables) defined in `:root`
- **Naming**: BEM-like methodology with semantic class names
- **Colors**: Use CSS custom properties exclusively (e.g., `var(--primary)`)
- **Spacing**: Consistent spacing scale using custom properties (e.g., `var(--space-4)`)
- **Typography**: Responsive typography using custom properties
- **Layout**: CSS Grid and Flexbox for layouts, no CSS frameworks
- **Transitions**: Smooth transitions using custom timing functions

### HTML
- **Semantic**: Use semantic HTML5 elements
- **Accessibility**: Include ARIA labels and semantic structure
- **Classes**: Descriptive class names following BEM-like patterns
- **Structure**: Logical document structure with proper heading hierarchy

## Training Module Structure

Training modules follow a specific JSON structure:

```javascript
{
  id: 'unique-module-id',
  title: 'Human Readable Title',
  category: 'Category Name',
  icon: '📋', // Emoji icon
  steps: [
    {
      instruction: 'Brief step instruction',
      details: 'Detailed explanation with specific UI guidance',
      image: 'Screenshot description or placeholder'
    }
    // ... more steps
  ],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}
```

### Categories
- User Management
- Group Management  
- License Management
- Security & Compliance
- Application Management
- Device Management
- Identity Protection
- Conditional Access
- Administrative Tasks

## Development Patterns

### State Management
- Global application state stored in module-level variables
- DOM element caching in `elements` object
- Task and step tracking with `currentTask` and `currentStep`

### API Integration
- Cloudflare Functions for serverless backend
- RESTful API design with proper HTTP status codes
- JSON data exchange between frontend and backend
- Error handling with user-friendly messages

### UI/UX Patterns
- Professional blue color scheme (`--primary: #1e3a8a`)
- Smooth transitions and animations
- Mobile-responsive design
- Loading states for async operations
- Toast notifications for user feedback
- Modal dialogs for additional information

### Error Handling
- Try-catch blocks around all async operations
- User-friendly error messages
- Console logging for debugging
- Graceful fallbacks for failed API calls

## Cloudflare Functions Guidelines

### File Structure
- One function per file in `/functions/api/`
- Export default async function with `onRequestGet`, `onRequestPost`, etc.
- Proper error handling and status codes
- JSON responses with appropriate headers

### KV Storage Patterns
- Module data stored with `module:${id}` keys
- Module list maintained in `module-list` key
- Metadata included for better organization
- Proper error handling for KV operations

### Example Function Structure:
```javascript
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // Validate inputs
    // Process request
    // Return JSON response
    
  } catch (error) {
    console.error('Function error:', error);
    return new Response(`Server error: ${error.message}`, { 
      status: 500 
    });
  }
}
```

## Content Guidelines

### Training Content
- Clear, actionable instructions
- Step-by-step guidance with UI references
- Professional tone suitable for administrators
- Accurate Microsoft Entra ID terminology
- Real-world practical scenarios

### UI Text
- Professional, clear language
- Consistent terminology
- Helpful error messages
- Progress indicators and feedback

## Performance Considerations

- Lazy loading of training modules
- Efficient DOM manipulation
- CSS animations optimized for performance
- Minimal JavaScript bundle size
- Proper caching headers for API responses

## Security Practices

- Input validation on all user inputs
- Proper error handling without exposing internals
- Secure API endpoints with proper validation
- No sensitive data in client-side code

## Testing Approach

- Manual testing of user flows
- API endpoint testing
- Cross-browser compatibility
- Mobile responsiveness testing
- KV storage connectivity testing

## Deployment

- Automatic deployment via Cloudflare Pages
- Environment variables configured in Cloudflare dashboard
- KV namespace binding required: `TRAINING_MODULES`
- Production URL: https://training.tayoodekunle.com

## Common Tasks

When working on this project, common tasks include:

1. **Adding new training modules**: Follow the module structure, add via admin interface
2. **Updating styling**: Modify CSS custom properties in `:root`, maintain consistency  
3. **Adding new API endpoints**: Create new function in `/functions/api/`
4. **Improving UX**: Enhance transitions, loading states, and user feedback
5. **Content updates**: Use admin interface or direct API calls

## License

This project is licensed under GNU GPL v3.0. Any contributions must be compatible with this license.

---

**When contributing**: Always maintain the professional quality, consistent patterns, and user-focused design that makes this training platform effective for Microsoft Entra ID administrators.