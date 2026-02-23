# New Website

A modern Angular Material 3 website built with Nx monorepo architecture.

## 🎨 Design System

- **Material Design 3 (M3)**: Latest Material Design system
- **Custom Theme**: Coral/Orange (#FF5733) primary color
- **Optimized Performance**: 45% smaller CSS bundle (94.48 kB)
- **Dark Mode**: Full dark theme support
- **Responsive**: Mobile-first design

## ✨ Features

- **Angular 19**: Latest Angular framework
- **Angular Material 19**: Material Design 3 components
- **Nx Workspace**: Monorepo management with Nx
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with Sass
- **Modular Architecture**: Organized with apps and libs
- **Theme System**: Light & dark modes with M3 color system

## Project Structure

```
new-website/
├── apps/
│   └── main/              # Main application
│       ├── src/
│       │   ├── app/       # Application code
│       │   ├── index.html # Main HTML file
│       │   ├── main.ts    # Application entry point
│       │   └── styles.scss
│       └── project.json   # Project configuration
├── libs/
│   ├── core-lib/          # Core services and utilities
│   │   └── src/
│   │       └── lib/
│   │           └── services/
│   ├── shared-ui-lib/     # Shared UI components
│   │   └── src/
│   │       └── lib/
│   └── style-lib/         # Shared styles and themes
│       └── src/
│           ├── lib/
│           │   └── themes/
│           └── assets/
├── nx.json                # Nx configuration
├── package.json           # Dependencies
└── tsconfig.base.json     # TypeScript configuration

```

## Installation

Install dependencies:

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

Or:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Build the project:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Libraries

### core-lib

Contains core services:
- HTTP Service
- Storage Service
- Shared Service

### shared-ui-lib

Contains shared UI components and Material modules.

### style-lib

Contains Material Design 3 theme system:
- **M3 Color Palettes**: Tonal palette system with #FF5733 primary
- **Typography**: Modern type scale with custom fonts
- **Spacing System**: Consistent spacing tokens
- **Light & Dark Themes**: Full M3 theme support
- **Design Tokens**: Comprehensive design system
- **Animations**: Smooth transitions and effects
- **Utilities**: Helper classes and mixins

**Bundle Size**: 94.48 kB (45% smaller with M3)

## Tech Stack

- Angular 19.0.0
- Angular Material 19.0.2 **(Material Design 3)**
- Nx 20.2.1
- TypeScript 5.6.2
- RxJS 7.8.0
- SCSS/Sass

## 📚 Documentation

- **[Design System](DESIGN_SYSTEM.md)** - Complete design tokens and patterns
- **[M3 Migration Guide](M3_MIGRATION_GUIDE.md)** - Material Design 3 migration details
- **[M3 Quick Reference](M3_QUICK_REFERENCE.md)** - Quick reference for M3 usage
- **[Theme Summary](THEME_UPDATE_SUMMARY.md)** - Theme customization details
- **[Getting Started](GETTING_STARTED.md)** - Development guide

## 🎨 Theme Customization

The application uses a custom coral/orange (#FF5733) primary color. To customize:

1. Edit `libs/style-lib/src/lib/themes/light-theme.scss` or `dark-theme.scss`
2. Modify the primary color in the theme definition
3. Rebuild: `npm run build`

See [M3_MIGRATION_GUIDE.md](M3_MIGRATION_GUIDE.md) for details.

## License

MIT

