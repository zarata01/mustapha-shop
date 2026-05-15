# Admin Dashboard System

## AI agent prompt

Build an admin dashboard that allows platform administrators to manage spare parts, categories, packs, sellers, users, seller offers, images, and orders.

## Admin dashboard sections

### Dashboard home

Show summary cards:

- total orders
- pending orders
- waiting confirmation orders
- paid orders
- unpaid cash-on-delivery orders
- active sellers
- active parts
- active packs

### Parts management

Admin can:

- list parts
- search parts
- create part
- edit part
- disable part
- upload images
- manage identifiers
- manage compatibility
- manage attributes

### Categories management

Admin can:

- create category
- edit category
- set parent category
- sort categories
- disable category

### Vehicle data management

Admin can:

- create vehicle make
- create vehicle model
- create engine data
- update compatibility data

### Packs management

Admin can:

- create pack
- edit pack
- disable pack
- upload pack images
- add/remove pack items
- set item type required/optional/replaceable
- add suggested extras

### Sellers management

Admin can:

- view sellers
- verify seller
- disable seller
- edit seller profile
- view seller offers
- view seller orders

### Seller offers moderation

Admin can:

- view all offers
- filter by seller
- filter by part
- disable suspicious offers
- inspect price anomalies

### Orders management

Admin can:

- view all orders
- filter by status
- filter by payment status
- filter by seller
- open order details
- see customer information
- see status history
- update global order status when needed

### Uploaded files management

Admin can:

- view uploaded images
- see where images are used
- delete unused images

## UI requirements

Admin dashboard must be practical, not decorative only.

Required UI elements:

- sidebar navigation
- tables with search/filter
- create/edit forms
- status badges
- pagination
- confirmation dialogs for dangerous actions
- mobile fallback layout

## Security rules

- All admin routes require admin role.
- Validate every form.
- Prevent non-admin access even if URL is known.
- Log important destructive actions.

## Expected files

Suggested structure:

```txt
src/controllers/adminDashboardController.js
src/controllers/adminPartController.js
src/controllers/adminCategoryController.js
src/controllers/adminPackController.js
src/controllers/adminSellerController.js
src/controllers/adminOrderController.js
src/routes/adminRoutes.js
src/middleware/adminMiddleware.js
views/admin/dashboard.ejs
views/admin/parts/
views/admin/categories/
views/admin/packs/
views/admin/sellers/
views/admin/orders/
public/css/admin.css
public/js/adminTables.js
```

## Acceptance criteria

- Admin dashboard is protected.
- Admin can manage parts.
- Admin can manage packs.
- Admin can manage categories.
- Admin can manage sellers.
- Admin can view and filter orders.
- Admin can see payment and confirmation status.
