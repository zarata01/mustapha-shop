# Spare Parts Catalog System

## AI agent prompt

Build a modular spare parts catalog system that supports car spare parts navigation, categories, standard identifiers, images, compatibility data, search, filtering, and seller price comparison.

## Main concept

The catalog item describes the spare part itself. It does not own the seller price. Seller prices are stored in seller offers.

## Required catalog features

### Categories

Create hierarchical categories:

- parent category
- child category
- slug
- image
- description
- active/inactive status

The frontend must show category navigation clearly.

### Spare part details

Each part must support:

- name
- slug
- category
- description
- brand
- manufacturer part number
- OEM numbers
- aftermarket numbers
- universal barcode if available
- normalized standard IDs object
- compatibility data
- images
- attributes
- tags
- active/inactive status

### Compatibility data

The system must support compatibility with:

- car make
- model
- generation
- year range
- engine
- notes

Customers should be able to filter by vehicle information.

### Flexible attributes

Different spare parts need different attributes. Use a flexible object for attributes.

Examples:

- brake pad material
- filter type
- oil viscosity
- voltage
- length
- diameter
- side: left/right/front/rear

Do not create hundreds of fixed database columns for every possible attribute.

## Search requirements

Search must check:

- part name
- brand
- manufacturer part number
- OEM numbers
- aftermarket numbers
- seller SKU through seller offer search
- category
- tags
- vehicle compatibility

## Filter requirements

Customers must be able to filter by:

- category
- make/model/year/engine
- brand
- price range
- seller
- condition
- availability
- warranty

## Part details page

The part page must show:

- part name
- images
- description
- compatibility
- identifiers
- attributes
- seller price comparison table
- add to cart from selected seller

## Admin catalog management

Admin must be able to:

- create part
- update part
- disable part
- upload images
- add identifiers
- add compatibility data
- manage categories

Do not permanently delete parts that exist in orders.

## Expected files

Suggested structure:

```txt
src/models/Part.js
src/models/Category.js
src/models/VehicleMake.js
src/models/VehicleModel.js
src/models/VehicleEngine.js
src/controllers/catalogController.js
src/controllers/adminPartController.js
src/routes/catalogRoutes.js
src/routes/adminPartRoutes.js
src/services/catalogSearchService.js
src/validators/partValidators.js
views/catalog/
views/admin/parts/
public/js/catalogFilters.js
```

## Acceptance criteria

- Customer can browse parts by category.
- Customer can search by part name or part number.
- Customer can filter by vehicle compatibility.
- Part page shows available sellers and prices.
- Admin can add, update, and disable parts.
- Parts support flexible attributes without schema rewrites.
