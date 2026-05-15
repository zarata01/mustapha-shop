# Feature Requirements

## Customer features

### Browse spare parts

Customers must be able to:

- Browse spare parts by category.
- Search by part name, part number, OEM number, seller SKU, car make, car model, year, engine, or category.
- Filter by seller, price range, condition, brand, availability, warranty, and compatibility.
- Open a part details page.
- See all sellers offering that part.
- Compare prices between sellers.
- Add an item to cart from the chosen seller.

### Browse packs

Customers must be able to:

- Browse ready-made packs.
- Open a pack details page.
- See all included spare parts.
- See required and optional items.
- Remove optional items.
- Replace allowed alternatives.
- Add compatible extra items.
- See the price update live after modification.
- Add the customized pack to cart.

### Checkout

Customers must be able to:

- Review selected items and packs.
- Enter full name, phone number, secondary phone number if available, address, city, delivery notes, and car information.
- Choose online payment or hand-on-hand payment when the order arrives.
- Submit the order.
- Receive an order number and order status.

### Order confirmation

The system must save customer information so the seller can call the customer. Order confirmation status must be tracked.

Suggested confirmation statuses:

- waiting_customer_confirmation
- seller_called
- customer_confirmed
- customer_unreachable
- cancelled_by_customer
- confirmed_for_delivery

## Seller features

Sellers must be able to:

- Login to seller dashboard.
- View catalog items.
- Add or update their price for an item.
- Set stock quantity.
- Set item condition: new, used, refurbished, aftermarket, original.
- Set warranty details.
- Set availability status.
- View assigned orders.
- Mark customer call status.
- Update order preparation status.

## Admin features

Admins must be able to:

- Add, remove, and update catalog items.
- Add, remove, and update categories.
- Add, remove, and update car compatibility data.
- Add, remove, and update packs.
- Manage users.
- Manage sellers.
- View all orders.
- View payment statuses.
- Review uploaded images.
- Disable bad sellers or suspicious listings.

## Pack customization rules

Each pack item must have a type:

- required: cannot be removed.
- optional: can be removed.
- replaceable: can be replaced with compatible alternatives.
- suggested_extra: not inside by default, but suggested to customer.

The system must store the final customized pack as an order snapshot, not only as a reference to the original pack.

## Seller price comparison rules

For each catalog item, the system must show seller offers in a clear comparison table.

Comparison fields:

- seller name
- price
- stock status
- item condition
- warranty
- delivery time estimate
- seller rating if available
- add to cart action

## Search and navigation requirements

The navigation must support:

- Spare parts categories.
- Car make/model/year/engine compatibility.
- Packs categories.
- Popular items.
- Recently added items.
- Best price offers.

## Responsive design requirements

The website must work well on:

- Mobile phones
- Tablets
- Desktop screens

Important customer actions must be easy to click on mobile.
