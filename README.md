# Grocery Booking API Documentation

## Overview

This document outlines the API endpoints for a Grocery Booking application, categorized by role responsibilities: Admin and User.

## Base URL

All URLs referenced in the documentation have the base path:


## Authentication

Most endpoints require authentication. Authentication is performed via JWT tokens. Include the token in the Authorization header:


## Roles

- **Admin:** Responsible for managing grocery items and inventory.
- **User:** Can view grocery items and place orders.

## Endpoints

### Admin Endpoints

#### Add New Grocery Items

- **POST** `/items`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Array of items `[{"name": "Milk", "price": 3.99, "inventory": 100}, ...]`
- **Description:** Adds new grocery items to the system.

#### View Existing Grocery Items

- **GET** `/item`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `page`, `pageSize`, `excludeDeleted`
- **Description:** Retrieves a paginated list of grocery items.

#### Remove Grocery Items

- **DELETE** `/item`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `id` (item ID)
- **Description:** Removes a grocery item from the system.

#### Update Grocery Item Details

- **PUT** `/item`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Item details `{ "id": 1, "name": "Milk", "price": 4.99 }`
- **Description:** Updates details of an existing grocery item.

#### Manage Inventory Levels

- **PATCH** `/item`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Inventory update `{ "id": 1, "inventory": 150 }`
- **Description:** Updates the inventory level of a grocery item.

### User Endpoints

#### View List of Available Grocery Items

- **GET** `/items`
- **Headers:** Optional `Authorization: Bearer <token>` for users
- **Description:** Gets a list of all available grocery items.

#### Place an Order

- **POST** `/order`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Order details `{ "orderItems": [{"itemId": 1, "quantity": 2}, ...] }`
- **Description:** Places a new order with multiple grocery items.

### Authentication Endpoints

#### Login

- **POST** `/api/login`
- **Body:** `{ "email": "user@example.com", "password": "password123" }`
- **Description:** Authenticates a user and returns a JWT token.

#### Sign Up

- **POST** `/api/signup`
- **Body:** `{ "email": "newuser@example.com", "password": "password123", "role": "user", "name": "John Doe" }`
- **Description:** Registers a new user and returns a JWT token.

### Run App
- npm install
- npm run dev
---

