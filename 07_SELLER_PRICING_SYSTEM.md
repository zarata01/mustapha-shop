# Seller Pricing and Price Comparison System

## AI agent prompt

Build a seller pricing system where multiple sellers can offer the same spare part with different prices, stock, condition, warranty, and delivery information. Customers must clearly see the differences between sellers.

## Core rule

Do not store selling price only in the base `Part` model. Store seller-specific price in `SellerOffer`.

## Seller offer fields

Each seller offer must include:

- seller ID
- part ID
- seller SKU
- price
- currency
- stock quantity
- availability status
- item condition
- warranty text
- delivery estimate
- seller notes
- active/inactive status

## Seller dashboard features

Seller must be able to:

- Search catalog items.
- Create an offer for a catalog item.
- Update price.
- Update stock.
- Update condition.
- Update warranty details.
- Update delivery estimate.
- Disable offer.
- See their active and inactive offers.

## Customer comparison table

On a part page, show a table with:

| Seller | Price | Stock | Condition | Warranty | Delivery | Action |
|---|---:|---|---|---|---|---|

Sort default:

1. in stock first
2. lowest price first
3. verified sellers first if ratings exist

## Cart selection rule

When a customer adds an item to cart, the cart must store:

- part ID
- selected seller offer ID
- seller ID
- quantity
- current price snapshot

Before checkout, revalidate that:

- seller offer still exists
- seller offer is active
- stock is enough
- price is still valid

If price changed, show customer the updated price before final order creation.

## Admin moderation

Admin must be able to:

- view all seller offers
- disable suspicious offers
- filter offers by seller
- filter offers by part
- detect very low or very high prices

## Suggested services

Create services:

- `sellerOfferService`
- `priceComparisonService`
- `cartValidationService`

## Expected files

Suggested structure:

```txt
src/models/SellerOffer.js
src/controllers/sellerOfferController.js
src/controllers/adminSellerOfferController.js
src/routes/sellerOfferRoutes.js
src/routes/adminSellerOfferRoutes.js
src/services/priceComparisonService.js
src/validators/sellerOfferValidators.js
views/seller/offers/
views/partials/sellerComparisonTable.ejs
```

## Acceptance criteria

- Seller can create an offer for a part.
- Seller can update only their own offers.
- Customer can compare all seller prices for a part.
- Customer can choose a seller before adding item to cart.
- Checkout revalidates price and stock.
- Admin can disable bad offers.
