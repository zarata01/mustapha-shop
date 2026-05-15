# Frontend UX, Unique CSS Style, and Responsive JavaScript

## AI agent prompt

Build a customer-friendly frontend for the spare parts sales website. The website must have a unique CSS style, strong responsive behavior, clear navigation, and smooth customer experience.

## Visual direction

Create a style that feels:

- mechanical
- trustworthy
- modern
- clean
- marketplace-focused
- suitable for car spare parts

Suggested design elements:

- dark header with strong accent color
- card-based product layout
- clear price comparison tables
- badges for stock and condition
- strong call-to-action buttons
- subtle mechanical pattern/background
- clean forms

Do not copy generic Bootstrap appearance. Custom CSS is required.

## Main customer pages

Build:

- home page
- spare parts listing page
- category page
- part details page
- seller comparison table
- packs listing page
- pack customizer page
- cart page
- checkout page
- order confirmation page

## Navigation system

Header must include:

- logo/name
- spare parts navigation
- packs navigation
- search bar
- cart link
- login/account link

Mobile must include:

- hamburger menu
- collapsible categories
- easy cart access

## Spare parts listing UI

Include:

- filter sidebar on desktop
- collapsible filters on mobile
- product cards
- price starts from display
- stock status
- seller count
- view details button

## Part details UI

Include:

- image gallery
- part information
- compatibility info
- identifiers
- attributes
- seller price comparison table
- add to cart action

## Packs UI

Pack listing should show:

- pack image
- pack name
- description
- number of items
- starting price
- customize button

Pack details/customizer must show:

- included items
- required/optional/replaceable labels
- remove optional item button
- replace item selector
- suggested extras
- live price total
- add customized pack to cart

## Checkout UX

Checkout must be clear:

- contact information section
- delivery information section
- car information section
- payment method section
- order summary section
- final submit button

## Responsive JavaScript

Implement JavaScript for:

- mobile menu
- filter toggles
- pack live price update
- quantity changes in cart
- seller selection updates
- form validation feedback
- image gallery preview

## Accessibility basics

- Buttons must be real buttons.
- Forms must have labels.
- Color contrast must be readable.
- Interactive elements must be keyboard accessible.
- Error messages must be visible and clear.

## Expected files

Suggested structure:

```txt
views/layouts/main.ejs
views/home.ejs
views/catalog/
views/packs/
views/cart/
views/checkout/
views/partials/
public/css/main.css
public/css/responsive.css
public/css/admin.css
public/css/seller.css
public/js/main.js
public/js/filters.js
public/js/packCustomizer.js
public/js/cart.js
```

## Acceptance criteria

- Website is usable on mobile.
- Website is usable on desktop.
- Spare parts and packs navigation are clear.
- Pack customization is interactive.
- Seller price comparison is easy to read.
- CSS has a distinct custom identity.
