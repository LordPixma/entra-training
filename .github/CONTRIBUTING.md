# Contributing to Microsoft Entra ID Administrator Training

Thank you for your interest in contributing to this professional training platform! This guide will help you understand the project structure and contribution process.

## Quick Start

1. **Fork the repository** and clone your fork
2. **Review the architecture** in `.github/copilot-instructions.md`
3. **Test locally** by running the site (no build process required)
4. **Make your changes** following the established patterns
5. **Test thoroughly** across browsers and devices
6. **Submit a pull request** with clear description

## Local Development

### Prerequisites
- Modern web browser
- Text editor/IDE
- Cloudflare account (for functions testing)

### Running Locally
```bash
# Clone the repository
git clone https://github.com/LordPixma/entra-training.git
cd entra-training

# Open index.html in your browser or use a local server
python -m http.server 8000
# OR
npx serve .
```

### Testing Cloudflare Functions
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Start local development server
wrangler pages dev . --kv TRAINING_MODULES
```

## Code Style Guide

### JavaScript Best Practices
- Use async/await for asynchronous operations
- Implement comprehensive error handling
- Cache DOM elements to avoid repeated queries
- Use meaningful variable and function names
- Comment complex logic and business rules

### CSS Architecture
- All styles in single `styles.css` file
- Use CSS custom properties for consistency
- Follow mobile-first responsive design
- Maintain professional blue color scheme
- Smooth transitions for better UX

### HTML Structure
- Semantic HTML5 elements
- Proper heading hierarchy (h1 → h2 → h3)
- Accessible form labels and ARIA attributes
- Descriptive class names

## Adding Training Modules

### Via Admin Interface (Recommended)
1. Navigate to `/admin.html`
2. Use "Create New Module" form
3. Follow the module structure guidelines
4. Test the module thoroughly

### Via Code (Advanced)
1. Add to the `loadStaticModules()` function in `script.js`
2. Follow existing module patterns
3. Include all required fields: title, category, icon, steps

### Module Structure Requirements
```javascript
{
  title: 'Descriptive Title',
  category: 'Appropriate Category',
  icon: '📋', // Relevant emoji
  steps: [
    {
      instruction: 'What to do (concise)',
      details: 'How to do it (detailed guidance)',
      image: 'Screenshot description'
    }
  ]
}
```

## API Development

### Creating New Endpoints
1. Create new file in `/functions/api/`
2. Export appropriate HTTP method function
3. Follow error handling patterns
4. Return JSON responses with proper status codes

### KV Storage Patterns
- Use consistent key naming: `module:${id}`
- Include metadata for better organization
- Handle KV errors gracefully
- Maintain the module list index

## UI/UX Guidelines

### Design Principles
- **Professional**: Clean, modern interface suitable for enterprise users
- **Accessible**: WCAG compliance with proper contrast and navigation
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive**: Clear navigation and user feedback

### Interactive Elements
- Hover states for all clickable elements
- Loading indicators for async operations
- Smooth transitions (0.3s cubic-bezier timing)
- Clear visual feedback for user actions

### Color Usage
- Primary: `#1e3a8a` (Microsoft-style blue)
- Success: `#059669` (green for completions)
- Warning: `#d97706` (amber for alerts)
- Error: `#dc2626` (red for errors)

## Testing Checklist

### Functionality Testing
- [ ] All training modules load correctly
- [ ] Step navigation works smoothly
- [ ] Progress tracking functions properly
- [ ] Admin interface saves/loads modules
- [ ] API endpoints return correct responses

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Responsive Testing
- [ ] Mobile phones (320px+)
- [ ] Tablets (768px+)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible

## Performance Optimization

### Frontend Performance
- Minimize DOM manipulation
- Use CSS transforms for animations
- Lazy load non-critical content
- Optimize images and assets

### Backend Performance
- Efficient KV storage queries
- Proper caching headers
- Minimal function cold starts
- Error handling without performance impact

## Common Issues and Solutions

### KV Storage Issues
- **Problem**: "KV namespace not bound"
- **Solution**: Configure TRAINING_MODULES binding in Cloudflare dashboard

### Module Loading Issues
- **Problem**: Modules not displaying
- **Solution**: Check browser console, verify API endpoints, test KV connectivity

### Styling Issues
- **Problem**: Styles not applying
- **Solution**: Verify CSS custom property usage, check browser compatibility

## Security Considerations

- Validate all user inputs
- Sanitize data before storing in KV
- Use HTTPS for all communications
- Follow Cloudflare security best practices
- No sensitive data in client-side code

## Deployment Process

### Automatic Deployment
- Push to main branch triggers automatic deployment
- Cloudflare Pages handles build and deployment
- Environment variables managed in Cloudflare dashboard

### Manual Testing
- Test on staging environment before production
- Verify all functions work with production KV
- Check performance and responsiveness

## Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: GitHub Discussions for questions and ideas
- **Documentation**: Review `.github/copilot-instructions.md` for technical details

## License

This project uses GNU GPL v3.0. All contributions must be compatible with this license.

---

**Thank you for contributing to this professional training platform!** Your efforts help Microsoft Entra ID administrators learn more effectively.