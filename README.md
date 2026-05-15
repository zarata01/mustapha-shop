# Spare Parts Sales Website — AI Agent Build Package

This package contains separate Markdown files for building a full spare parts sales website with AI agents. Each file focuses on one system so the AI agent can implement the project in clean modules instead of mixing all features together.

## Default technical target

Use this default stack unless the developer explicitly chooses another one:

- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Frontend: HTML templates or component-based frontend, with responsive JavaScript
- Styling: custom CSS, unique visual identity, responsive layout
- Images: stored as files on the server or object storage, with file paths saved in MongoDB
- Authentication: session-based or JWT-based authentication
- Payments: pluggable payment provider abstraction, plus cash on delivery

## Main goals

The website must allow customers to browse car spare parts, browse ready-made packs, modify packs, compare seller prices, place orders, choose payment method, and submit contact information so a seller can call and confirm the order.

The platform must support three main roles:

1. Customer
2. Seller
3. Admin

## Recommended file usage order

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
