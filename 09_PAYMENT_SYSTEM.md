# Payment System

## AI agent prompt

Build a payment system that supports two payment methods: online payment and hand-on-hand payment when the order reaches the customer. The online payment system must be built as a provider abstraction so real payment providers can be added safely.

## Payment methods

### Online payment

Customer pays directly through the website using a payment provider.

### Cash on delivery / hand-on-hand payment

Customer pays when the pack or spare parts reach them.

Use the internal value:

```txt
cash_on_delivery
```

## Payment statuses

Use these statuses:

- unpaid
- pending
- paid
- failed
- cancelled
- refunded

## Online payment flow

1. Customer chooses online payment.
2. Order is created with payment status `pending`.
3. Payment transaction is created.
4. Customer is redirected to provider or payment widget.
5. Provider returns success/failure.
6. System verifies payment with provider.
7. System updates payment status.
8. Order continues to confirmation workflow.

## Cash on delivery flow

1. Customer chooses cash on delivery.
2. Order is created with payment status `unpaid`.
3. Order status becomes `waiting_confirmation`.
4. Seller calls customer.
5. If confirmed, order moves to preparation/delivery.
6. Payment can be marked paid after delivery if admin/seller has permission.

## Security rules

- Never store customer card numbers.
- Never trust frontend payment status.
- Always verify online payment server-side.
- Use payment webhooks if provider supports them.
- Keep raw provider response only if it does not contain sensitive data.

## Payment provider abstraction

Create a service interface like:

```js
createPayment(order)
verifyPayment(transactionId)
handleWebhook(payload)
refundPayment(transactionId, amount)
```

Implement a mock provider for development.

## Payment transaction model

Fields:

- orderId
- provider
- providerTransactionId
- amount
- currency
- status
- rawProviderResponse
- createdAt
- updatedAt

## Admin payment features

Admin must be able to:

- view payment status
- view payment transaction reference
- filter paid/unpaid/failed orders
- mark cash-on-delivery order as paid when appropriate
- review failed payments

## Expected files

Suggested structure:

```txt
src/models/PaymentTransaction.js
src/controllers/paymentController.js
src/routes/paymentRoutes.js
src/services/payment/paymentService.js
src/services/payment/mockPaymentProvider.js
src/services/payment/providerInterface.js
src/validators/paymentValidators.js
views/payment/
```

## Acceptance criteria

- Customer can choose online payment.
- Customer can choose cash on delivery.
- Online payment creates transaction record.
- Cash on delivery creates unpaid order.
- Payment status is stored and visible to admin.
- Frontend cannot fake paid status.
