# UX Theme Generation Prompt Template

## 📋 Prompt for AI to Generate UX Theme

Use this comprehensive prompt when asking AI to design/generate a UX theme for your project:

---

## **Complete UX Theme Generation Request**

I need you to create a complete, production-ready UX/UI theme and design system for an Angular Material 19 + Nx project. Base the design on these specifications:

### **🎨 Project Context**
- **Project Type**: [Community/Cultural website, Events management, Temple directory, etc.]
- **Target Audience**: [Community members, General public, Specific demographics]
- **Primary Language**: Hindi (Devanagari) + English (Bilingual support required)
- **Framework**: Angular 19, Angular Material 19, Nx 20, TypeScript, SCSS

### **🎯 Brand Identity**

#### Color Palette
- **Primary Color**: #243154 (Dark navy blue)
- **Accent Color**: #E41B1B (Vibrant red) - Used for buttons and CTAs
- **Warn Color**: #ff5722 (Orange-red)
- **Success Color**: #4caf50 (Green)
- **Icon Color**: #272b3e (Dark grey-blue)
- **Border Color**: #DBDBDB (Light grey)

#### Typography
- **Primary Font**: Noto Sans + Noto Sans Devanagari
- **Font Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Font Sizes**: 
  - Headlines: 40px, 36px, 32px, 24px, 20px
  - Body: 18px (body-1), 16px (body-2)
  - Caption: 12px
- **Line Heights**: Matching font sizes (48px, 40px, 32px, 28px, 24px, 20px, 18px, 12px)

#### Spacing System
- **Base Unit**: 8px (rem-based)
- **Scale**: 0, 4, 8, 12, 16, 20, 24, 32, 48, 64, 80px
- **Container**: Max-width 1280px with responsive padding

#### Border Radius
- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px
- **Extra Large**: 20px

#### Shadows
- **Default**: 0px 6px 16px rgba(0, 0, 0, 0.1)
- **Hover**: Enhanced elevation
- **Cards**: Subtle shadow with hover lift effect

### **🧩 Required Components**

#### 1. Feature Card Component
- **Layout**: Vertical card with image at top
- **Structure**:
  ```
  ┌─────────────────────┐
  │  [Full-width Image] │ ← 200px height, covers top, rounded corners
  ├─────────────────────┤
  │ [Tag] X min read    │ ← Metadata row (category badge + read time)
  │                     │
  │ Bold Title          │ ← 2-line max, bold font
  │                     │
  │ Description text... │ ← 2-line max, grey text
  │                     │
  │ Read more → [Share] │ ← Red link with arrow + share icon button
  └─────────────────────┘
  ```
