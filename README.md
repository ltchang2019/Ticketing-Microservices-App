# Typescript-Microservices-Practice

## Summary
- **App:** Ticketing application adhering to microservices architecture
- **Services:**
  - Authorization:
    - Handles user login + cookie and jwt storage
  - Tickets: 
    - Keeps track of tickets created and updated by users
    - Listens for OrderCreated and OrderCancelled events to update holds on ticket update availability
    - Publishes TicketCreated and TicketUpdated events to notify Orders and Expiration services of necessary updates
  - Orders:
    - Keeps track of orders placed, payed for, or cancelled (or expired) by customers
    - Listens for TicketCreated, TicketUpdated, ExpirationComplete, and PaymentCreated events to update its versions of orders
    - Publishes OrderCreated and OrderCancelled events to notify Tickets and Payments services of necessary updates
  - Expiration:
    - Contains queue of placed orders and emits events to other services once order's payment window has expired
    - Listens for OrderCreated events to enqueue new expiring order
    - Publishes ExpirationComplete events to notify Orders service of necessary updates
  - Payments: 
    - In charge of handling payments through Stripe API and notifying Orders service of payments completed
    - Listens for OrderCancelled and OrderCreated events to create new order objects internally
    - Publishes PaymentCreated events to notify Orders service of necessary updates
  
- **Stack/Libraries:**
  - Events: NATS Streaming Server
  - Expiration Service: Bull JS, Redis
  - DB: MongoDB
  - Payments: Stripe
  - Client: React, NextJS
  - Deployments: Docker and Kubernetes (with GCloud)
  - CI/CD (dev): Skaffold
  - Testing: Jest, Supertest
  
- **Common Library:** https://www.npmjs.com/package/@lt-ticketing/common

### Completed
- Backend implementations for following services:
  - Authorization
  - Tickets
  - Orders
  - Expiration
  - Payments
- Basic frontend implementation for user login/logout

### Todo
- Update client frontend to incorporate everything other than authorization
