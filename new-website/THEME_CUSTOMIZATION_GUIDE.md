# Theme Customization Guide

## 🎨 How to Customize Your Theme

This guide shows you how to customize colors, fonts, spacing, and other design elements based on your web-app's design system.

## **Quick Customization Checklist**

### ✅ Colors
- [ ] Update primary color in `_colors.scss`
- [ ] Update accent color (buttons, CTAs)
- [ ] Define semantic colors (success, warning, error)
- [ ] Update Material theme palettes in `themes/`

### ✅ Typography
- [ ] Set font family (with Hindi support if needed)
- [ ] Define font size scale
- [ ] Configure font weights
- [ ] Set line heights and letter spacing

### ✅ Spacing
- [ ] Define spacing scale (4px base recommended)
- [ ] Set container max-widths
- [ ] Configure responsive breakpoints

### ✅ Components
- [ ] Customize card styles
- [ ] Configure button styles
- [ ] Set up icon sizes
- [ ] Define shadow system

## **🎯 Key Files to Modify**

### 1. Colors (`libs/style-lib/src/lib/_colors.scss`)

```scss
// Your brand colors
$primary-color: #243154;  // Navy blue
$accent-color: #E41B1B;   // Red (buttons)
$warn-color: #ff5722;     // Orange-red
$success-color: #4caf50;  // Green

// Create 10-shade palettes
$primary-50: #e5e6ea;
$primary-500: #243154;
$primary-900: #0d1329;

// Update CSS variables
:root {
  --primary-color: #{$primary-color};
  --accent-color: #{$accent-color};
}
```

### 2. Typography (`libs/style-lib/src/lib/_typography.scss`)

```scss
// Font families
$font-family-base: 'Noto Sans', 'Noto Sans Devanagari', sans-serif;

// Font sizes (use rem for accessibility)
$font-size-base: 16px;
$font-size-lg: 18px;
$font-size-xl: 20px;
$font-size-2xl: 24px;
// ... up to 6xl (60px)

// Font weights
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### 3. Material Theme (`libs/style-lib/src/lib/themes/`)

#### Light Theme
```scss
// light-theme.scss
$custom-primary: (
  50: #e5e6ea,
  500: #243154,  // Your primary color
  900: #0d1329,
  // ... all shades
);

$light-primary: mat.m2-define-palette($custom-primary, 500);
$light-accent: mat.m2-define-palette($custom-red, 500); // #E41B1B
```

#### Dark Theme
```scss
// dark-theme.scss
$dark-primary: mat.m2-define-palette($custom-primary, 300); // Lighter shade
$dark-accent: mat.m2-define-palette($custom-red, 500);
```

### 4. Component Styles

#### Feature Card
```scss
// Location: libs/shared-ui-lib/src/lib/components/feature-card/

// Key properties:
.feature-card {
  border-radius: 12px;         // Rounded corners
  transition: all 0.3s;        // Smooth animations
  
  &:hover {
    transform: translateY(-4px); // Lift effect
    box-shadow: 0 8px 16px rgba(0,0,0,0.12);
  }
}

.card-image-container {
  height: 200px;               // Image height
  border-radius: 12px 12px 0 0; // Top corners only
}

.category-tag {
  background: var(--primary-50); // Light blue
  color: var(--primary-700);     // Dark blue text
  padding: 4px 12px;
  border-radius: 4px;
}
```

## **🎨 Design Patterns from web-app**

### Pattern 1: Event Cards with Date Badge
```html
<div class="event-card">
  <div class="date-badge" style="background: #f45b21;">
    <span class="day">15</span>
    <span class="month">Jan</span>
  </div>
  <h3>Event Title</h3>
  <div class="event-meta">
    <icon>clock</icon> 6:00 PM
    <icon>location</icon> Address
  </div>
  <a href="#">View More</a>
</div>
```

### Pattern 2: Section Layout
```html
<section class="content-section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <p class="section-subtitle">Description</p>
    <div class="content-grid">
      <!-- Cards or content -->
    </div>
  </div>
