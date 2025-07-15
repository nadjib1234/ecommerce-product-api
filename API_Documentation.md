E-commerce Product API Documentation
Version: 1.0.0
Base URL: http://localhost:3000
Author: Nadjib Kamel
Date: July 15, 2025
Overview
RESTful API for managing e-commerce products with full CRUD operations, filtering, and validation.
Tech Stack

Runtime: Node.js
Framework: Express.js
Dependencies: CORS, UUID
Validation: Custom middleware

Authentication
No authentication required for this version.

🔗 API Endpoints
1. Get All Products
GET /products
Description: Retrieves all products from the database.
Response Example:
json{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Classic T-Shirt",
      "category": "Apparel",
      "price": 29.99,
      "description": "Comfortable cotton t-shirt available in multiple colors",
      "stock": 150,
      "image": "https://example.com/tshirt.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 10,
  "message": "All products retrieved successfully"
}
Status Codes:

200 - Success
500 - Internal Server Error


2. Get Product by ID
GET /products/:id
Description: Retrieves a single product by its unique ID.
Parameters:

id (path) - Product ID (string, required)

Example Request:
GET /products/1
Response Example:
json{
  "success": true,
  "data": {
    "id": "1",
    "name": "Classic T-Shirt",
    "category": "Apparel",
    "price": 29.99,
    "description": "Comfortable cotton t-shirt available in multiple colors",
    "stock": 150,
    "image": "https://example.com/tshirt.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Product retrieved successfully"
}
Status Codes:

200 - Success
404 - Product not found
400 - Invalid product ID
500 - Internal Server Error

Error Response Example (404):
json{
  "success": false,
  "message": "Product with ID 999 not found"
}

3. Filter Products by Category
GET /products?category={categoryName}
Description: Retrieves products filtered by category (case-insensitive).
Query Parameters:

category (string, optional) - Category name to filter by

Available Categories:

Apparel
Electronics
Books
Home & Garden
Sports & Outdoors

Example Request:
GET /products?category=Apparel
Response Example:
json{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Classic T-Shirt",
      "category": "Apparel",
      "price": 29.99,
      "description": "Comfortable cotton t-shirt available in multiple colors",
      "stock": 150,
      "image": "https://example.com/tshirt.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 3,
  "message": "Products in category: Apparel"
}
Status Codes:

200 - Success (even if no products found)
400 - Empty category parameter
500 - Internal Server Error


4. Create New Product (Bonus Feature)
POST /products
Description: Creates a new product with validation.
Headers:
Content-Type: application/json
Request Body:
json{
  "name": "Product Name",
  "category": "Electronics",
  "price": 99.99,
  "description": "Product description",
  "stock": 50,
  "image": "https://example.com/image.jpg"
}
Required Fields:

name (string) - Product name (cannot be empty)
category (string) - Must be one of the available categories
price (number) - Must be positive
description (string) - Product description (cannot be empty)
stock (number) - Must be non-negative integer

Optional Fields:

image (string) - Product image URL

Response Example (201 Created):
json{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Product Name",
    "category": "Electronics",
    "price": 99.99,
    "description": "Product description",
    "stock": 50,
    "image": "https://example.com/image.jpg",
    "createdAt": "2024-07-15T10:30:00.000Z"
  },
  "message": "Product created successfully"
}
Status Codes:

201 - Created successfully
400 - Validation errors
500 - Internal Server Error

Validation Error Response (400):
json{
  "success": false,
  "message": "Validation errors",
  "errors": [
    "Product name is required",
    "Product price must be a positive number",
    "Category must be one of: Apparel, Electronics, Books, Home & Garden, Sports & Outdoors"
  ]
}

🧪 Testing Examples
cURL Commands
bash# Get all products
curl -X GET http://localhost:3000/products

# Get product by ID
curl -X GET http://localhost:3000/products/1

# Filter by category
curl -X GET "http://localhost:3000/products?category=Apparel"

# Create new product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "category": "Electronics",
    "price": 149.99,
    "description": "Test product description",
    "stock": 100
  }'
Sample Data
The API includes 10 pre-loaded products across 5 categories for testing purposes.

🚀 Setup Instructions

Install Dependencies:
bashnpm install

Start Server:
bashnpm start

Access API:

Base URL: http://localhost:3000
Products: http://localhost:3000/products




📊 Response Format
All API responses follow this consistent structure:
Success Response:
json{
  "success": true,
  "data": {}, // or []
  "message": "Descriptive message",
  "count": 10 // for arrays only
}
Error Response:
json{
  "success": false,
  "message": "Error description",
  "errors": [] // for validation errors
}

🔧 Error Handling
The API implements comprehensive error handling:

400 Bad Request - Invalid input or validation errors
404 Not Found - Resource not found
500 Internal Server Error - Server-side errors

All errors return descriptive messages to help with debugging.

📈 Future Enhancements

Database integration (MongoDB/PostgreSQL)
Authentication and authorization
Pagination support
Product search functionality
Image upload capabilities
Product reviews and ratings


📝 Implementation Notes
Project Structure
ecommerce-api/
├── package.json          # Dependencies and scripts
├── server.js             # Main server file
├── data/
│   └── products.js       # Sample product data
├── routes/
│   └── products.js       # Product route handlers
├── middleware/
│   └── validation.js     # Input validation middleware
└── README.md            # Setup instructions
Key Features Implemented

RESTful API design principles
Comprehensive input validation
Consistent error handling
Structured JSON responses
Modular code architecture
Sample data for testing

Development Time
Completed within 1 hour as per requirements, including:

Core API implementation
Validation middleware
Error handling
Documentation
Testing setup


Developed by: Nadjib Kamel