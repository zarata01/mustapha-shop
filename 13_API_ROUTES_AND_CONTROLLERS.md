# API Routes and Controllers

## AI agent prompt

Create clear routes, controllers, services, and validators for the spare parts sales website. Keep routes thin, controllers organized, and business logic inside services.

## Architecture rule

Use this flow:

```txt
Route -> Middleware -> Validator -> Controller -> Service -> Model
```

Do not put all business logic directly in routes.

## Public customer routes

Suggested routes:

```txt
GET  /                         Home page
GET  /parts                    Parts listing
GET  /parts/:slug              Part details
GET  /categories/:slug         Category page
GET  /packs                    Packs listing
GET  /packs/:slug              Pack details/customizer
GET  /search                   Search results
```

## Cart and checkout routes

```txt
GET  /cart
POST /cart/items
PATCH /cart/items/:id
DELETE /cart/items/:id
POST /cart/packs
PATCH /cart/packs/:id
GET  /checkout
POST /checkout
GET  /orders/:orderNumber
```

## Auth routes

```txt
GET  /auth/register
POST /auth/register
GET  /auth/login
POST /auth/login
POST /auth/logout
```

## Seller routes

```txt
GET   /seller/dashboard
GET   /seller/offers
GET   /seller/offers/new
POST  /seller/offers
GET   /seller/offers/:id/edit
PATCH /seller/offers/:id
DELETE /seller/offers/:id
GET   /seller/orders
GET   /seller/orders/:id
PATCH /seller/orders/:id/confirmation
```

## Admin routes

```txt
GET    /admin/dashboard
GET    /admin/parts
GET    /admin/parts/new
POST   /admin/parts
GET    /admin/parts/:id/edit
PATCH  /admin/parts/:id
DELETE /admin/parts/:id

GET    /admin/packs
GET    /admin/packs/new
POST   /admin/packs
GET    /admin/packs/:id/edit
PATCH  /admin/packs/:id
DELETE /admin/packs/:id

GET    /admin/sellers
PATCH  /admin/sellers/:id

GET    /admin/orders
GET    /admin/orders/:id
PATCH  /admin/orders/:id/status
```

## JSON API routes if frontend needs them

```txt
GET  /api/parts/search
GET  /api/parts/:id/offers
GET  /api/packs/:id/calculate
POST /api/packs/customize
POST /api/cart/validate
POST /api/payment/create
POST /api/payment/webhook
```

## Controller rules

Controllers should:

- read request data
- call validator/service
- return response or render view
- handle expected errors cleanly

Controllers should not:

- contain huge database logic
- skip permission checks
- directly trust request body

## Service rules

Services should contain:

- pack customization logic
- price comparison logic
- order snapshot logic
- checkout validation logic
- payment provider logic
- search logic

## Error handling

Create a central error handler.

Handle:

- validation error
- authentication error
- authorization error
- not found error
- database error
- payment error
- upload error

## Expected files

Suggested structure:

```txt
src/routes/
src/controllers/
src/services/
src/validators/
src/middleware/errorHandler.js
src/utils/AppError.js
```

## Acceptance criteria

- Routes are organized by system.
- Controllers are not overloaded.
- Services contain business logic.
- Validation happens before database writes.
- Errors are handled consistently.
