# Product API System Cost Analysis Estimate Report

## Service Overview

Product API System is a fully managed, serverless service that allows you to This project uses multiple AWS services.. This service follows a pay-as-you-go pricing model, making it cost-effective for various workloads.

## Pricing Model

This cost analysis estimate is based on the following pricing model:
- **ON DEMAND** pricing (pay-as-you-go) unless otherwise specified
- Standard service configurations without reserved capacity or savings plans
- No caching or optimization techniques applied

## Assumptions

- All services deployed in US East (N. Virginia) region
- Standard ON DEMAND pricing model
- Lambda functions configured with 512MB memory, 500ms average execution time
- DynamoDB on-demand billing mode with 80% reads, 20% writes
- API Gateway REST API with 5-minute caching enabled
- No cross-region data transfer costs included

## Limitations and Exclusions

- Data transfer costs between regions
- CloudWatch Logs storage and analysis costs
- X-Ray tracing costs
- Development and maintenance costs
- Third-party monitoring tools
- SSL certificate costs
- Route 53 DNS costs
- Support plan costs

## Cost Breakdown

### Unit Pricing Details

| Service | Resource Type | Unit | Price | Free Tier |
|---------|--------------|------|-------|------------|
| Amazon API Gateway | Tier 1 | million requests (first 333M) | $3.50 | First 1M API calls per month free for 12 months |
| Amazon API Gateway | Tier 2 | million requests (next 667M) | $2.80 | First 1M API calls per month free for 12 months |
| Amazon API Gateway | Tier 3 | million requests (next 19B) | $2.38 | First 1M API calls per month free for 12 months |
| Amazon API Gateway | Tier 4 | million requests (over 20B) | $1.51 | First 1M API calls per month free for 12 months |
| AWS Lambda | Requests | 1,000,000 requests | $0.20 | First 1M requests and 400,000 GB-seconds per month free for 12 months |
| AWS Lambda | Compute Tier 1 | GB-second (0-6B GB-seconds) | $0.0000166667 | First 1M requests and 400,000 GB-seconds per month free for 12 months |
| AWS Lambda | Compute Tier 2 | GB-second (6B-15B GB-seconds) | $0.0000150000 | First 1M requests and 400,000 GB-seconds per month free for 12 months |
| AWS Lambda | Compute Tier 3 | GB-second (15B+ GB-seconds) | $0.0000133334 | First 1M requests and 400,000 GB-seconds per month free for 12 months |
| Amazon DynamoDB | Read Requests | million RRUs | $0.125 | 25 GB storage always free, 2.5M read requests and 1M write requests per month free for 12 months |
| Amazon DynamoDB | Write Requests | million WRUs | $0.625 | 25 GB storage always free, 2.5M read requests and 1M write requests per month free for 12 months |
| Amazon DynamoDB | Storage | GB-month (after first 25 GB free) | $0.25 | 25 GB storage always free, 2.5M read requests and 1M write requests per month free for 12 months |

### Cost Calculation

| Service | Usage | Calculation | Monthly Cost |
|---------|-------|-------------|-------------|
| Amazon API Gateway | REST API endpoints for product data access with tiered pricing (Medium Usage: 2,000,000 requests per month, High Usage: 10,000,000 requests per month, Enterprise Usage: 50,000,000 requests per month) | Medium: 2M × $0.0000035 = $7.00, High: 10M × $0.0000035 = $35.00, Enterprise: 50M × $0.0000035 = $175.00 | $7.00 - $175.00 per month |
| AWS Lambda | Serverless compute for product API business logic (Node.js 18.x) (Medium Usage: 2M requests × 0.5GB × 0.5s = 500K GB-seconds, High Usage: 10M requests × 0.5GB × 0.5s = 2.5M GB-seconds, Enterprise Usage: 50M requests × 0.5GB × 0.5s = 12.5M GB-seconds) | Medium: $0.40 (requests) + $8.33 (compute) = $8.73, High: $2.00 + $41.67 = $43.67, Enterprise: $10.00 + $208.33 = $218.33 | $8.73 - $218.33 per month |
| Amazon DynamoDB | NoSQL database with on-demand billing and Global Secondary Indexes (Medium Usage: 1.6M reads, 400K writes, 50 GB storage, High Usage: 8M reads, 2M writes, 200 GB storage, Enterprise Usage: 40M reads, 10M writes, 1000 GB storage) | Medium: $0.20 (reads) + $0.25 (writes) + $6.25 (storage) = $6.70, High: $1.00 + $1.25 + $43.75 = $46.00, Enterprise: $5.00 + $6.25 + $243.75 = $255.00 | $6.70 - $255.00 per month |
| **Total** | **All services** | **Sum of all calculations** | **$22.43/month** |

