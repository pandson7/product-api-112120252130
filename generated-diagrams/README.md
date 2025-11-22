# Product API System - AWS Architecture Diagrams

This directory contains AWS architecture diagrams generated for the Product API system based on the technical design specifications.

## Generated Diagrams

### 1. System Architecture Overview
**File:** `product-api-architecture.png`
**Description:** High-level system architecture showing the main components and their relationships:
- Client interaction through API Gateway
- Lambda functions for business logic (getProducts, getProductById, createSampleData)
- DynamoDB table with Global Secondary Indexes for category and brand filtering
- Monitoring and logging with CloudWatch and X-Ray
- IAM roles for security

### 2. Data Flow Diagram
**File:** `product-api-data-flow.png`
**Description:** Detailed data flow showing API endpoints and request processing:
- API Gateway endpoints (GET /products, GET /products/{id}, query parameters)
- Lambda handlers for different request types
- DynamoDB operations (table scan, get item, GSI queries)
- Response formatting and client interaction

### 3. Deployment Architecture
**File:** `product-api-deployment.png`
**Description:** CDK-based deployment architecture showing:
- Infrastructure as Code components
- CDK stack deployment process
- Runtime environment configuration
- Environment variables and configuration management
- Monitoring and logging setup

## Technical Specifications

### API Endpoints
- `GET /products` - List all products with pagination
- `GET /products/{id}` - Get specific product by ID
- `GET /products?category={category}` - Filter by category
- `GET /products?brand={brand}` - Filter by brand

### AWS Services Used
- **API Gateway**: REST API with CORS enabled
- **Lambda**: Node.js 18.x runtime for serverless functions
- **DynamoDB**: NoSQL database with GSIs for efficient querying
- **CloudWatch**: Logging and metrics
- **X-Ray**: Distributed tracing
- **IAM**: Security roles and policies

### Database Schema
- **Primary Key**: product_id (String)
- **Attributes**: name, category, brand, attributes (JSON), created_at, updated_at
- **Global Secondary Indexes**: CategoryIndex, BrandIndex

### Performance Requirements
- API response time: < 2 seconds
- Lambda timeout: 30 seconds
- API Gateway throttling: 1000 requests/second
- DynamoDB: On-demand billing with auto-scaling

## File Locations
All diagrams are stored in: `/home/pandson/echo-architect-artifacts/product-api-112120252130/generated-diagrams/`

Generated on: Friday, 2025-11-21T21:33:25.448-05:00
