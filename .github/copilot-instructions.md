# Microsoft Entra Administrator Training Platform

A simple interactive web application for training Microsoft Entra ID administrators. Built with vanilla HTML, CSS, and JavaScript, deployed on Cloudflare Pages.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Run the Application
- **No build process required** - This is a vanilla web application with static files
- Start local development server:
  - Simple HTTP server: `python3 -m http.server 8080` - starts in 1-2 seconds
  - **OR** Cloudflare Pages dev server: `wrangler pages dev --local --port 3000 .` - takes up to 30 seconds to start. NEVER CANCEL - Set timeout to 60+ minutes.
- Access main application: `http://localhost:8080` or `http://localhost:3000`
- Access admin interface: `http://localhost:8080/admin.html` or `http://localhost:3000/admin.html`

### Install Dependencies
- Install Wrangler CLI (if not present): `npm install -g wrangler` - takes 10-15 seconds
- No other dependencies needed for basic development

### Development and Testing
- **NEVER CANCEL any server startup** - Wrangler can take up to 30 seconds, set timeout to 60+ minutes
- ALWAYS test the application manually by:
  1. Loading the main page at `http://localhost:8080`
  2. Clicking on a training module (e.g., "Create New User Account")
  3. Navigating through at least 2-3 steps using "Next Step →" button
  4. Testing the "Back to Training" functionality
  5. Loading the admin interface at `http://localhost:8080/admin.html`
- Application loads instantly (< 1 second) once server is running

### Deployment
- This application deploys to Cloudflare Pages
- Deploy command: `wrangler pages publish .` - takes 30-60 seconds. NEVER CANCEL - Set timeout to 90+ minutes.
- Configuration file: `wrangler.toml`

## Validation

- ALWAYS manually validate the application by running through complete training scenarios
- Test at least one training module end-to-end:
  1. Navigate to main page
  2. Click a training module button
  3. Complete 2-3 steps using navigation
  4. Verify step content displays correctly
  5. Test "Back to Training" functionality
- Screenshot the running application when making UI changes
- The application functions entirely client-side - no server-side validation needed for basic functionality
- Admin interface requires Cloudflare KV for full functionality, but loads correctly locally

## Common Tasks

The following are outputs from frequently run commands. Reference them instead of running bash commands to save time.

### Repository Root Structure
```
.
├── LICENSE              # GNU GPL v3.0 license
├── README.md           # Basic project description  
├── admin.html          # Admin interface for module management
├── functions/          # Cloudflare Pages Functions
│   └── api/           # API endpoints for KV operations
├── index.html         # Main training application
├── script.js          # Core application JavaScript
├── styles.css         # Application styling
└── wrangler.toml      # Cloudflare Pages configuration
```

### Key Files and Their Purpose
- **index.html**: Main training interface with module selection and step-by-step tutorials
- **admin.html**: Administrative interface for creating/managing training modules
- **script.js**: Core application logic with dynamic module loading and training workflow
- **styles.css**: Complete styling for both main and admin interfaces
- **functions/api/**: Serverless functions for Cloudflare KV integration
  - `load-modules.js`: Load training modules from KV storage
  - `save-module.js`: Save new/updated training modules to KV
  - `delete-module.js`: Delete training modules from KV
  - `list-modules.js`: List all available training modules
  - `test-kv.js`: Test KV namespace connectivity

### Application Architecture
- **Frontend**: Vanilla HTML/CSS/JavaScript single-page application
- **Backend**: Cloudflare Pages Functions (serverless) 
- **Storage**: Cloudflare KV for dynamic training modules (with static fallback)
- **Deployment**: Cloudflare Pages
- **No build tools**: Direct static file serving

### Core Functionality
- Interactive training modules for Microsoft Entra ID administration
- Step-by-step guided procedures with navigation
- Dynamic module loading from Cloudflare KV with static fallback
- Admin interface for module creation and management
- Responsive design working on desktop and mobile

### Wrangler Configuration (wrangler.toml)
```toml
name = "entra-admin-training"
compatibility_date = "2025-05-27"
```

### License
- GNU General Public License v3.0
- Open source project
- Free to use, modify, and distribute with same license

### Performance Expectations
- **Local server startup**: 1-2 seconds (Python HTTP server)
- **Wrangler dev server**: Up to 30 seconds startup - NEVER CANCEL, set timeout to 60+ minutes
- **Page loading**: < 1 second once server is running
- **Module navigation**: Instant (client-side JavaScript)
- **Deployment**: 30-60 seconds - NEVER CANCEL, set timeout to 90+ minutes

### Training Modules Structure
Training modules are JSON objects with this structure:
```json
{
  "id": "unique-task-id",
  "title": "Task Title", 
  "category": "Category Name",
  "icon": "🔥",
  "steps": [
    {
      "instruction": "Step title",
      "details": "Detailed explanation",
      "image": "Screenshot description"
    }
  ]
}
```

### Static Fallback Modules
The application includes 5 static training modules as fallback:
- Create New User Account (User Account Management)
- Configure Multi-Factor Authentication (Authentication & Security)  
- Reset User Password (Password Management)
- Assign User License (License Management)
- Create Security Group (Group Management)

### Important Implementation Notes
- All training content is static/hardcoded - no real Microsoft Entra integration
- Application works entirely client-side after initial page load
- Cloudflare Functions handle dynamic module storage but static modules work without them
- No authentication required - this is an educational tool
- Mobile-responsive design

### Troubleshooting
- If wrangler dev server fails to start, use Python HTTP server instead: `python3 -m http.server 8080`
- If Cloudflare Functions don't work locally, the app falls back to static modules automatically  
- All core functionality works without Cloudflare KV - it's only needed for dynamic module management