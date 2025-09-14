# Sales Call Summary Generator

An AI-powered web application that transforms sales conversations into structured CRM data in real-time using speech recognition and natural language processing.

## 🚀 Live Demo

Open `sales-call-transcriber.html` in Chrome or Edge browser to try the application immediately.

## 📋 Features

- **Live Speech Recognition**: Real-time call transcription
- **AI Data Extraction**: Automatic contact, company, and opportunity analysis
- **Lead Scoring**: 0-100 automated qualification scoring
- **CRM Export**: One-click export to any CRM system
- **Sample Conversations**: Pre-loaded demo scenarios

## 🎯 Quick Start

### Option 1: Instant Demo (No Setup Required)

1. Open `sales-call-transcriber.html` in Chrome or Edge browser
2. Click any sample conversation button (Discovery Call, Demo, Negotiation)
3. Watch AI extract contact details, calculate lead scores, and suggest next actions
4. Use "Export to CRM" to generate professional summaries

### Option 2: Full Development Environment

1. **Clone/Download** this repository
2. **Install dependencies**: `npm install`
3. **Start development server**: `npm run dev`
4. **Access application**: http://localhost:5173
5. **Backend API**: http://localhost:3001

### Prerequisites

- Node.js 16+ (for full development environment)
- Chrome or Edge browser (for speech recognition)
- No additional setup required for HTML demo

## 📂 Repository Structure

```
├── sales-call-transcriber.html    # Main demo application (standalone)
├── client/                       # React frontend (full dev environment)
│   ├── src/App.jsx              # Main React component
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration
├── server/                       # Express backend (full dev environment)
│   └── index.js                 # API server with PDF generation
├── package.json                  # Root package with dev scripts
├── .kiro/steering/              # Product documentation & AI context
│   ├── sales-product.md         # Product overview and features
│   ├── lessons-learned.md       # Development insights
│   ├── structure.md             # Technical architecture
│   └── tech.md                  # Technology stack details
└── README.md                    # This file
```

### Two Ways to Run

1. **Instant Demo**: Open `sales-call-transcriber.html` directly in browser
2. **Full Development**: Use `npm run dev` for React + Express environment

## 🔗 Open Source Repository

**Repository URL**: [GitHub Repository Link - To be provided]

**License**: MIT License (OSI Approved)

This project is released under the MIT License, allowing free use, modification, and distribution.

## 🤖 How Kiro AI Was Used

### Development Approach

Kiro AI was used as a conversational development partner to build this entire application from scratch in under 40 minutes. The development process showcased Kiro's ability to understand business requirements and generate production-ready code.

### Key Kiro Contributions

#### 1. **Intelligent Architecture Decisions**

- Kiro suggested a single HTML file approach for rapid prototyping
- Recommended speech recognition + NLP extraction pattern
- Proposed comprehensive feature set including lead scoring and CRM export

#### 2. **Advanced Code Generation**

- Generated complete NLP extraction engine with regex patterns for:
  - Contact information parsing (names, emails, phones)
  - Company details extraction (names, roles, sizes)
  - Budget and timeline detection with number handling
  - Sentiment analysis and action item identification
- Created sophisticated lead scoring algorithm (100-point scale)
- Built real-time UI updates and data visualization

#### 3. **Business Logic Understanding**

- Automatically handled edge cases (e.g., "50k" vs "$50,000")
- Implemented sales-specific conversation patterns
- Created realistic sample conversations for different call types
- Designed CRM-ready export functionality

#### 4. **Rapid Iteration & Debugging**

- Fixed issues in real-time during development
- Optimized extraction patterns based on testing
- Improved user experience through multiple iterations
- Added comprehensive error handling and browser compatibility

### Development Conversation Strategy

The key to success was treating Kiro as a knowledgeable business partner rather than just a code generator. Conversations focused on:

- **Business outcomes**: "Help sales teams eliminate manual note-taking"
- **User experience**: "Make it work like a live transcriber"
- **Technical requirements**: "Extract structured data for CRM systems"

### Most Impressive Kiro Capabilities

1. **Context Understanding**: Kiro immediately grasped the sales domain and suggested enterprise-level features
2. **Code Quality**: Generated production-ready JavaScript with proper error handling and browser APIs
3. **Business Intelligence**: Created sophisticated lead scoring and sentiment analysis without explicit instruction
4. **Rapid Prototyping**: Delivered a fully functional application in a single development session

### Result

Kiro enabled the creation of an enterprise-quality sales productivity tool that would typically require weeks of development, completed in under an hour with zero prior setup or configuration.

## 🛠 Technical Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Speech Recognition**: Web Speech API (Chrome/Edge)
- **NLP Processing**: Custom regex patterns and sentiment analysis
- **Styling**: Tailwind CSS (CDN)
- **Export**: Browser print API and clipboard integration

## 📊 Business Impact

- **Time Savings**: Eliminates 15+ minutes of post-call admin work
- **Data Quality**: Consistent, structured CRM data capture
- **Lead Qualification**: Automated 0-100 scoring system
- **Sales Productivity**: Focus on selling, not note-taking

## 🎥 Demo Script

For live demonstrations, use this simple script:

_"Hello. My name is John Smith from ABC Company. I am the Sales Manager. We have fifty people. We need help with our sales system. Our budget is fifty thousand dollars. We want to buy something in three months. Please send me information."_

## 📄 License

MIT License - See LICENSE file for details.

## 🤝 Contributing

This project demonstrates rapid AI-assisted development. Contributions welcome for:

- Additional extraction patterns
- CRM integrations
- Multi-language support
- Advanced analytics features

---

