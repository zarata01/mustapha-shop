# Project Overview

## Website name

Spare Parts Sales Website

## Purpose

The website helps customers find car spare parts and spare-part packs, compare seller prices, customize packs, and place orders with either online payment or cash-on-delivery payment.

## Main user story

A customer enters the website, chooses a car spare-parts category or a ready-made pack, checks available sellers and prices, modifies the pack if needed, enters contact and delivery information, chooses payment method, and submits the order. A seller then calls the customer to confirm the order.

## Main business entities

### Customer

A user who browses products, creates a cart, modifies packs, places orders, and submits contact/delivery information.

### Seller

A business or person who sells spare parts. A seller can set prices and stock for catalog items they sell.

### Admin

A platform manager who controls base catalog data, packs, sellers, users, and orders.

### Spare part catalog item

The normalized item stored by the platform. It describes the spare part itself, independent from seller price.

### Seller offer/listing

The seller-specific sale information for a catalog item: price, stock, warranty, condition, shipping availability, and seller notes.

### Pack

A bundle of spare parts prepared for a common use case. Customers can modify the pack by adding, removing, or changing items before checkout.

### Order

The final customer request, containing the customer details, selected items, selected sellers, quantities, prices, payment method, and confirmation status.

## Key experience goals

- Simple navigation for car spare parts.
- Simple navigation for packs.
- Clear seller price comparison.
- Easy pack modification.
- Clear checkout flow.
- Responsive design for phones and desktops.
- Fast admin actions for adding, removing, and updating items and packs.
- Practical seller tools for pricing and stock management.

## Non-goals for first version

These can be added later but should not block the first version:

- Full VIN decoding integration.
- Advanced ERP/accounting integration.
- Full warehouse automation.
- Multi-country tax automation.
- AI-based part recognition from images.
