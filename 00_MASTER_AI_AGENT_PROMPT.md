# Master AI Agent Prompt — Spare Parts Sales Website

You are an expert full-stack web development AI agent. Build a production-ready spare parts sales website using the requirements in this package.

## Project summary

Create a website where customers can browse and order car spare parts and ready-made spare-part packs. Customers can modify packs by adding or removing items. Multiple sellers can offer the same item with different prices, and the website must show customers the price differences between sellers. Customers can pay online or choose hand-to-hand payment when the order arrives. Customers must submit their contact and delivery information so a seller can call them to confirm the order.

## Required roles

Implement these roles:

- Customer: browse, customize packs, compare prices, create orders, choose payment method.
- Seller: manage prices, stock, availability, and assigned orders.
- Admin: manage catalog items, categories, packs, sellers, orders, and platform data.

## Required core systems

Build these systems as separate modules:

1. Authentication and role permissions
2. Spare parts catalog and navigation
3. Packs catalog and pack customization
4. Seller item pricing and seller comparison
5. Cart, checkout, and order management
6. Online payment and cash-on-delivery logic
7. Admin dashboard
8. Seller dashboard
9. Image/file upload and storage
10. Responsive frontend and custom CSS style
11. API routes, validation, and error handling
12. Security, testing, and deployment preparation

## Default implementation target

Use:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Server-side rendered pages or a clean frontend structure
- Custom CSS and responsive JavaScript
- File-based image storage with MongoDB paths

If a different frontend framework is used, keep the same architecture and data models.

## Main quality rules

- Keep the project modular.
- Never hardcode role permissions in random pages; use middleware.
- Validate all user input.
- Sanitize all user-generated text.
- Store uploaded images safely.
- Never store card information directly.
- Use order status history instead of overwriting important order changes.
- Make the customer experience simple: browse, compare, customize, order, confirm.
- Make admin and seller dashboards practical and fast to use.

## Important business behavior

- A spare part is a platform catalog item.
- A seller listing/offer is the seller-specific price, stock, condition, availability, and warranty for that catalog item.
- A pack is a collection of catalog items, but the customer can modify it before ordering.
- The final order must store a snapshot of selected items, selected sellers, quantities, prices, pack modifications, customer information, payment method, and confirmation status.
- Customers should clearly see seller price differences before ordering.

## Output expected from AI agent

Produce a working project with:

- Clear folder structure
- Database models
- Routes and controllers
- Views/components
- CSS files
- JavaScript files
- Upload handling
- Role-based dashboards
- Seed data for categories, parts, sellers, and packs
- README with setup instructions
- Environment variable example
- Testing plan

## Do not do this

- Do not put all logic in one file.
- Do not mix admin logic with customer logic.
- Do not make packs static only; packs must be modifiable.
- Do not attach prices directly only to base parts; prices belong to seller offers/listings.
- Do not store uploaded images in MongoDB binary fields unless explicitly requested.
- Do not skip validation and permissions.
