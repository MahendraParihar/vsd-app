# Material Design 3 - Quick Reference

## 🎨 Color Usage

### In Components
```html
<!-- Primary color (Coral/Orange #FF5733) -->
<button mat-raised-button color="primary">Primary Button</button>
<mat-toolbar color="primary">Toolbar</mat-toolbar>

<!-- Tertiary color (Yellow) -->
<button mat-raised-button color="accent">Accent Button</button>

<!-- Error/Warn color -->
<button mat-raised-button color="warn">Delete</button>
```

### In SCSS
```scss
// Use CSS variables for theme colors
.my-element {
  background-color: var(--mat-sys-primary);
  color: var(--mat-sys-on-primary);
}

// Or use Material mixins
@use '@angular/material' as mat;

.themed-component {
  @include mat.button-color($theme, $color-variant: primary);
}
```

## 🎨 M3 Color Tokens

### Primary Colors
```scss
--mat-sys-primary          // #FF5733
--mat-sys-on-primary       // Text on primary
--mat-sys-primary-container
--mat-sys-on-primary-container
```

### Surface Colors
```scss
--mat-sys-surface          // Card backgrounds
--mat-sys-on-surface       // Text on surfaces
--mat-sys-surface-variant
--mat-sys-on-surface-variant
```

### Tertiary Colors (Accent)
```scss
--mat-sys-tertiary         // Yellow accent
--mat-sys-on-tertiary
--mat-sys-tertiary-container
--mat-sys-on-tertiary-container
```

### Error Colors
```scss
--mat-sys-error
--mat-sys-on-error
--mat-sys-error-container
--mat-sys-on-error-container
```

## 📦 Common Patterns

### Custom Button with Theme Color
```html
<button mat-button [style.color]="'var(--mat-sys-primary)'">
  Custom Colored Button
</button>
```

### Card with Primary Background
```html
<mat-card [style.background-color]="'var(--mat-sys-primary-container)'">
  <mat-card-content>
    <p [style.color]="'var(--mat-sys-on-primary-container)'">
      Content with proper contrast
    </p>
  </mat-card-content>
</mat-card>
```

### Icon with Theme Color
```html
<mat-icon [style.color]="'var(--mat-sys-primary)'">favorite</mat-icon>
```

## 🌓 Theme Switching

### Toggle Dark Mode
```typescript
// In your component
export class ThemeToggleComponent {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }
}
```

```html
<button mat-icon-button (click)="toggleTheme()">
  <mat-icon>{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</mat-icon>
</button>
```

## 🎭 Elevation & Surfaces

### Elevation Levels
```html
<!-- Level 0: Flat -->
<mat-card class="mat-elevation-z0">Flat Card</mat-card>

<!-- Level 1: Slight -->
<mat-card class="mat-elevation-z1">Raised Card</mat-card>

<!-- Level 2: Medium -->
<mat-card class="mat-elevation-z2">Elevated Card</mat-card>

<!-- Level 3+: High -->
<mat-card class="mat-elevation-z8">High Elevation</mat-card>
```

## 📱 Responsive Design with M3

```scss
// Use Material's breakpoint system
@use '@angular/material' as mat;

.responsive-component {
  @include mat.media-breakpoint('xs', 'sm') {
    // Mobile styles
  }
  
  @include mat.media-breakpoint('md', 'lg') {
    // Tablet styles
  }
  
  @include mat.media-breakpoint('xl') {
    // Desktop styles
  }
}
```

## 🔧 Custom Component Theming

### Create Theme-Aware Component
```scss
@use '@angular/material' as mat;

// Define your component's theme
@mixin my-component-theme($theme) {
  // Get color config from theme
  $color-config: mat.get-theme-color($theme);
  
  .my-component {
    background-color: mat.get-theme-color($theme, primary);
    color: mat.get-theme-color($theme, on-primary);
  }
}

// Apply in your styles
@use './my-component-theme' as my-component;

html {
  @include my-component.my-component-theme($light-theme);
}

.dark-theme {
  @include my-component.my-component-theme($dark-theme);
}
```

## ⚡ Performance Tips

1. **Use CSS Variables**: Faster than SCSS variables in runtime
2. **Minimize Theme Includes**: Only include component themes you use
3. **Lazy Load Themes**: Load dark theme only when needed
4. **Cache Theme Preference**: Store in localStorage

```typescript
// Cache theme preference
localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

// Restore on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}
```

## 🎯 Common Gotchas

### ❌ Don't Use Old M2 API
```scss
// ❌ Old M2
$theme: mat.m2-define-light-theme(...);

// ✅ New M3
$theme: mat.define-theme(...);
```

### ❌ Don't Use Deprecated Color Attribute
```html
<!-- ❌ Accent is deprecated in M3 -->
<button mat-button color="accent">Button</button>

<!-- ✅ Use primary or custom styling -->
<button mat-button color="primary">Button</button>
```

### ❌ Don't Hardcode Colors
```scss
// ❌ Hardcoded
.my-element {
  background-color: #ff5733;
}

// ✅ Use theme variables
.my-element {
  background-color: var(--mat-sys-primary);
}
```

## 🛠️ Development Tools

### Material Theme Builder
Generate custom M3 palettes: https://material-foundation.github.io/material-theme-builder/

### Color Contrast Checker
Ensure accessibility: https://webaim.org/resources/contrastchecker/

### Chrome DevTools
- Inspect M3 CSS variables in Elements panel
- Use "Rendering" tab to test dark mode
- Check color contrast in Lighthouse

## 📚 Resources

- **M3 Guidelines**: https://m3.material.io/
- **Angular Material M3**: https://material.angular.io/guide/material-3
- **Component Gallery**: https://material.angular.io/components/categories
- **Theme Builder**: https://material-foundation.github.io/material-theme-builder/
- **Color System**: https://m3.material.io/styles/color/overview

## 🚀 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Lint project
npm run lint

# Run tests
npm test
```

---

**Version**: 3.0.0  
**Material**: 19.0.2  
**Last Updated**: November 9, 2025

