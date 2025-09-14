# Lessons Learned

## What Went Wrong

### 1. Over-Engineering for Demo

- **Problem**: Used complex tech stack (React + Vite + Express + Puppeteer) for a 40-minute demo
- **Impact**: Spent too much time on setup, not enough on testing
- **Lesson**: For rapid prototypes, use simpler tech stacks

### 2. Process Management Issues

- **Problem**: Background processes (`&`) don't work reliably in development
- **Impact**: Servers didn't start properly, ports got blocked
- **Lesson**: Use explicit process management or single-file solutions

### 3. Dependency Hell

- **Problem**: Multiple package.json files, complex dependency chains
- **Impact**: Installation took 10+ minutes, version conflicts
- **Lesson**: Minimize dependencies for demos

### 4. No Incremental Testing

- **Problem**: Built entire app before testing any part
- **Impact**: Couldn't identify where failures occurred
- **Lesson**: Test each component as you build it

## Better Approach for Next Time

### Tech Stack Simplification

1. **Single HTML file** with inline CSS/JS for frontend
2. **Single Node.js file** for backend (if needed)
3. **No build tools** - just vanilla JS
4. **Minimal dependencies** - use built-in browser APIs

### Development Process

1. Start with static HTML mockup
2. Add interactivity with vanilla JS
3. Test in browser immediately
4. Add backend only if absolutely necessary
5. Use simple file serving, not complex dev servers

### Time Management

- 10 minutes: HTML structure and basic styling
- 15 minutes: JavaScript functionality
- 10 minutes: Backend integration (if needed)
- 5 minutes: Testing and fixes

## Recommended Simple Stack

- **Frontend**: Single HTML file with Tailwind CDN
- **Backend**: Single Express.js file (optional)
- **PDF**: Browser print API or simple HTML export
- **No build process**: Direct file serving
