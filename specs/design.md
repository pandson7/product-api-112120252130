# Technical Design Document

## Architecture Overview

The Product API system follows a serverless architecture using AWS Lambda, API Gateway, and DynamoDB. The system provides RESTful endpoints for product data access with flexible JSON schema support.

## System Components

### 1. API Gateway
- **Purpose**: HTTP endpoint management and request routing
- **Configuration**: REST API with CORS enabled
- **Endpoints**:
  - GET /products - List all products with pagination
  - GET /products/{id} - Get specific product by ID
  - GET /products?category={category} - Filter by category
  - GET /products?brand={brand} - Filter by brand

### 2. AWS Lambda Functions
- **Runtime**: Node.js 18.x
- **Functions**:
  - `getProducts`: Handle product retrieval with filtering and pagination
  - `getProductById`: Handle single product retrieval
  - `createSampleData`: Populate database with sample products

### 3. DynamoDB Table
- **Table Name**: ProductsTable
- **Partition Key**: product_id (String)
- **Attributes**:
  - product_id: Unique identifier
  - name: Product name
  - category: Product category
  - brand: Product brand
  - attributes: Flexible JSON object for additional properties
  - created_at: Timestamp
  - updated_at: Timestamp

### 4. Global Secondary Indexes
- **CategoryIndex**: GSI on category attribute for filtering
- **BrandIndex**: GSI on brand attribute for filtering

## Data Schema

### Product Record Structure
```json
{
  "product_id": "PROD-001",
  "name": "Wireless Headphones",
  "category": "Electronics",
  "brand": "TechBrand",
  "attributes": {
    "price": 99.99,
    "color": "Black",
    "wireless": true,
    "battery_life": "20 hours",
    "weight": "250g"
  },
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "hasNext": true
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID PROD-001 not found"
  }
}
```

## Security Considerations

- API Gateway throttling: 1000 requests per second
- Lambda function timeout: 30 seconds
- DynamoDB read/write capacity: On-demand billing
- No authentication required (prototype system)

## Performance Requirements

- API response time: < 2 seconds
- DynamoDB read capacity: Auto-scaling enabled
- Lambda concurrent executions: 100
- API Gateway caching: 5 minutes TTL

## Deployment Architecture

### CDK Stack Components
1. **DynamoDB Table**: Products table with GSIs
2. **Lambda Functions**: Product API handlers
3. **API Gateway**: REST API with Lambda integration
4. **IAM Roles**: Lambda execution roles with DynamoDB permissions

### Environment Variables
- `PRODUCTS_TABLE_NAME`: DynamoDB table name
- `CATEGORY_INDEX_NAME`: Category GSI name
- `BRAND_INDEX_NAME`: Brand GSI name

## Sample Data Categories

The system will include sample data across these categories:
- Electronics (laptops, phones, headphones)
- Clothing (shirts, pants, shoes)
- Books (fiction, non-fiction, textbooks)
- Home & Garden (furniture, tools, decor)
- Sports (equipment, apparel, accessories)

## Error Handling

- 400 Bad Request: Invalid query parameters
- 404 Not Found: Product not found
- 500 Internal Server Error: System errors
- 429 Too Many Requests: Rate limiting exceeded

## Monitoring and Logging

- CloudWatch Logs: Lambda function logs
- CloudWatch Metrics: API Gateway and Lambda metrics
- X-Ray Tracing: Request tracing for debugging
