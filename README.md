# QUO-E-Invoice-Backend API
This is the backend for our QUO E-Invoice system. It handles user authentication, invoice management.

## Overview 
- **Base URL**: `https://quo-e-invoice-backend.onrender.com`
<!-- - **Authentication**: No authentication required for these endpoints (public). -->
- **Content Type**: `application/json`

**Frontend***
https://quo-e-invoice-frontend.vercel.app/

# API Endpoints

## Authentication
## Sign Up (POST /api/auth/sign-up)
  - Register a new user

```json
{
  "username": "username",
  "password": "password"
}
```
#### What you'll get back (on success):
  - Status: 201 Created

```json
{
  "token": "your.jwt.token.here"
}
```
## Sign In (POST /api/auth/sign-in)
  - Login and get JWT token

What to send:
(Same as sign-up)

#### What you'll get back (on success):
  - Status: 200 OK

````json

{
  "token": "your.jwt.token.here"
} 
```` 

# User Stuff 
## Get All Users (GET /api/users)
[Admin-only] Get a list of all users

#### Headers:
  - Authorization: Bearer your.jwt.token.here

#### Success Response:

  - Status: 200 OK

````json

[
  {"username": "user1", "_id": "123"},
  {"username": "user2", "_id": "456"}
]
````
## Get Specific User (GET /api/users/:userId)
Get details for one user.

#### Headers:
  - Authorization: Bearer your.jwt.token.here

#### Success Response:
  - Status: 200 OK

````json
{
  "user": {
    "username": "testuser",
    "_id": "123"
  }
}
````
## Create New Invoice (POST /api/invoices)
Make a brand new invoice.

#### What to send:

````json
{
  "companyName": "Acme Inc",
  "phoneNumber": "12345678",
  "address": "123 Street",
  "lineItems": [
    {
      "itemNo": "001",
      "description": "Web Design",
      "quantity": 1,
      "amount": 1000
    }
  ],
  "subtotal": 1000,
  "total": 1070,
  "status": "draft"
}
````

## Update Invoice (PUT /api/invoices/:id)
Edit an existing invoice.

#### Success Response:
  - Status: 200 OK
  - Body: The updated invoice
#### Success Response:
  - Status: 201 Created

## Delete Invoice (DELETE /api/invoices/:id)
Remove an invoice permanently.

#### Success Response:
  - Status: 200 OK

## Tech 
  - Backend: Node.js + Express
  - Database: MongoDB
  - Auth: JWT (JSON Web Tokens)
  - Security: bcrypt for password hashin
    
## Deployment
  - Render





