# Seller Dashboard System

## AI agent prompt

Build a seller dashboard that allows sellers to manage their offers, prices, stock, availability, and orders that contain their items.

## Seller dashboard sections

### Dashboard home

Show seller summary:

- active offers
- low stock offers
- orders waiting confirmation
- confirmed orders
- delivered orders
- revenue estimate if payment/order data allows it

### Offer management

Seller can:

- search catalog items
- create offer for a catalog item
- update price
- update stock quantity
- update condition
- update warranty text
- update delivery estimate
- activate/deactivate offer

### Orders

Seller can view orders containing their items.

Seller must see:

- order number
- customer name
- customer phone
- delivery city/address
- items from this seller
- quantities
- payment method
- payment status
- confirmation status
- order status

Seller must not edit items belonging to another seller.

### Customer confirmation workflow

Seller can update:

- seller called customer
- customer confirmed
- customer unreachable
- cancelled by customer
- confirmed for delivery

Every update must create a status history entry.

## Offer ownership rules

A seller can only:

- create offers under their own seller profile
- update their own offers
- disable their own offers
- see order details relevant to their own items

## Seller permissions denied

Seller cannot:

- create admin account
- edit base part data
- edit pack templates
- edit another seller's price
- view another seller's private dashboard
- mark online payment as paid manually

## Expected files

Suggested structure:

```txt
src/controllers/sellerDashboardController.js
src/controllers/sellerOfferController.js
src/controllers/sellerOrderController.js
src/routes/sellerRoutes.js
src/middleware/sellerMiddleware.js
src/services/sellerOrderService.js
src/validators/sellerOfferValidators.js
views/seller/dashboard.ejs
views/seller/offers/
views/seller/orders/
public/css/seller.css
public/js/sellerDashboard.js
```

## Acceptance criteria

- Seller dashboard is protected.
- Seller can create and update own offers.
- Seller cannot update another seller's offers.
- Seller can see assigned/relevant orders.
- Seller can update customer confirmation status.
- Seller order updates are stored in history.
