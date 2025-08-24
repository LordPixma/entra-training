# Microsoft Entra ID Administrator Training

A professional interactive training platform for Microsoft Entra ID administrators. Learn through comprehensive, step-by-step guided procedures covering essential administrative tasks.

## 🚀 Features

- **Interactive Training Modules**: 37+ hands-on training exercises
- **Professional UI**: Modern, responsive design optimized for enterprise users
- **Dynamic Content**: Cloudflare Functions + KV storage for scalable content management
- **Admin Interface**: Easy-to-use content management system
- **Mobile Responsive**: Works seamlessly across all devices
- **Open Source**: GNU GPL v3.0 licensed

## 📋 Training Categories

- 👥 User Account Management
- 🔐 Authentication & Security  
- 🔑 Password Management
- 📋 License Management
- 👪 Group Management
- 🌐 B2B Guest Management
- ⚙️ Directory Settings
- 📊 Monitoring & Reports
- 📱 Device Management

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Cloudflare Functions (serverless)
- **Storage**: Cloudflare KV (NoSQL)
- **Hosting**: Cloudflare Pages
- **Styling**: Custom CSS with CSS custom properties

## 🚦 Getting Started

### Local Development
```bash
# Clone the repository
git clone https://github.com/LordPixma/entra-training.git
cd entra-training

# Serve locally (no build process required)
python -m http.server 8000
# OR
npx serve .
```

Open http://localhost:8000 in your browser.

### Cloudflare Functions Development
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Start development with KV
wrangler pages dev . --kv TRAINING_MODULES
```

## 📖 Contributing

We welcome contributions! Please see:
- [Contributing Guidelines](.github/CONTRIBUTING.md)
- [GitHub Copilot Instructions](.github/copilot-instructions.md)

## 📄 License

GNU General Public License v3.0 - see [LICENSE](LICENSE) file for details.

## 🌐 Live Demo

Visit the live training platform: [training.tayoodekunle.com](https://training.tayoodekunle.com)

---

**Empowering Microsoft Entra ID administrators through interactive learning** 🎓
