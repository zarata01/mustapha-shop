# Mustapha Shop — Spare Parts Sales Website

Mustapha Shop is a spare-parts marketplace project for customers, sellers, and admins. Customers will browse normalized car spare-part catalog items, compare seller offers, customize ready-made packs, and submit orders with contact and delivery details so sellers can call to confirm.

## Default technical target

- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Frontend: EJS server-rendered pages with responsive JavaScript
- Styling: custom CSS with a mechanical marketplace identity
- Images: file uploads with saved paths in MongoDB
- Authentication: session-based authentication
- Payments: pluggable payment provider abstraction plus cash on delivery

## Current implementation status

Phase 1 is started and includes:

- Express application factory and server entry point.
- MongoDB connection helper.
- Environment variable loading, MongoDB direct-URI fallback, and `.env.example`.
- Session, security, rate-limit, static asset, and error middleware.
- Responsive home page with customer navigation.
- Placeholder routes for catalog, packs, cart, checkout, login, admin dashboard, and seller dashboard.
- Initial integration tests for home, health, and protected admin routing.

## Main goals

The website must allow customers to browse car spare parts, browse ready-made packs, modify packs, compare seller prices, place orders, choose a payment method, and submit contact information so a seller can call and confirm the order.

The platform must support three roles:

1. Customer
2. Seller
3. Admin

## Project structure

```txt
src/
  config/          Environment and database helpers
  controllers/     Request handlers
  middleware/      Auth, rate limiting, and error middleware
  models/          Mongoose models (future phases)
  routes/          Express routers
  services/        Business logic (future phases)
  validators/      Request validation (future phases)
  utils/           Shared helpers (future phases)
views/             EJS pages and partials
public/            Static CSS, JS, and uploads
tests/             Node test runner suites
seed/              Seed scripts and sample data (future phases)
```

## Setup instructions

1. Install Node.js 20 or newer.
2. Install MongoDB locally or provide a MongoDB connection string.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

5. Update `.env` with your MongoDB URI and a long random `SESSION_SECRET`.
6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open `http://localhost:3000`.


## MongoDB connection troubleshooting

Atlas `mongodb+srv://` connection strings require DNS SRV lookups. Some development networks, containers, and DNS resolvers block those lookups, which can produce errors such as `querySrv ECONNREFUSED`. If that happens, copy the Atlas standard connection string into `MONGODB_DIRECT_URI` in `.env`. The server will try `MONGODB_URI` first, then retry `MONGODB_DIRECT_URI` when the first connection fails because of DNS or network resolution.

For local frontend work, `DB_REQUIRED=false` lets the server start even when MongoDB is temporarily unavailable. Production defaults to requiring the database, and credentials are redacted from database connection logs.

## Available scripts

- `npm run dev` — run the Express server with Nodemon.
- `npm start` — run the Express server with Node.
- `npm test` — run the Node test runner.

## Recommended file usage order

The Markdown build package remains the implementation guide:

1. `00_MASTER_AI_AGENT_PROMPT.md`
2. `01_PROJECT_OVERVIEW.md`
3. `02_FEATURE_REQUIREMENTS.md`
4. `03_DATABASE_SCHEMA.md`
5. `04_AUTH_AND_ROLES_SYSTEM.md`
6. `05_SPARE_PARTS_CATALOG_SYSTEM.md`
7. `06_PACKS_SYSTEM.md`
8. `07_SELLER_PRICING_SYSTEM.md`
9. `08_ORDER_AND_CHECKOUT_SYSTEM.md`
10. `09_PAYMENT_SYSTEM.md`
11. `10_ADMIN_DASHBOARD_SYSTEM.md`
12. `11_SELLER_DASHBOARD_SYSTEM.md`
13. `12_IMAGES_AND_FILES_SYSTEM.md`
14. `13_API_ROUTES_AND_CONTROLLERS.md`
15. `14_FRONTEND_UX_CSS_RESPONSIVE_SYSTEM.md`
16. `15_SECURITY_VALIDATION_AND_TESTING.md`
17. `16_AI_AGENT_IMPLEMENTATION_PLAN.md`

## Rule for AI agents

Do not build everything in one file. Create clear folders, models, routes, controllers, services, validation files, views/components, public assets, and tests. Keep each system independent but connected through clean interfaces.
