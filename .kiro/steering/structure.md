# Project Structure & Organization

## Root Level
```
├── package.json          # Root package with dev scripts and shared dependencies
├── client/               # React frontend application
├── server/               # Express.js backend application
└── node_modules/         # Shared dependencies
```

## Client Structure (`client/`)
```
client/
├── package.json          # Frontend dependencies and scripts
├── index.html            # Vite entry point
├── vite.config.js        # Vite configuration with API proxy
├── tailwind.config.js    # Tailwind CSS configuration
├── eslint.config.js      # ESLint rules for React
├── src/
│   ├── main.jsx          # React application entry point
│   ├── App.jsx           # Main application component
│   ├── App.css           # Component-specific styles
│   ├── index.css         # Global styles and Tailwind imports
│   └── assets/           # Static assets (images, icons)
├── public/               # Public static files
└── node_modules/         # Frontend-specific dependencies
```

## Server Structure (`server/`)
```
server/
└── index.js              # Express server with FIR generation API
```

## Key Conventions

### File Organization
- **Monorepo structure**: Client and server are separate packages within the same repository
- **ES modules**: All JavaScript files use ES module syntax (`import/export`)
- **Component structure**: React components use `.jsx` extension
- **Configuration files**: Located at package root level (client/ for frontend configs)

### API Structure
- **Single endpoint**: `/api/generate-fir` for PDF generation
- **RESTful design**: POST request with JSON payload
- **Validation**: Joi schemas for request validation
- **Error handling**: Consistent error response format

### Styling Approach
- **Utility-first**: Tailwind CSS for all styling
- **Component styles**: Minimal custom CSS in App.css
- **Responsive design**: Mobile-first approach with Tailwind breakpoints
- **Color coding**: Different background colors for form sections (blue, green, yellow, red, purple)

### Data Flow
1. Form input in React frontend
2. React Hook Form handles validation and state
3. API call to Express backend with form data
4. Joi validation on server
5. HTML template generation
6. Puppeteer PDF conversion
7. PDF download response to client

### Development Workflow
- **Concurrent development**: Both client and server run simultaneously via `npm run dev`
- **Hot reload**: Vite provides fast refresh for frontend changes
- **Auto-restart**: Nodemon restarts server on file changes
- **Proxy setup**: Vite proxies `/api` requests to backend server