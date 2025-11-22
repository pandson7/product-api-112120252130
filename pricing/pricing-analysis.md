# AWS Pricing Analysis: Product API System

## Executive Summary

This document provides a comprehensive cost analysis for the Product API system, a serverless architecture built on AWS Lambda, API Gateway, and DynamoDB. The analysis includes multiple usage scenarios and detailed cost breakdowns for each service component.

## Architecture Overview

The Product API system consists of:
- **API Gateway**: REST API endpoints for product data access
- **AWS Lambda**: Serverless compute for business logic (Node.js 18.x runtime)
- **DynamoDB**: NoSQL database with on-demand billing
- **Global Secondary Indexes**: Category and Brand indexes for efficient querying

## Service Pricing Breakdown

### 1. AWS Lambda Pricing (US East 1)

**Request Pricing:**
- $0.0000002 per request (all requests)

**Compute Pricing (GB-Second):**
- Tier 1 (0-6B GB-seconds): $0.0000166667 per GB-second
- Tier 2 (6B-15B GB-seconds): $0.0000150000 per GB-second  
- Tier 3 (15B+ GB-seconds): $0.0000133334 per GB-second

**Free Tier:**
- 1M requests per month (first 12 months)
- 400,000 GB-seconds per month (first 12 months)

### 2. API Gateway Pricing (US East 1)

**REST API Request Pricing:**
- First 333M requests/month: $3.50 per million requests ($0.0000035 per request)
- Next 667M requests/month: $2.80 per million requests ($0.0000028 per request)
- Next 19B requests/month: $2.38 per million requests ($0.0000023800 per request)
- Over 20B requests/month: $1.51 per million requests ($0.0000015100 per request)

**Free Tier:**
- 1M API calls per month (first 12 months)

### 3. DynamoDB Pricing (US East 1)

**On-Demand Request Pricing:**
- Read Request Units: $0.125 per million RRUs ($0.0000001250 per RRU)
- Write Request Units: $0.625 per million WRUs ($0.0000006250 per WRU)

**Storage Pricing:**
- First 25 GB: Free
- Beyond 25 GB: $0.25 per GB-month

**Free Tier:**
- 25 GB storage per month (always free)
- 2.5M read requests per month (first 12 months)
- 1M write requests per month (first 12 months)

## Usage Scenarios & Cost Analysis

### Scenario 1: Low Usage (Development/Testing)
**Monthly Usage:**
- API Requests: 50,000
- Lambda Invocations: 50,000 (512MB, 500ms avg)
- DynamoDB: 40,000 reads, 10,000 writes
- Storage: 5 GB

**Cost Breakdown:**
- **API Gateway**: $0.00 (within free tier)
- **Lambda**: $0.00 (within free tier)
- **DynamoDB**: $0.00 (within free tier)
- **Storage**: $0.00 (within free tier)

**Total Monthly Cost: $0.00**

### Scenario 2: Medium Usage (Production - Moderate Traffic)
**Monthly Usage:**
- API Requests: 2,000,000
- Lambda Invocations: 2,000,000 (512MB, 500ms avg)
- DynamoDB: 1,600,000 reads, 400,000 writes
- Storage: 50 GB

**Cost Breakdown:**
- **API Gateway**: 
  - 2M requests × $0.0000035 = $7.00
- **Lambda**:
  - Requests: 2M × $0.0000002 = $0.40
  - Compute: 2M × 0.5GB × 0.5s = 500,000 GB-seconds × $0.0000166667 = $8.33
  - Total Lambda: $8.73
- **DynamoDB**:
  - Reads: 1.6M × $0.0000001250 = $0.20
  - Writes: 400K × $0.0000006250 = $0.25
  - Storage: (50GB - 25GB) × $0.25 = $6.25
  - Total DynamoDB: $6.70

**Total Monthly Cost: $22.43**

### Scenario 3: High Usage (Production - Heavy Traffic)
**Monthly Usage:**
- API Requests: 10,000,000
- Lambda Invocations: 10,000,000 (512MB, 500ms avg)
- DynamoDB: 8,000,000 reads, 2,000,000 writes
- Storage: 200 GB

**Cost Breakdown:**
- **API Gateway**: 
  - 10M requests × $0.0000035 = $35.00
- **Lambda**:
  - Requests: 10M × $0.0000002 = $2.00
  - Compute: 10M × 0.5GB × 0.5s = 2.5M GB-seconds × $0.0000166667 = $41.67
  - Total Lambda: $43.67
