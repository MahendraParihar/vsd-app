# Quick UX Theme Generation Prompt

## 🚀 Copy-Paste Prompt Template

Use this prompt when asking AI (ChatGPT, Claude, etc.) to generate a UX theme:

---

```
Create a complete Angular Material 19 + Nx design system with the following specifications:

PROJECT TYPE: [Community website / Event management / Directory]
TARGET AUDIENCE: [Community members / General public]
LANGUAGE SUPPORT: Hindi (Devanagari) + English (Bilingual)

BRAND COLORS:
- Primary: #243154 (Navy blue)
- Accent: #E41B1B (Red) - for buttons and CTAs
- Success: #4caf50
- Warning: #ff9800
- Error: #f44336

TYPOGRAPHY:
- Font: 'Noto Sans' + 'Noto Sans Devanagari'
- Sizes: 12, 14, 16, 18, 20, 24, 32, 36, 40, 48, 60px
- Weights: 300, 400, 500, 600, 700

SPACING SYSTEM:
- Base: 8px
- Scale: 0, 4, 8, 12, 16, 20, 24, 32, 48, 64, 80px
- Container max-width: 1280px

COMPONENTS NEEDED:
1. Feature Card with:
   - Full-width image at top (200px height)
   - Category badge + read time
   - Title (2-line max, bold)
   - Description (2-line max)
   - "Read more" link (red) + Share icon button
   - Hover: lift 4px, shadow, image zoom

2. Sticky Header with:
   - Logo + navigation menu
   - Theme toggle (dark/light)
   - Mobile responsive (hamburger menu)

3. Theme Switcher:
   - Icon toggle (sun/moon)
   - localStorage persistence
   - Smooth transitions

DESIGN STYLE:
- Clean, modern, minimal
- Generous whitespace
- Subtle shadows
- Smooth animations (300ms)
- Mobile-first responsive
- WCAG AA accessible

DELIVERABLES:
- Complete SCSS design system
- Reusable components
- Light & dark themes
- Utility classes
- Documentation
- Demo page with examples
```

---

## 🎨 Alternative: Specific Feature Request

For generating specific features:

```
Based on the existing design system (Primary: #243154, Accent: #E41B1B), 
create a [FEATURE NAME] with:

LAYOUT: [Describe layout]
COMPONENTS: [List components needed]
INTERACTIONS: [Describe hover/click behaviors]
RESPONSIVE: [Mobile, tablet, desktop requirements]
DATA: [What data fields to display]

Use the existing card patterns, color palette, and spacing system.
Include:
- Component TypeScript file
- HTML template
- SCSS styles
- Usage example
```

---

## 📋 Feature-Specific Prompts

### Events Listing Page
```
Create an Events listing page with:
- Grid of event cards (3 columns on desktop, 2 on tablet, 1 on mobile)
- Each card shows: image, date badge (accent color), title, time, location, description
- Filter options: upcoming, past, category
- Search functionality
- "Load more" button
Use existing design system colors and spacing.
```

### Mandals Directory
```
Create a Mandals directory page with:
- Card layout showing: logo/image, mandal name, description, member count, location
- Alphabetical sorting
- Search by name or location
- Contact information display
- Map integration option
Use primary color for headers, accent for CTAs.
```

### Temple Showcase
```
Create a Temples showcase with:
- Large image gallery cards
- Temple name, location, timings, history
- Grid layout with hover effects
- "Get Directions" button
- Photo gallery modal
Use accent color for CTA buttons, primary for headings.
```

## 🎯 Component Generation Prompts

### Generate Single Component

```
Create a [COMPONENT NAME] component for Angular 19:

VISUAL DESIGN:
- Style: [Modern card / List item / Banner / etc.]
- Layout: [Horizontal / Vertical / Grid]
- Colors: Primary #243154, Accent #E41B1B
- Rounded corners: 12px
- Shadow: Subtle with hover lift

DATA STRUCTURE:
{
  [property]: [type],
  [property]: [type]
}

INTERACTIONS:
- Click: [action]
- Hover: [effect]
- Share: [functionality]

OUTPUTS:
- TypeScript component class
- HTML template
- SCSS styles (using design system variables)
- Usage example
```

## 🔄 Theme Variation Prompts

### Generate Color Variation

```
Using the existing new-website design system structure, 
create a new color theme with:

PRIMARY: [Hex color]
ACCENT: [Hex color]
STYLE: [Professional / Playful / Elegant / Modern]

Generate:
- Complete 10-shade palette for both colors
- Material theme configuration (light + dark)
- CSS variables
- Example cards showing the new colors
```

### Generate Dark Theme Optimization

```
Optimize the dark theme for better readability:
- Adjust text contrast ratios
- Modify shadow opacity
- Update component backgrounds
- Ensure WCAG AA compliance
- Test on OLED screens
```

## 📖 Usage Examples

### Example 1: Generate Complete Theme
```
I need a complete UX theme for a cultural community website.
Use the UX_THEME_GENERATION_PROMPT.md specifications.
Colors: Primary #243154, Accent #E41B1B.
Include feature cards, events calendar, mandals directory.
Support Hindi and English text.
```

### Example 2: Generate Single Feature
```
Create event detail cards based on the web-app project pattern.
Show: large image, date badge (accent color), title, time, location.
Add "View More" link and share button.
Use existing color variables and spacing system.
```

### Example 3: Customize Existing Component
```
Update the feature-card component:
- Make image taller (250px instead of 200px)
- Use gradient overlay on image
- Add author name below description
- Change category badge to accent color background
Keep existing hover effects and responsive behavior.
```

## 💡 Tips for Better Prompts

### Be Specific
❌ "Make it look nice"
✅ "Use 12px rounded corners, 4px lift on hover, accent color for CTAs"

### Reference Existing Patterns
❌ "Create a card"
✅ "Create a card like the web-app event-card but with simplified metadata"

### Include Data Structure
❌ "Show event information"
✅ "Show: title (string), date (Date), location (string), image (url)"

### Specify Interactions
❌ "Make it interactive"
✅ "Hover: lift 4px + shadow, Click: navigate to /details/:id, Share: open share modal"

### Define Responsive Behavior
❌ "Make it responsive"
✅ "Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column, Images: 200px height on desktop, 180px on mobile"

## 🎨 Visual Style Keywords

Use these keywords to describe the desired aesthetic:

- **Modern**: Clean lines, minimal, lots of whitespace
- **Professional**: Subtle colors, conservative, trustworthy
- **Vibrant**: Bold colors, high contrast, energetic
- **Elegant**: Refined, sophisticated, subtle animations
- **Playful**: Rounded corners, bright colors, bouncy animations
- **Minimal**: Sparse, essential elements only, maximumwhitespace
- **Material**: Google Material Design patterns
- **Glassmorphism**: Frosted glass effects, transparency
- **Neumorphism**: Soft shadows, subtle 3D effects

## 📚 Reference Projects

When generating themes, mention:
- "Based on web-app project at `/Users/mahendraparihar/Projects/VSD/vsd-app/web-app`"
- "Following the same structure as new-website"
- "Use design patterns from VSD web-app"

---

## ✅ Success Criteria

A good theme generation should include:
1. ✅ All color variables defined
2. ✅ Complete typography system
3. ✅ Responsive breakpoints
4. ✅ Reusable components
5. ✅ Light & dark themes
6. ✅ Utility classes
7. ✅ Animation system
8. ✅ Documentation
9. ✅ Working demo page
10. ✅ Build passes without errors

---

**Pro Tip**: Save successful prompts and their outputs for future reference and iteration!

