# Authentication and Roles System

## AI agent prompt

Build a secure authentication and authorization system for the spare parts sales website. The system must support customers, sellers, and admins. Implement role-based middleware and protect every dashboard route.

## Roles

### Customer

Can:

- Browse items and packs.
- Manage cart.
- Place orders.
- View their own orders.

Cannot:

- Access seller dashboard.
- Access admin dashboard.
- Change seller prices.
- Change catalog data.

### Seller

Can:

- Access seller dashboard.
- Create and update their own seller offers.
- View orders assigned to them.
- Update confirmation/call status for assigned orders.

Cannot:

- Edit base catalog items unless admin allows a request workflow.
- Edit another seller's offers.
- Access admin-only actions.

### Admin

Can:

- Manage all catalog data.
- Manage packs.
- Manage sellers and users.
- View all orders.
- Moderate listings.
- Disable users, sellers, and offers.

## Required pages/routes

- Register customer
- Login
- Logout
- Forgot password placeholder or reset flow
- Seller login
- Admin login
- Customer account page
- Seller dashboard protected routes
- Admin dashboard protected routes

## Middleware requirements

Create middleware functions:

- `requireAuth`
- `requireRole(role)`
- `requireAdmin`
- `requireSeller`
- `requireCustomerOrGuestCheckout`
- `attachCurrentUser`

## Password security

- Hash passwords with bcrypt or a secure equivalent.
- Never store plain passwords.
- Validate password length and strength.
- Use secure cookies if session auth is used.

## Session/JWT rules

If using sessions:

- Use secure session cookies.
- Store only user ID and safe role info in session.
- Use CSRF protection for forms.

If using JWT:

- Store tokens safely.
- Add refresh token logic if needed.
- Protect API routes with token middleware.

## Authorization checks

Every sensitive action must check ownership and role.

Examples:

- Seller can update only their own offers.
- Seller can view only assigned orders.
- Customer can view only their own orders.
- Admin can view and modify all platform data.

## Validation requirements

Validate:

- Email format.
- Phone format.
- Password strength.
- Required fields.
- Role creation restrictions.

Sellers should not be able to create admin accounts.

## Expected files

Suggested structure:

```txt
src/models/User.js
src/models/SellerProfile.js
src/controllers/authController.js
src/routes/authRoutes.js
src/middleware/authMiddleware.js
src/middleware/roleMiddleware.js
src/validators/authValidators.js
```

## Acceptance criteria

- Customer registration works.
- Login and logout work.
- Protected pages redirect unauthenticated users.
- Seller routes reject customers.
- Admin routes reject sellers and customers.
- Seller cannot update another seller's offer.
- Passwords are hashed.
