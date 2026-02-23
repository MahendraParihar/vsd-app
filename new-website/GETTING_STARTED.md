# Getting Started with New Website

## Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd new-website
   ```

2. **Install dependencies (already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   Or:
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200/`

## Project Structure Overview

This project follows the same structure as the `web-app` project with:

### Apps Directory (`apps/`)
- **main**: The main application entry point
  - Contains components, modules, and routing
  - Uses SCSS for styling
  - Configured with Angular Material

### Libraries Directory (`libs/`)
- **core-lib**: Core services and utilities
  - HTTP Service
  - Storage Service
  - Shared Service
  
- **shared-ui-lib**: Shared UI components
  - Common Angular Material modules
  - Reusable components
  
- **style-lib**: Shared styles and themes
  - Color palette
  - Typography
  - Spacing system
  - Light and dark themes

## Adding New Components

To add a new component in the main app:

```bash
nx g @nx/angular:component my-component --project=main
```

## Adding New Libraries

To add a new library:

```bash
nx g @nx/angular:library my-lib
```

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in `dist/apps/main/`.

## Nx Commands

- **Serve**: `nx serve main`
- **Build**: `nx build main`
- **Lint**: `nx lint main`
- **Test**: `nx test main` (when tests are configured)

## Project Configuration

- **Angular**: v19.0.0
- **Angular Material**: v19.0.2
- **Nx**: v20.2.1
- **TypeScript**: v5.6.2
- **Node**: Compatible with Node 18+

## Folder Structure Comparison

This project mirrors the `web-app` structure:

```
new-website/              web-app/
├── apps/                 ├── apps/
│   └── main/             │   ├── main/
│                         │   └── member/
├── libs/                 ├── libs/
│   ├── core-lib/         │   ├── core-lib/
│   ├── shared-ui-lib/    │   ├── shared-ui-lib/
│   └── style-lib/        │   ├── style-lib/
│                         │   └── member-lib/
├── nx.json               ├── nx.json
├── package.json          ├── package.json
└── tsconfig.base.json    └── tsconfig.base.json
```

## Key Features

✅ **Angular Material**: Latest version with pre-configured themes  
✅ **Nx Workspace**: Monorepo architecture for scalability  
✅ **TypeScript**: Type-safe development  
✅ **SCSS**: Advanced styling with Sass  
✅ **Modular**: Clean separation of concerns with libs  
✅ **Routing**: Pre-configured Angular routing  
✅ **Services**: Core services for HTTP, storage, and shared state  

## Next Steps

1. Customize the theme in `libs/style-lib/src/lib/themes/`
2. Add more components to the main app
3. Create additional libraries as needed
4. Configure environment variables
5. Set up CI/CD pipelines
6. Add unit tests

## Troubleshooting

**Port already in use?**
```bash
nx serve main --port 4300
```

**Clear Nx cache:**
```bash
nx reset
```

**Rebuild everything:**
```bash
rm -rf node_modules dist .nx
npm install
npm run build
```

## Support

For more information about Nx, visit: https://nx.dev
For Angular Material: https://material.angular.io

