# AI Image Generator

An example of a modern React application for generating AI images with a clean, responsive interface.

## ✨ Features

- **AI Image Generation** - Simulate the process of generating images from text prompts
- **Mock API** - Mocked API used to return images and errors
- **History Tracking** - View and manage previously generated images
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Real-time Validation** - Prompt validation with minimum character requirements
- **Loading States** - Smooth loading indicators during image generation

## 🚀 Prerequisites
- Node.js (version 18 or higher)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-image-generator
```

2. Install dependencies:
```bash
npm install
```

## 🛠️ Development

### Available Scripts

- **Start development server:**
  ```bash
  npm run dev
  ```
  Launches the development server with Hot Module Replacement (HMR)

- **Build for production:**
  ```bash
  npm run build
  ```
  Creates an optimized production build (runs TypeScript compiler + Vite build)

## 🏗️ Project Structure

```
src/
├── api/                    # API integration (image generation)
├── components/             # Shared components (GenerateButton)
├── core/                   # Core layout components (Header, Footer, Layout)
├── features/               # Feature-specific components
│   ├── history/           # Image history management
│   ├── image-display/     # Image display and controls
│   └── prompt-section/    # Prompt input and validation
├── hooks/                  # Custom React hooks
├── shared/                # Shared utilities (LoadingSpinner)
├── styles/                # Global styles and mixins
└── types/                 # TypeScript type definitions
```

## 🔧 Tech Stack

- **Frontend:** React 19 with TypeScript
- **Build Tool:** Vite with React plugin
- **Styling:** SCSS modules + CSS
- **Development:** Hot Module Replacement (HMR) for fast development

