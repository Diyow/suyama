# Suyama - Company Profile Landing Page

A modern, scalable company profile landing page built with vanilla HTML, JavaScript, and Tailwind CSS. This project follows industry best practices with a well-organized, maintainable architecture.

## Features

- **Modern Architecture**: Organized source code structure following industry standards
- **Component-Based**: Modular HTML components for easy maintenance
- **Async Loading**: Components loaded asynchronously for better performance
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Version Control Ready**: Comprehensive .gitignore for clean repositories

## Project Structure

```
suyama/
├── public/                 # Static files served directly
│   └── index.html         # Main HTML entry point
├── src/                   # Source code
│   ├── components/        # HTML components
│   │   ├── navbar.html    # Navigation component
│   │   ├── hero.html      # Hero section
│   │   ├── about.html     # About section
│   │   ├── services.html  # Services section
│   │   ├── contact.html   # Contact section
│   │   └── footer.html    # Footer component
│   ├── assets/           # Organized assets
│   │   ├── js/           # JavaScript files
│   │   │   └── main.js   # Main application logic
│   │   ├── css/          # CSS files (for future custom styles)
│   │   └── images/       # Image assets
│   └── utils/            # Utility functions
├── config/               # Configuration files
│   └── app.config.js     # Application configuration
├── docs/                 # Documentation
│   └── README-old.md     # Previous documentation
├── package.json          # Project dependencies and scripts
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

**Option 1: Direct Browser Opening**
1. **Download or clone the repository**:
   ```bash
   git clone https://github.com/yourusername/suyama-landing-page.git
   cd suyama-landing-page
   ```

2. **Open in browser**:
   - Simply double-click `public/index.html`
   - Or drag `public/index.html` to your browser

**Option 2: Using a Local Server (Recommended)**

For better development experience and to avoid CORS issues:

- **Live Server Extension**: Use VS Code's Live Server extension
- **Any static file server**: Point to the project root directory

## Customization

### Changing Content
- Edit HTML files in `src/components/` folder
- Each section is a separate component for easy maintenance

### Styling
- All styles use Tailwind CSS utility classes
- Add custom CSS in `src/assets/css/` if needed
- Modify Tailwind configuration for custom themes

### Adding New Features
1. Create new components in `src/components/`
2. Add component loading functions in `src/assets/js/main.js`
3. Update `public/index.html` to include new sections

## Development

### File Organization
- **Source Code**: All source files in `src/`
- **Public Assets**: Static files in `public/`

### Best Practices
- Keep components small and focused
- Use semantic HTML structure
- Follow Tailwind CSS conventions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)