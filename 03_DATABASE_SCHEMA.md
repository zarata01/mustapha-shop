# Database Schema — MongoDB + Mongoose

## Core idea

Separate base spare part data from seller-specific selling data.

- `Part`: the official catalog item.
- `SellerOffer`: price and stock from a specific seller for a specific part.
- `Pack`: a bundle template created by admin.
- `Order`: a customer order with snapshots of selected items, prices, sellers, and pack modifications.

## Collections

### User

Fields:

- `_id`
- `name`
- `email`
- `phone`
- `passwordHash`
- `role`: customer, seller, admin
- `isActive`
- `createdAt`
- `updatedAt`

### SellerProfile

Fields:

- `_id`
- `userId`
- `businessName`
- `businessPhone`
- `address`
- `city`
- `description`
- `ratingAverage`
- `ratingCount`
- `isVerified`
- `isActive`
- `createdAt`
- `updatedAt`

### Category

Fields:

- `_id`
- `name`
- `slug`
- `parentId`
- `description`
- `imagePath`
- `sortOrder`
- `isActive`

Use parent categories to support navigation such as:

- Engine
- Brakes
- Suspension
- Electrical
- Body parts
- Filters
- Oils and fluids
- Cooling system

### VehicleMake

Fields:

- `_id`
- `name`
- `slug`
- `country`
- `isActive`

### VehicleModel

Fields:

- `_id`
- `makeId`
- `name`
- `slug`
- `generation`
- `startYear`
- `endYear`
- `isActive`

### VehicleEngine

Fields:

- `_id`
- `modelId`
- `engineCode`
- `fuelType`
- `displacement`
- `power`
- `startYear`
- `endYear`
- `isActive`

### Part

Fields:

- `_id`
- `name`
- `slug`
- `categoryId`
- `description`
- `brand`
- `manufacturerPartNumber`
- `oemNumbers`: array of strings
- `aftermarketNumbers`: array of strings
- `universalBarcode`
- `standardIds`: object for normalized identifiers
- `attributes`: flexible key/value object
- `compatibility`: array of vehicle compatibility objects
- `images`: array of image paths
- `tags`: array of strings
- `isActive`
- `createdAt`
- `updatedAt`

Example compatibility object:

```json
{
  "makeId": "...",
  "modelId": "...",
  "engineId": "...",
  "startYear": 2012,
  "endYear": 2018,
  "notes": "Compatible with 1.6 petrol engine"
}
```

### SellerOffer

Fields:

- `_id`
- `sellerId`
- `partId`
- `sellerSku`
- `price`
- `currency`
- `stockQuantity`
- `availabilityStatus`: in_stock, low_stock, out_of_stock, preorder
- `condition`: new, used, refurbished, aftermarket, original
- `warrantyText`
- `deliveryEstimate`
- `sellerNotes`
- `isActive`
- `createdAt`
- `updatedAt`

Indexes:

- `{ partId: 1, price: 1 }`
- `{ sellerId: 1, partId: 1 }` unique if one active offer per seller per part.

### Pack

Fields:

- `_id`
- `name`
- `slug`
- `description`
- `categoryId`
- `images`
- `items`: array of pack item objects
- `suggestedExtras`: array of part IDs
- `isActive`
- `createdAt`
- `updatedAt`

Example pack item:

```json
{
  "partId": "...",
  "quantity": 1,
  "itemType": "required",
  "replaceableGroup": "front_brake_pad",
  "allowedAlternativePartIds": ["..."],
  "notes": "Required for full brake service"
}
```

### Cart

Optional if using persistent carts.

Fields:

- `_id`
- `userId` or `sessionId`
- `items`
- `customizedPacks`
- `createdAt`
- `updatedAt`

### Order

Fields:

- `_id`
- `orderNumber`
- `customerUserId`
- `customerSnapshot`
- `carSnapshot`
- `itemsSnapshot`
- `packsSnapshot`
- `totals`
- `paymentMethod`: online, cash_on_delivery
- `paymentStatus`: unpaid, pending, paid, failed, refunded
- `orderStatus`: pending, waiting_confirmation, confirmed, preparing, shipped, delivered, cancelled
- `confirmationStatus`
- `assignedSellerIds`
- `statusHistory`
- `createdAt`
- `updatedAt`

Customer snapshot:

```json
{
  "fullName": "",
  "phone": "",
  "secondaryPhone": "",
  "city": "",
  "address": "",
  "deliveryNotes": ""
}
```

Item snapshot:

```json
{
  "partId": "...",
  "partName": "Brake pads",
  "selectedSellerId": "...",
  "sellerName": "Seller A",
  "quantity": 1,
  "unitPrice": 4500,
  "currency": "DZD",
  "condition": "new",
  "warrantyText": "3 months"
}
```

### PaymentTransaction

Fields:

- `_id`
- `orderId`
- `provider`
- `providerTransactionId`
- `amount`
- `currency`
- `status`
- `rawProviderResponse`
- `createdAt`
- `updatedAt`

### UploadedFile

Fields:

- `_id`
- `originalName`
- `storedName`
- `path`
- `mimeType`
- `size`
- `uploadedBy`
- `usedFor`: part, pack, category, seller
- `createdAt`

## Important indexes

Add indexes for:

- Part name text search
- OEM numbers
- manufacturer part number
- category ID
- vehicle compatibility fields
- seller offer part ID and price
- order number
- order status
- payment status

## Data integrity rules

- Do not delete parts used in orders. Mark them inactive instead.
- Do not delete seller offers used in orders. Mark them inactive instead.
- Orders must store snapshots because prices and seller data can change later.
- Uploaded files must be deleted only when no active entity uses them.
