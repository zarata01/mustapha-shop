# AI Agent Implementation Plan

## AI agent prompt

Implement the spare parts sales website in phases. Finish each phase cleanly before moving to the next. Do not mix all systems together.

## Phase 1 — Project setup

Tasks:

- Create project structure.
- Setup Express server.
- Connect MongoDB.
- Setup environment variables.
- Setup static files.
- Setup view engine or frontend app.
- Create global error handler.

Deliverables:

- server runs locally
- database connects
- basic home page works
- README setup instructions

## Phase 2 — Authentication and roles

Tasks:

- Create User model.
- Create SellerProfile model.
- Implement register/login/logout.
- Implement role middleware.
- Protect admin and seller routes.

Deliverables:

- customer login works
- seller login works
- admin login works
- routes are protected

## Phase 3 — Catalog system

Tasks:

- Create Category model.
- Create Part model.
- Create vehicle compatibility models.
- Build parts listing page.
- Build part details page.
- Build search and filters.
- Build admin part/category management.

Deliverables:

- admin can create parts
- customer can browse/search parts
- part details show identifiers and compatibility

## Phase 4 — Seller offers and price comparison

Tasks:

- Create SellerOffer model.
- Build seller offer dashboard.
- Build price comparison service.
- Show seller offers on part details page.

Deliverables:

- seller can set price/stock
- customer can compare prices
- customer can choose seller offer

## Phase 5 — Packs system

Tasks:

- Create Pack model.
- Build admin pack management.
- Build pack details page.
- Build pack customization service.
- Build frontend pack customizer.

Deliverables:

- admin can create packs
- customer can modify pack
- live price calculation works

## Phase 6 — Cart and checkout

Tasks:

- Create cart logic.
- Add single item to cart.
- Add customized pack to cart.
- Build checkout form.
- Validate stock and prices before order creation.
- Create Order model.
- Store snapshots.

Deliverables:

- customer can place order
- order stores customer info
- order stores item/pack snapshots

## Phase 7 — Payment system

Tasks:

- Create PaymentTransaction model.
- Add payment method choice.
- Implement cash-on-delivery flow.
- Implement mock online payment provider.
- Add payment status to admin order view.

Deliverables:

- cash-on-delivery order works
- mock online payment order works
- payment status is visible

## Phase 8 — Seller order confirmation

Tasks:

- Show relevant orders in seller dashboard.
- Add customer call status updates.
- Add confirmation status updates.
- Add order status history.

Deliverables:

- seller can call/confirm customer
- status history is saved

## Phase 9 — Admin dashboard completion

Tasks:

- Add dashboard summary cards.
- Add order filters.
- Add seller management.
- Add seller offer moderation.
- Add file review if needed.

Deliverables:

- admin controls the platform
- admin can monitor orders and sellers

## Phase 10 — UI polish and responsiveness

Tasks:

- Improve custom CSS.
- Improve mobile navigation.
- Improve pack customizer UX.
- Improve price comparison tables.
- Add loading and error states.

Deliverables:

- website works well on mobile and desktop
- customer flow is clear

## Phase 11 — Security and testing

Tasks:

- Add backend validation.
- Add rate limiting.
- Add upload security.
- Add tests for services and permissions.
- Add seed data.

Deliverables:

- critical tests pass
- role permissions verified
- upload restrictions verified

## Final project structure suggestion

```txt
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  validators/
  utils/
views/
  layouts/
  partials/
  catalog/
  packs/
  cart/
  checkout/
  orders/
  admin/
  seller/
public/
  css/
  js/
  uploads/
tests/
  unit/
  integration/
seed/
.env.example
README.md
package.json
```

## Final acceptance checklist

- Customer can browse spare parts.
- Customer can browse packs.
- Customer can modify packs.
- Customer can compare sellers.
- Customer can order with contact information.
- Customer can choose online payment or cash on delivery.
- Seller can set prices and stock.
- Seller can confirm customer by phone.
- Admin can manage parts and packs.
- Admin can view orders and payments.
- MongoDB stores data.
- Images are stored as files.
- CSS is custom and responsive.