- **Features**:
  - Image: Full-width, no margin, rounded top corners only
  - Category badge: Light blue pill, 12px font, capitalized
  - Read time: Grey text, 12px
  - Title: Bold 18px, 2-line clamp, dark color
  - Description: Regular 14px, 2-line clamp, grey color
  - "Read more" link: Red (#E41B1B), arrow icon aligned, slides right on hover
  - Share button: Icon button, turns red on hover
  - Hover: Lift 4px, enhanced shadow, image zoom 1.03x

#### 2. Header Component
- **Position**: Fixed at top, sticky
- **Height**: 64px
- **Background**: Primary color (#243154)
- **Contents**:
  - Left: Logo + Site title (Noto Sans font)
  - Center: Navigation buttons (Home, Events, Mandals, Temples)
  - Right: Theme toggle (dark/light) + Mobile menu icon
- **Responsive**: Navigation collapses to hamburger on mobile (<768px)

#### 3. Theme Switcher
- **Type**: Icon button toggle
- **Icons**: light_mode (sun) / dark_mode (moon)
- **Position**: Top-right in header
- **Functionality**: Toggle between light/dark themes
- **Persistence**: Save preference to localStorage
- **Animation**: Icon rotation/fade transition

#### 4. Date Badge Component (for Events)
- **Design**: Colored box with date and month
- **Background**: Accent color (#f45b21 or similar)
- **Text**: White, centered
- **Border Radius**: 12px
- **Size**: ~86px width
- **Usage**: Shows event dates prominently

### **🎨 Theme Specifications**

#### Light Theme (Default)
- Background: #fafafa
- Surface: #ffffff
- Card: #ffffff
- Text Primary: rgba(0, 0, 0, 0.87)
- Text Secondary: rgba(0, 0, 0, 0.54)
- Dividers: rgba(0, 0, 0, 0.12)

#### Dark Theme
- Background: #121212
- Surface: #1e1e1e
- Card: #2c2c2c
- Text Primary: #ffffff
- Text Secondary: rgba(255, 255, 255, 0.7)
- Dividers: rgba(255, 255, 255, 0.12)

### **📱 Responsive Design**

#### Breakpoints
- XS: 480px
- SM: 640px
- MD: 768px
- LG: 1024px
- XL: 1280px
- 2XL: 1536px

#### Mobile-First Approach
- Start with mobile layouts
- Add complexity at larger breakpoints
- Navigation collapses to hamburger menu on mobile
- Cards stack in single column on mobile
- Grid layouts adjust: 1 col → 2 cols → 3 cols

### **✨ UX Patterns**

#### Card Interactions
- Hover: Lift effect (translateY -4px to -8px)
- Hover: Enhanced shadow
- Hover: Image zoom (scale 1.03x)
- Click: Navigate to details
- Smooth transitions: 300ms cubic-bezier(0.4, 0, 0.2, 1)

#### Button States
- Default: Filled with accent color (#E41B1B)
- Hover: Slightly darker shade
- Active: Scale down slightly
- Disabled: 50% opacity
- Focus: Outline ring for accessibility

#### Animations
- Page Load: Fade in + slide up
- Stagger: Sequential animation with 100ms delays
- Hover: Smooth transforms
- Theme Switch: Fade transition 300ms

#### Typography Hierarchy
```
H1: 40px/48px, Medium weight - Page titles
H2: 36px/40px, Medium weight - Section titles
H3: 32px/40px, Medium weight - Subsection titles
H4: 24px/32px, Medium weight - Card titles
H5: 20px/24px, Medium weight - Small headings
H6: 18px/24px, Medium weight - Smallest headings
Body-1: 18px/24px, Regular - Main content
Body-2: 16px/20px, Regular - Secondary content
Caption: 12px/12px, Regular - Helper text
```

### **🔧 Technical Requirements**

#### SCSS Architecture
```
libs/style-lib/src/lib/
├── _colors.scss          # Color palettes and CSS variables
├── _typography.scss      # Font system with mixins
├── _spacing.scss         # Spacing scale and utilities
├── _variables.scss       # Breakpoints, shadows, z-index
├── _mixins.scss         # Reusable mixins (flex, cards, etc.)
├── _animations.scss      # Keyframes and animation classes
├── _utilities.scss       # Utility classes
├── themes/
│   ├── light-theme.scss # M2 light theme config
│   └── dark-theme.scss  # M2 dark theme config
└── styles.scss          # Main entry point
```

#### Key Features to Include
1. CSS Variables for runtime theming
2. Utility classes (flex, spacing, text, shadows)
3. Responsive breakpoint mixins
4. Animation keyframes and classes
5. Material theme customization (M2 API)
6. Accessibility features (focus rings, ARIA)
7. RTL support consideration
8. Print styles consideration

### **📐 Layout Patterns**

#### Hero Section
- Full-width gradient background
- Primary color gradient (135deg)
- Centered content with max-width container
- Large heading + subtitle + CTA buttons
- Padding: 80px-100px vertical

#### Content Sections
- Padding: 80px vertical (60px on mobile)
- Container: 1280px max-width
- Background: Alternating (background-color / surface-color)
- Gap between sections: Natural flow

#### Grid Layouts
- Auto-fit/auto-fill with minmax
- Minimum item width: 280px-320px
- Gap: 24px (var(--spacing-6))
- Responsive: 1 col → 2 cols → 3 cols

### **🎯 Specific Use Cases**

#### Events Feature
- Card with event image, title, date badge, location, time
- "View More" link with underline
- Date badge: Accent color background, white text
- Icons: Clock, location (from custom icon set)

#### Mandals Feature
- List/Grid of mandal organizations
- Card with logo/image, name, description
- Member count display
- Contact information

#### Temples Feature
- Image gallery style
- Temple name, location, timings
- Map integration display
- Architecture/heritage information

### **🚀 Deliverables Expected**

1. **Complete color system** with 10-shade palettes
2. **Typography system** with all heading/body styles
3. **Spacing utilities** and mixins
4. **Component library** in shared-ui-lib:
   - Feature cards
   - Date badges
   - Buttons (custom styled)
   - Icons wrapper
   - Labels
5. **Theme switcher** component with persistence
6. **Responsive layouts** for all components
7. **Animations** for page transitions and interactions
8. **Documentation** with usage examples

### **📖 Design Principles**

1. **Consistency**: Use design tokens throughout
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Performance**: Optimized CSS, lazy loading images
4. **Scalability**: Modular, reusable components
5. **Maintainability**: Well-documented, organized code
6. **Cultural Sensitivity**: Support for Hindi/Devanagari script
7. **Modern**: Clean, minimal, professional aesthetic
8. **Responsive**: Mobile-first, fluid layouts

### **🎨 Visual Style Guidelines**

- **Aesthetic**: Clean, modern, professional
- **Imagery**: High-quality photos, proper aspect ratios
- **Whitespace**: Generous spacing, breathing room
- **Hierarchy**: Clear visual hierarchy with typography
- **Colors**: Purposeful use, semantic meaning
- **Shadows**: Subtle, Material Design elevation
- **Borders**: Minimal, only where needed for separation
- **Interactions**: Smooth, predictable, delightful

---

## **Example Output Format**

After generating the theme, provide:

1. **Design System Documentation** (DESIGN_SYSTEM.md)
2. **Color palette** with all variables
3. **Component showcase** page
4. **Usage examples** for each component
5. **Migration guide** if updating existing project
6. **Accessibility checklist**
7. **Performance metrics** (bundle size, load time)

---

## **Quick Reference - Key Values**

```scss
// Colors
Primary: #243154
Accent: #E41B1B
Success: #4caf50
Warning: #ff9800
Error: #f44336

// Typography
Font: 'Noto Sans', 'Noto Sans Devanagari'
Base size: 16px
Scale: 12, 14, 16, 18, 20, 24, 32, 36, 40px

// Spacing (8px base)
xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

// Breakpoints
sm: 640px, md: 768px, lg: 1024px, xl: 1280px

// Shadows
sm: 0 2px 4px rgba(0,0,0,0.1)
md: 0 4px 8px rgba(0,0,0,0.1)
lg: 0 8px 16px rgba(0,0,0,0.12)

// Border Radius
sm: 4px, md: 8px, lg: 12px, xl: 20px

// Transitions
fast: 150ms, base: 300ms, slow: 500ms
```

---

## **Usage Example**

When prompting an AI:

> "Using the UX Theme Generation Prompt template, create a complete design system for a temple directory website. Include all components specified with the exact colors (Primary: #243154, Accent: #E41B1B), use Noto Sans fonts with Hindi support, and ensure the feature cards match the reference design with image at top, metadata row, 2-line title and description, and 'Read more' link with share button."

---

This prompt ensures consistent, high-quality theme generation aligned with your web-app's design standards.

