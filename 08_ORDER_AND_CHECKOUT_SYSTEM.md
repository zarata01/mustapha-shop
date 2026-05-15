# Order and Checkout System

## AI agent prompt

Build the cart, checkout, order creation, order snapshots, customer information collection, and seller confirmation workflow for the spare parts sales website.

## Customer checkout flow

1. Customer adds spare parts or customized packs to cart.
2. Customer opens cart and reviews items.
3. System validates price, stock, and seller availability.
4. Customer enters information.
5. Customer chooses payment method.
6. Customer submits order.
7. System creates order with snapshots.
8. Seller calls customer to confirm.
9. Order status is updated.

## Customer information fields

Required:

- full name
- phone number
- city
- address

Optional:

- second phone number
- delivery notes
- car make
- car model
- car year
- engine
- VIN/chassis number if the business wants it

## Cart behavior

The cart must support:

- single spare parts
- customized packs
- quantity updates
- item removal
- seller offer selection
- price recalculation
- stock validation

## Order snapshots

When creating an order, store snapshots so future changes do not corrupt old orders.

Store snapshots for:

- customer information
- selected spare parts
- selected seller offers
- selected seller names
- prices
- pack customizations
- totals
- payment method

## Order statuses

Suggested order statuses:

- pending
- waiting_confirmation
- confirmed
- preparing
- shipped
- delivered
- cancelled

## Confirmation statuses

Suggested confirmation statuses:

- waiting_customer_confirmation
- seller_called
- customer_confirmed
- customer_unreachable
- cancelled_by_customer
- confirmed_for_delivery

## Seller assignment logic

If an order contains items from one seller, assign that seller.

If an order contains items from multiple sellers, choose one of these approaches:

### Approach A: split internally by seller

Create one parent order and multiple seller sub-orders.

### Approach B: allow multi-seller order

Store `assignedSellerIds` and show only relevant items to each seller.

Recommended first version: Approach B for simplicity, unless delivery logistics require seller sub-orders.

## Seller order view

Seller must see:

- orders containing their items
- customer contact info
- items they must prepare
- call status
- confirmation status
- order status

Seller must not see unrelated seller private data.

## Admin order view

Admin must see:

- all orders
- customer details
- all seller assignments
- payment status
- order status
- confirmation status
- status history

## Status history

Every important order change should add a history entry:

```json
{
  "status": "confirmed",
  "changedBy": "userId",
  "changedByRole": "seller",
  "note": "Customer confirmed by phone",
  "createdAt": "date"
}
```

## Expected files

Suggested structure:

```txt
src/models/Cart.js
src/models/Order.js
src/controllers/cartController.js
src/controllers/checkoutController.js
src/controllers/orderController.js
src/controllers/sellerOrderController.js
src/controllers/adminOrderController.js
src/routes/cartRoutes.js
src/routes/checkoutRoutes.js
src/routes/orderRoutes.js
src/services/cartService.js
src/services/orderSnapshotService.js
src/services/orderStatusService.js
src/validators/checkoutValidators.js
views/cart/
views/checkout/
views/orders/
views/seller/orders/
views/admin/orders/
```

## Acceptance criteria

- Customer can add spare parts to cart.
- Customer can add customized packs to cart.
- Customer can update cart quantities.
- Checkout collects customer information.
- Order stores snapshots.
- Seller can update call/confirmation status.
- Admin can view all orders.
