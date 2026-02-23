# Design System Documentation

## 🎨 Overview

This design system provides a comprehensive set of design tokens, components, and utilities for building beautiful and consistent user interfaces.

**Design Language**: Material Design 3 (M3)  
**Framework**: Angular 19 + Angular Material 19  
**Primary Color**: #FF5733 (Coral/Orange)

## 📐 Design Tokens

### Colors

#### Primary Colors
```scss
--primary-50 through --primary-900
--primary-color: #ff5733 (Vibrant Coral/Orange)
```

#### Semantic Colors
- `--accent-color`: #ffc107 (Amber/Gold)
- `--success-color`: #4caf50 (Green)
- `--warning-color`: #ff9800 (Orange)
- `--error-color`: #f44336 (Red)
- `--info-color`: #2196f3 (Blue)

#### Background & Surface
- `--background-color`: Dynamic (light: #fafafa, dark: #121212)
- `--surface-color`: Dynamic (light: #ffffff, dark: #1e1e1e)
- `--card-color`: Dynamic (light: #ffffff, dark: #2c2c2c)

#### Text Colors
- `--text-primary`: Dynamic (lightautomobility: #212121, dark: #ffffff)
- `--text-secondary`: Dynamic (light: #757575, dark: #b0b0b0)
- `--text-disabled`: Dynamic
- `--text-hint`: Dynamic

### Typography

#### Font Families
```scss
--font-family-base: 'Roboto', 'Helvetica Neue', Arial, sans-serif
--font-family-heading: 'Roboto', 'Helvetica Neue', Arial, sans-serif
--font-family-mono: 'Roboto Mono', 'Courier New', monospace
```

#### Font Sizes
- `--font-size-xs`: 12px
- `--font-size-sm`: 14px
- `--font-size-base`: 16px
- `--font-size-lg`: 18px
- `--font-size-xl`: 20px
- `--font-size-2xl`: 24px
- `--font-size-3xl`: 30px
- `--font-size-4xl`: 36px
- `--font-size-5xl`: 48px
- `--font-size-6xl`: 60px

#### Font Weights
- Light: 300
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

#### Typography Mixins
```scss
@include heading-1;  // 48px, bold
@include heading-2;  // 36px, bold
@include heading-3;  // 30px, semibold
@include heading-4;  // 24px, semibold
@include heading-5;  // 20px, medium
@include heading-6;  // 18px, medium
@include body-large; // 18px, normal
@include body-regular; // 16px, normal
@include body-small; // 14px, normal
@include caption; // 12px, normal
```

### Spacing

#### Scale (8px base)
```scss
--spacing-0: 0
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-6: 24px
--spacing-8: 32px
--spacing-10: 40px
--spacing-12: 48px
--spacing-16: 64px
--spacing-20: 80px
--spacing-24: 96px
```

#### Container Widths
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Breakpoints

```scss
$breakpoint-xs: 480px
$breakpoint-sm: 640px
$breakpoint-md: 768px
$breakpoint-lg: 1024px
$breakpoint-xl: 1280px
$breakpoint-2xl: 1536px
```

#### Breakpoint Mixins
```scss
@include xs { ... }  // >= 480px
@include sm { ... }  // >= 640px
@include md { ... }  // >= 768px
@include lg { ... }  // >= 1024px
@include xl { ... }  // >= 1280px
@include xxl { ... } // >= 1536px
```

### Shadows

```scss
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1)
```

### Border Radius

```scss
--border-radius-sm: 4px
--border-radius-md: 8px
--border-radius-lg: 12px
--border-radius-xl: 16px
--border-radius-full: 9999px
```

### Transitions

```scss
--transition-fast: 150ms ease-in-out
--transition-base: 300ms ease-in-out
--transition-slow: 500ms ease-in-out
```

## 🧩 Utility Classes

### Display
```html
<div class="d-flex">Flex container</div>
<div class="d-grid">Grid container</div>
<div class="d-none">Hidden</div>
```

### Flex Utilities
```html
<div class="d-flex justify-center align-center gap-4">
  Centered with gap
</div>
```

### Text Utilities
```html
<p class="text-center font-bold text-primary">Centered Bold Primary Text</p>
<p class="text-truncate">Text with ellipsis...</p>
<p class="line-clamp-2">Text limited to 2 lines</p>
```

### Spacing Utilities
```html
<div class="m-4 p-6">Margin 16px, Padding 24px</div>
<div class="mt-2 mb-4">Margin top 8px, bottom 16px</div>
```

### Shadow & Border Radius
```html
<div class="shadow-md rounded-lg">Card with shadow and rounded corners</div>
```

### Hover Effects
```html
<div class="hover-lift">Lifts on hover</div>
<div class="hover-scale">Scales on hover</div>
```

## 🎭 Animations

### Animation Classes
```html
<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-in-up">Slides up</div>
<div class="animate-zoom-in">Zooms in</div>
<div class="animate-bounce">Bounces</div>
<div class="animate-pulse">Pulses</div>
```

### Animation Delays
```html
<div class="animate-slide-in-up animation-delay-100">Delayed 100ms</div>
<div class="animate-slide-in-up animation-delay-200">Delayed 200ms</div>
```

### Skeleton Loaders
```html
<div class="skeleton" style="width: 100%; height: 20px;"></div>
```

### Loading Spinner
```html
<div class="loading-spinner"></div>
```

## 🎨 Theming (Material Design 3)

### Light Theme (Default)
The light theme is applied by default with bright backgrounds and dark text.
Uses M3's adaptive color system for optimal visual hierarchy.

### Dark Theme
Add the `.dark-theme` class to any parent element:

```html
<body class="dark-theme">
  <!-- All children will use dark theme -->
</body>
```

```typescript
// Toggle theme programmatically
document.body.classList.toggle('dark-theme');
```

### M3 Color System
Material 3 uses a tonal palette system (0-100) instead of the traditional 50-900 scale.
Colors are automatically generated and harmonized for consistency.

**Color Roles**:
- **Primary**: Main brand color (#FF5733) - toolbars, FABs, prominent buttons
- **Tertiary**: Accent color (Yellow) - complementary highlights
- **Surface**: Background colors for cards and components
- **Error**: Error states and destructive actions

## 📦 Mixins

### Layout Mixins
```scss
@include flex-center;    // Centers content
@include flex-between;   // Space between
@include container;      // Responsive container
```

### Card Mixins
```scss
@include card;           // Basic card
@include card-elevated;  // Elevated card with hover
```

### Text Mixins
```scss
@include text-truncate;     // Single line ellipsis
@include text-clamp(2);     // Clamp to N lines
```

### Button Mixins
```scss
@include button-reset;   // Reset button styles
@include button-base;    // Base button styling
```

### Image Mixins
```scss
@include img-cover;      // Cover image
@include img-contain;    // Contain image
@include aspect-ratio(16, 9); // Aspect ratio container
```

### Custom Scrollbar
```scss
@include custom-scrollbar(8px, rgba(0,0,0,0.3));
```

### Focus States
```scss
@include focus-ring;        // Adds focus ring
@include focus-visible;     // Focus only on keyboard nav
```

### Responsive Text
```scss
@include responsive-text(16px, 18px, 20px);
// mobile, tablet, desktop
```

## 🎯 Usage Examples

### Hero Section
```html
<section class="hero-section">
  <div class="container">
    <h1 class="animate-fade-in">Welcome</h1>
    <p class="animate-slide-in-up animation-delay-100">
      Your subtitle here
    </p>
  </div>
</section>
```

```scss
.hero-section {
  background: linear-gradient(135deg, #ff5733 0%, #cc3314 100%);
  padding: 80px 0;
  color: white;
  text-align: center;
}
```

### Feature Grid
```html
<div class="feature-grid">
  <mat-card class="hover-lift">
    <mat-card-content>Feature 1</mat-card-content>
  </mat-card>
  <mat-card class="hover-lift">
    <mat-card-content>Feature 2</mat-card-content>
  </mat-card>
</div>
```

```scss
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
}
```

### Responsive Layout
```scss
.my-component {
  padding: var(--spacing-4);
  
  @include md {
    padding: var(--spacing-8);
  }
  
  @include lg {
    padding: var(--spacing-12);
  }
}
```

## 🚀 Best Practices

1. **Use CSS Variables**: Prefer CSS variables for dynamic theming
2. **Mobile First**: Start with mobile styles, add larger breakpoints
3. **Consistent Spacing**: Use the spacing scale (multiples of 4px/8px)
4. **Semantic Colors**: Use semantic colors (success, warning, error) for meaning
5. **Accessible**: Always ensure sufficient color contrast
6. **Performance**: Use `transition` and `transform` for animations
7. **Reusable**: Create mixins for repeated patterns

## 📚 Component Examples

### Card Component
```html
<mat-card class="shadow-md rounded-lg hover-lift">
  <mat-card-header>
    <mat-card-title>Card Title</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>Card content goes here</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button color="primary">Action</button>
  </mat-card-actions>
</mat-card>
```

### Button Variants
```html
<button mat-raised-button color="primary">Primary Button</button>
<button mat-stroked-button color="accent">Accent Button</button>
<button mat-flat-button color="warn">Warn Button</button>
<button mat-icon-button><mat-icon>favorite</mat-icon></button>
```

## 🎨 Customization

### Custom Colors (M3)
Edit `libs/style-lib/src/lib/themes/light-theme.scss` or `dark-theme.scss`:

```scss
@use '@angular/material' as mat;
@use 'sass:map';

// Override the primary color
$_primary: map.merge(mat.$orange-palette, (
  40: #ff5733,  // Your custom color
));

$light-theme: mat.define-theme((
  color: (
    theme-type: light,
    primary: $_primary,
    tertiary: mat.$yellow-palette,
  )
));
```

See `M3_MIGRATION_GUIDE.md` for more customization options.

### Custom Breakpoints
Edit `libs/style-lib/src/lib/_variables.scss`:
```scss
$breakpoint-lg: 1200px; // Custom large breakpoint
```

### Custom Spacing
Edit `libs/style-lib/src/lib/_spacing.scss`:
```scss
$spacing-custom: 20px;
```

## 📖 Additional Resources

- [Angular Material Documentation](https://material.angular.io)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [Material Design Guidelines](https://material.io/design)

---

**Design System Version**: 3.0.0 (Material Design 3)  
**Last Updated**: November 9, 2025  
**Material Version**: Angular Material 19.0.2  
**Migration**: See `M3_MIGRATION_GUIDE.md` for details

