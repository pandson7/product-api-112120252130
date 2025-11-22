const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    try {
        const { category, brand, limit = '20', page = '1' } = event.queryStringParameters || {};
        const pageSize = parseInt(limit);
        const pageNumber = parseInt(page);
        
        let command;
        let params = {
            TableName: process.env.PRODUCTS_TABLE_NAME,
            Limit: pageSize,
        };

        if (category) {
            params.IndexName = process.env.CATEGORY_INDEX_NAME;
            params.KeyConditionExpression = 'category = :category';
            params.ExpressionAttributeValues = { ':category': category };
            command = new QueryCommand(params);
        } else if (brand) {
            params.IndexName = process.env.BRAND_INDEX_NAME;
            params.KeyConditionExpression = 'brand = :brand';
            params.ExpressionAttributeValues = { ':brand': brand };
            command = new QueryCommand(params);
        } else {
            command = new ScanCommand(params);
        }

        const result = await docClient.send(command);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key',
            },
            body: JSON.stringify({
                success: true,
                data: {
                    products: result.Items,
                    pagination: {
                        page: pageNumber,
                        limit: pageSize,
                        total: result.Count,
                        hasNext: !!result.LastEvaluatedKey
                    }
                }
            }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Internal server error'
                }
            }),
        };
    }
};
