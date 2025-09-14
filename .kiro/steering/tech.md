# Technology Stack & Build System

## Architecture
Full-stack JavaScript application with separate client and server components.

## Frontend Stack
- **Framework**: React 19.1.1 with Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12 with PostCSS and Autoprefixer
- **Forms**: React Hook Form 7.62.0 for form handling and validation
- **Build Tool**: Vite with React plugin
- **Linting**: ESLint 9.33.0 with React-specific plugins

## Backend Stack
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 4.18.2
- **Validation**: Joi 17.11.0 for request validation
- **PDF Generation**: Puppeteer 21.5.2 for HTML-to-PDF conversion
- **CORS**: cors 2.8.5 for cross-origin requests
- **Development**: Nodemon 3.0.2 for auto-restart

## Development Tools
- **Process Management**: Concurrently 8.2.2 for running client/server simultaneously
- **Module System**: ES modules (type: "module") throughout the project

## Common Commands

### Development
```bash
# Start both client and server in development mode
npm run dev

# Start only the server
npm run server

# Start only the client
npm run client
```

### Build & Deploy
```bash
# Build client for production
npm run build

# Preview production build
cd client && npm run preview
```

### Code Quality
```bash
# Lint client code
cd client && npm run lint
```

## Key Configuration Files
- `vite.config.js`: Vite configuration with API proxy to backend
- `tailwind.config.js`: Tailwind CSS configuration
- `eslint.config.js`: ESLint configuration for React
- Server runs on port 3001, client development server proxies API calls