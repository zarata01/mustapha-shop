# Packs System

## AI agent prompt

Build a packs system where admin can create ready-made spare-part packs and customers can customize them before ordering. Packs are templates, but orders must store final customized pack snapshots.

## What is a pack?

A pack is a prepared group of spare parts for a common need.

Examples:

- Oil change pack
- Brake service pack
- Suspension repair pack
- Cooling system pack
- Basic maintenance pack

## Pack data

Each pack must have:

- name
- slug
- description
- category
- images
- included items
- suggested extras
- active/inactive status

## Pack item types

Each pack item must have one of these types:

### required

The customer cannot remove it.

### optional

The customer can remove it.

### replaceable

The customer can replace it with allowed alternative parts.

### suggested_extra

Not included by default, but suggested to customer.

## Customer pack customization

Customers must be able to:

- Open pack details.
- See included items.
- See which items are required.
- Remove optional items.
- Replace replaceable items.
- Add suggested extras.
- Choose seller offers for each item if multiple sellers exist.
- See live price changes.
- Add the final customized pack to cart.

## Pack pricing logic

Pack price should be calculated from selected seller offers for the selected items.

Rules:

- Required item prices always count.
- Optional removed item prices do not count.
- Replaced item uses replacement item price.
- Suggested extra price counts only if added.
- Quantity must be included in calculation.
- If a selected seller offer becomes unavailable before checkout, the system must ask customer to choose another seller.

## Admin pack management

Admin must be able to:

- create pack
- update pack
- disable pack
- add pack image
- add required item
- add optional item
- add replaceable item
- define allowed alternatives
- define suggested extras

## Pack order snapshot

When an order is created, store a snapshot like:

```json
{
  "packId": "...",
  "packName": "Oil Change Pack",
  "customizations": {
    "removedPartIds": ["..."],
    "addedPartIds": ["..."],
    "replacements": [
      {
        "oldPartId": "...",
        "newPartId": "..."
      }
    ]
  },
  "finalItems": [
    {
      "partId": "...",
      "partName": "Oil Filter",
      "sellerId": "...",
      "sellerName": "Seller A",
      "quantity": 1,
      "unitPrice": 1200
    }
  ],
  "packTotal": 7500
}
```

## Frontend behavior

The pack page must feel interactive:

- Remove optional item button.
- Replace item selector.
- Add extra item button.
- Seller offer dropdown or comparison modal.
- Live price total.
- Mobile-friendly layout.

## Expected files

Suggested structure:

```txt
src/models/Pack.js
src/controllers/packController.js
src/controllers/adminPackController.js
src/routes/packRoutes.js
src/routes/adminPackRoutes.js
src/services/packPricingService.js
src/services/packCustomizationService.js
src/validators/packValidators.js
views/packs/
views/admin/packs/
public/js/packCustomizer.js
```

## Acceptance criteria

- Admin can create and edit packs.
- Customer can view pack details.
- Customer can remove optional items.
- Customer can replace allowed items.
- Customer can add suggested extras.
- Final price updates correctly.
- Order stores final customized pack snapshot.
