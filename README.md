# Calculator

## First point

[TS][https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0#heading=h.5dt3hghpa22f]

## How to run the app

### Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) v16.x or higher installed
- npm (comes bundled with Node.js)
- Git (optional, for cloning the repository)

### Installation

To set up the development environment, follow these steps:

1. Clone the repository (if you haven't already):
```bash
git clone <https://github.com/Sanexis/Calculator>
```

2. Navigate to the project directory:
```bash
cd your-project-name
```

3. Install all dependencies:
```bash
npm i
```

### Available Commands

Start the development server with Webpack:
```bash
npm start
```

Run the linter to check for code quality issues:
```bash
npm run lint
```

Production Build
```bash
npm run build
```

GitHub Pages load
```bash
npm run build
```

This will:

- Generate minified and optimized assets in the dist/ directory
- Perform tree-shaking to eliminate dead code
- Create production-ready static files

### Files structure

folder "src" for JS and SCSS files
folder "dist" for generated build files