</section>
```

### Pattern 3: Bilingual Content
```html
<h1>Welcome नमस्ते</h1>
<p class="english">English text here</p>
<p class="hindi">हिंदी पाठ यहाँ</p>
```

## **🔧 Advanced Customization**

### Custom Material Component Theme

Override specific Material components:

```scss
// In your theme file
.mat-mdc-button {
  border-radius: 8px !important;
  text-transform: none;
  font-weight: 500;
}

.mat-mdc-card {
  border-radius: var(--border-radius-lg) !important;
}
```

### Custom Utility Classes

Add to `_utilities.scss`:

```scss
// Your custom utilities
.card-lift {
  @include hover-lift;
}

.gradient-primary {
  background: linear-gradient(135deg, #243154 0%, #1b2543 100%);
}

.text-accent {
  color: var(--accent-color);
}
```

### Custom Animations

Add to `_animations.scss`:

```scss
@keyframes customFade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-custom-fade {
  animation: customFade 400ms ease-out;
}
```

## **📊 Theme Variations**

### Creating Alternative Color Schemes

#### Option 1: Blue & Orange (web-app style)
```scss
$primary: #243154;  // Navy
$accent: #f45b21;   // Orange
```

#### Option 2: Blue & Red (new-website style)
```scss
$primary: #1976d2;  // Blue
$accent: #E41B1B;   // Red
```

#### Option 3: Purple & Pink
```scss
$primary: #7b1fa2;  // Purple
$accent: #e91e63;   // Pink
```

#### Option 4: Green & Teal
```scss
$primary: #2e7d32;  // Green
$accent: #00796b;   // Teal
```

## **🎯 Component Customization Examples**

### Customize Feature Card

```scss
// In your component or style override
lib-feature-card {
  .feature-card {
    border-radius: 16px; // Larger radius
    
    &:hover {
      transform: translateY(-8px); // More lift
    }
  }
  
  .card-image-container {
    height: 250px; // Taller image
  }
  
  .category-tag {
    background: var(--accent-color); // Red background
    color: white;
  }
}
```

### Customize Header

```scss
// In header.component.scss
.app-header {
  .toolbar {
    min-height: 80px; // Taller header
    background: linear-gradient(90deg, #243154 0%, #1b2543 100%);
  }
  
  .logo-text {
    font-size: 24px; // Larger logo text
    font-weight: 700;
  }
}
```

## **🌐 Bilingual Theme Considerations**

### Font Loading for Hindi

```html
<!-- In index.html -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Font Stack Priority

```scss
$font-family-base: 'Noto Sans', 'Noto Sans Devanagari', sans-serif;
// Browser automatically uses Devanagari font for Hindi characters
```

### Text Direction Support

```scss
[dir="rtl"] {
  .card-footer {
    flex-direction: row-reverse;
  }
  
  .read-more-link mat-icon {
    transform: rotate(180deg);
  }
}
```

## **✅ Testing Your Theme**

### Checklist
- [ ] Test light theme
- [ ] Test dark theme
- [ ] Test theme switcher
- [ ] Test on mobile (320px, 375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] Test Hindi text rendering
- [ ] Test mixed Hindi/English content
- [ ] Test color contrast (WCAG AA)
- [ ] Test keyboard navigation
- [ ] Test screen reader
- [ ] Test with images loading/failed
- [ ] Test all hover states
- [ ] Test all button states

## **🚀 Quick Start Commands**

```bash
# Generate new component with theme
nx g @nx/angular:component my-component --project=main

# Build with theme
npm run build

# Serve with hot reload
npm start

# Test theme on different ports
nx serve main --port 4300
```

## **📚 Additional Resources**

- Web-app project: `/Users/mahendraparihar/Projects/VSD/vsd-app/web-app`
- Design system docs: `DESIGN_SYSTEM.md`
- Component examples: Check `libs/shared-ui-lib/`
- Material theming: https://material.angular.io/guide/theming

---

**Need Help?**
Refer to the web-app project for real-world examples of all these patterns in action.