### Free Tier

Free tier information by service:
- **Amazon API Gateway**: First 1M API calls per month free for 12 months
- **AWS Lambda**: First 1M requests and 400,000 GB-seconds per month free for 12 months
- **Amazon DynamoDB**: 25 GB storage always free, 2.5M read requests and 1M write requests per month free for 12 months

## Cost Scaling with Usage

The following table illustrates how cost estimates scale with different usage levels:

| Service | Low Usage | Medium Usage | High Usage |
|---------|-----------|--------------|------------|
| Amazon API Gateway | $3/month | $7/month | $14/month |
| AWS Lambda | $4/month | $8/month | $17/month |
| Amazon DynamoDB | $3/month | $6/month | $13/month |

### Key Cost Factors

- **Amazon API Gateway**: REST API endpoints for product data access with tiered pricing
- **AWS Lambda**: Serverless compute for product API business logic (Node.js 18.x)
- **Amazon DynamoDB**: NoSQL database with on-demand billing and Global Secondary Indexes

## Projected Costs Over Time

The following projections show estimated monthly costs over a 12-month period based on different growth patterns:

Base monthly cost calculation:

| Service | Monthly Cost |
|---------|-------------|
| Amazon API Gateway | $7.00 |
| AWS Lambda | $8.73 |
| Amazon DynamoDB | $6.70 |
| **Total Monthly Cost** | **$22** |

| Growth Pattern | Month 1 | Month 3 | Month 6 | Month 12 |
|---------------|---------|---------|---------|----------|
| Steady | $22/mo | $22/mo | $22/mo | $22/mo |
| Moderate | $22/mo | $24/mo | $28/mo | $38/mo |
| Rapid | $22/mo | $27/mo | $36/mo | $63/mo |

* Steady: No monthly growth (1.0x)
* Moderate: 5% monthly growth (1.05x)
* Rapid: 10% monthly growth (1.1x)

## Detailed Cost Analysis

### Pricing Model

ON DEMAND


### Exclusions

- Data transfer costs between regions
- CloudWatch Logs storage and analysis costs
- X-Ray tracing costs
- Development and maintenance costs
- Third-party monitoring tools
- SSL certificate costs
- Route 53 DNS costs
- Support plan costs

### Recommendations

#### Immediate Actions

- Optimize Lambda memory configuration (test 256MB vs 512MB vs 1024MB) for best price/performance ratio
- Enable API Gateway caching with 5-minute TTL to reduce Lambda invocations by up to 80%
- Implement efficient DynamoDB query patterns using GSIs to minimize RRU/WRU consumption
- Use batch operations for DynamoDB reads/writes to reduce request unit costs
#### Best Practices

- Set up CloudWatch billing alarms at $25, $100, and $500 monthly spend thresholds
- Monitor API Gateway throttling metrics and Lambda duration for performance optimization
- Consider DynamoDB reserved capacity for predictable workloads (up to 53% savings)
- Implement data lifecycle policies for archiving old product data using DynamoDB IA storage class
- Enable AWS Cost Anomaly Detection for unexpected spend pattern alerts



## Cost Optimization Recommendations

### Immediate Actions

- Optimize Lambda memory configuration (test 256MB vs 512MB vs 1024MB) for best price/performance ratio
- Enable API Gateway caching with 5-minute TTL to reduce Lambda invocations by up to 80%
- Implement efficient DynamoDB query patterns using GSIs to minimize RRU/WRU consumption

### Best Practices

- Set up CloudWatch billing alarms at $25, $100, and $500 monthly spend thresholds
- Monitor API Gateway throttling metrics and Lambda duration for performance optimization
- Consider DynamoDB reserved capacity for predictable workloads (up to 53% savings)

## Conclusion

By following the recommendations in this report, you can optimize your Product API System costs while maintaining performance and reliability. Regular monitoring and adjustment of your usage patterns will help ensure cost efficiency as your workload evolves.
