# Security, Validation, and Testing

## AI agent prompt

Add security, validation, and testing to the spare parts sales website. The website handles user accounts, seller data, orders, payments, and uploads, so it must not rely only on frontend validation.

## Security requirements

### Authentication security

- Hash passwords.
- Use secure sessions or safe token handling.
- Protect dashboard routes.
- Prevent role escalation.

### Authorization security

- Customer can see only their own orders.
- Seller can update only their own offers.
- Seller can see only relevant orders.
- Admin-only routes must reject all non-admin users.

### Input validation

Validate:

- registration data
- login data
- part forms
- pack forms
- seller offer forms
- cart data
- checkout data
- payment data
- uploaded files

### Sanitization

Sanitize user text fields to reduce injection and XSS risks.

Fields that need sanitization:

- customer notes
- seller notes
- descriptions
- warranty text
- addresses

### Upload security

- Accept images only.
- Limit file size.
- Generate safe file names.
- Do not execute uploaded files.
- Store uploads outside sensitive code folders when possible.

### Payment security

- Do not store card information.
- Verify payment server-side.
- Use webhooks safely.
- Reject fake frontend payment success.

### Rate limiting

Add rate limits for:

- login
- registration
- checkout submission
- upload endpoints

## Testing plan

### Unit tests

Test:

- pack price calculation
- pack customization logic
- price comparison sorting
- cart validation
- order snapshot generation
- role permission helpers

### Integration tests

Test:

- customer registration/login
- seller offer creation
- add item to cart
- customize pack
- checkout with cash on delivery
- checkout with mock online payment
- admin creates part
- admin creates pack

### Permission tests

Test:

- customer cannot access seller dashboard
- seller cannot access admin dashboard
- seller cannot edit another seller offer
- customer cannot view another customer's order

### Upload tests

Test:

- valid image accepted
- non-image rejected
- oversized image rejected
- image path saved correctly

### Manual QA checklist

- Browse parts on mobile.
- Browse packs on mobile.
- Customize a pack.
- Compare seller prices.
- Create cash-on-delivery order.
- Create online mock payment order.
- Seller confirms customer call.
- Admin edits part.
- Admin edits pack.
- Admin filters orders.

## Expected files

Suggested structure:

```txt
src/middleware/securityMiddleware.js
src/middleware/rateLimitMiddleware.js
src/validators/
tests/unit/
tests/integration/
tests/permissions/
```

## Acceptance criteria

- Backend validates all important input.
- Role restrictions are tested.
- Upload restrictions work.
- Payment status cannot be faked from frontend.
- Pack pricing tests pass.