- **DynamoDB**:
  - Reads: 8M × $0.0000001250 = $1.00
  - Writes: 2M × $0.0000006250 = $1.25
  - Storage: (200GB - 25GB) × $0.25 = $43.75
  - Total DynamoDB: $46.00

**Total Monthly Cost: $124.67**

### Scenario 4: Enterprise Usage (High-Scale Production)
**Monthly Usage:**
- API Requests: 50,000,000
- Lambda Invocations: 50,000,000 (512MB, 500ms avg)
- DynamoDB: 40,000,000 reads, 10,000,000 writes
- Storage: 1,000 GB

**Cost Breakdown:**
- **API Gateway**: 
  - 50M requests × $0.0000035 = $175.00
- **Lambda**:
  - Requests: 50M × $0.0000002 = $10.00
  - Compute: 50M × 0.5GB × 0.5s = 12.5M GB-seconds × $0.0000166667 = $208.33
  - Total Lambda: $218.33
- **DynamoDB**:
  - Reads: 40M × $0.0000001250 = $5.00
  - Writes: 10M × $0.0000006250 = $6.25
  - Storage: (1000GB - 25GB) × $0.25 = $243.75
  - Total DynamoDB: $255.00

**Total Monthly Cost: $648.33**

## Cost Optimization Recommendations

### Immediate Optimizations
1. **Lambda Memory Optimization**: Test with different memory configurations (256MB, 1024MB) to find optimal price/performance ratio
2. **DynamoDB Query Optimization**: Implement efficient query patterns to minimize RRU/WRU consumption
3. **API Gateway Caching**: Enable caching (5-minute TTL as specified) to reduce Lambda invocations
4. **Batch Operations**: Implement batch read/write operations for DynamoDB to reduce request units

### Long-term Optimizations
1. **Reserved Capacity**: Consider DynamoDB reserved capacity for predictable workloads (up to 53% savings)
2. **Lambda Provisioned Concurrency**: For consistent performance requirements (additional cost but predictable)
3. **Multi-Region Strategy**: Evaluate regional pricing differences for disaster recovery setup
4. **Data Archival**: Implement lifecycle policies for old product data using DynamoDB IA storage class

### Monitoring and Alerting
1. **CloudWatch Billing Alarms**: Set up alerts at $25, $100, and $500 monthly spend
2. **Usage Metrics**: Monitor API Gateway throttling, Lambda duration, and DynamoDB consumed capacity
3. **Cost Anomaly Detection**: Enable AWS Cost Anomaly Detection for unexpected spend patterns

## Assumptions and Exclusions

### Assumptions
- All services deployed in US East (N. Virginia) region
- Standard ON DEMAND pricing model
- Lambda functions configured with 512MB memory
- Average Lambda execution time of 500ms
- DynamoDB on-demand billing mode
- No provisioned throughput or reserved instances
- Standard storage class for DynamoDB
- 80% read operations, 20% write operations for DynamoDB
- No cross-region data transfer costs

### Exclusions
- Data transfer costs between regions
- CloudWatch Logs storage and analysis costs
- X-Ray tracing costs
- Development and maintenance costs
- Third-party monitoring tools
- SSL certificate costs (using AWS Certificate Manager free certificates)
- Route 53 DNS costs
- VPC costs (not applicable for serverless architecture)
- Support plan costs

## Regional Pricing Considerations

While this analysis focuses on US East (N. Virginia), costs may vary in other regions:
- **US West (Oregon)**: Typically 5-10% higher
- **EU (Ireland)**: Typically 10-15% higher  
- **Asia Pacific (Tokyo)**: Typically 15-25% higher

## Conclusion

The Product API system offers excellent cost efficiency for serverless workloads:
- **Development/Testing**: Essentially free within AWS Free Tier
- **Production (Medium)**: ~$22/month for 2M requests
- **Production (High)**: ~$125/month for 10M requests
- **Enterprise Scale**: ~$648/month for 50M requests

The serverless architecture provides automatic scaling and pay-per-use pricing, making it cost-effective for variable workloads. Key cost drivers are API Gateway requests and DynamoDB storage, with optimization opportunities through caching and efficient data access patterns.

---

**Report Generated**: November 21, 2025  
**Pricing Data Source**: AWS Pricing API  
**Currency**: USD  
**Region**: US East (N. Virginia)
