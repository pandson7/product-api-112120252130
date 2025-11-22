# Product API System

A complete AWS serverless solution for managing product specifications with flexible JSON schema support.

## Architecture

- **API Gateway**: REST API endpoints for product access
- **AWS Lambda**: Serverless functions for business logic
- **DynamoDB**: NoSQL database with flexible JSON schema
- **CDK**: Infrastructure as Code for deployment

## API Endpoints

### Base URL
```
https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/
```

### Available Endpoints

#### 1. Get All Products
```bash
GET /products
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "productId": "ELEC001",
      "name": "Wireless Bluetooth Headphones",
      "category": "Electronics",
      "brand": "TechSound",
      "price": 199.99,
      "description": "High-quality wireless headphones with noise cancellation",
      "specifications": {
        "weight": "250g",
        "color": "Black",
        "dimensions": "18cm x 15cm x 8cm",
        "batteryLife": "30 hours"
      },
      "createdAt": "2025-11-22T02:37:19.370Z",
      "updatedAt": "2025-11-22T02:37:19.372Z"
    }
  ],
  "count": 5
}
```

#### 2. Get Product by ID
```bash
GET /products/{productId}
```
**Example:**
```bash
curl "https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/products/ELEC001"
```

#### 3. Filter by Category
```bash
GET /products?category={categoryName}
```
**Example:**
```bash
curl "https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/products?category=Electronics"
```

#### 4. Filter by Brand
```bash
GET /products?brand={brandName}
```
**Example:**
```bash
curl "https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/products?brand=TechSound"
```

## Sample Data

The system includes 5 sample products across different categories:

1. **Electronics**: Wireless Bluetooth Headphones, Smart Watch Pro
2. **Home & Garden**: LED Desk Lamp
3. **Sports & Outdoors**: Yoga Mat Premium
4. **Clothing**: Cotton T-Shirt

## Features

- ✅ **Flexible JSON Schema**: Products can have custom attributes in specifications
- ✅ **Category Filtering**: Filter products by category using GSI
- ✅ **Brand Filtering**: Filter products by brand using GSI
- ✅ **Error Handling**: Proper HTTP status codes and error messages
- ✅ **CORS Support**: Cross-origin requests enabled
- ✅ **Serverless**: Auto-scaling Lambda functions
- ✅ **NoSQL Database**: DynamoDB with provisioned capacity and auto-scaling

## Testing Examples

### Test All Endpoints
```bash
# Get all products
curl "https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/products"

# Get specific product
curl "https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/products/ELEC001"

# Filter by category
curl "https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/products?category=Electronics"

# Filter by brand
curl "https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/products?brand=TechSound"

# Test error handling
curl "https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/products/INVALID"
```

## AWS Resources

### DynamoDB Table
- **Name**: `Products112120252036`
- **Partition Key**: `productId` (String)
- **GSI**: `CategoryIndex112120252036` for category filtering
- **GSI**: `BrandIndex112120252036` for brand filtering
- **Billing**: Provisioned with auto-scaling (1-10 capacity units)

### Lambda Functions
- **getProducts112120252036**: Handles product listing and filtering
- **getProductById112120252036**: Handles single product retrieval
- **populateData112120252036**: Populates sample data

### API Gateway
- **Name**: `ProductApi112120252036`
- **Type**: REST API
- **CORS**: Enabled for all origins
- **Endpoints**: `/products` and `/products/{id}`

## Performance

- **Response Time**: < 2 seconds for all queries
- **Auto-scaling**: DynamoDB and Lambda auto-scale based on demand
- **Caching**: API Gateway caching available (not enabled by default)

## Security

- **IAM Roles**: Least privilege access for Lambda functions
- **API Gateway**: No authentication (prototype system)
- **CORS**: Configured for cross-origin requests

## Deployment

The system is deployed using AWS CDK with the stack name `ProductApiStack112120252036`.

### Stack Outputs
- **API URL**: `https://s0c4d4kcyf.execute-api.us-east-1.amazonaws.com/prod/`
- **Table Name**: `Products112120252036`
- **Sample Data Function**: `populateData112120252036`

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 'INVALID' not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Internal server error"
  }
}
```

## Data Schema

### Product Object
```json
{
  "productId": "string",           // Required: Unique identifier
  "name": "string",               // Required: Product name
  "category": "string",           // Required: Product category
  "brand": "string",              // Required: Product brand
  "price": "number",              // Required: Product price
  "description": "string",        // Optional: Product description
  "specifications": {             // Optional: Flexible JSON object
    "key": "value"                // Any custom attributes
  },
  "createdAt": "ISO8601",         // Auto-generated
  "updatedAt": "ISO8601"          // Auto-generated
}
```

## Monitoring

- **CloudWatch Logs**: All Lambda function logs
- **CloudWatch Metrics**: API Gateway and Lambda metrics
- **DynamoDB Metrics**: Read/write capacity and throttling

## Next Steps

1. Add authentication (API Keys, Cognito, etc.)
2. Implement pagination for large datasets
3. Add product creation/update endpoints
4. Implement search functionality
5. Add CloudWatch alarms and monitoring
6. Enable API Gateway caching
7. Add request validation
