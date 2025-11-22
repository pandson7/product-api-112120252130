import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class ProductApiStack112120252130 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const productsTable = new dynamodb.Table(this, 'ProductsTable112120252130', {
      tableName: 'ProductsTable112120252130',
      partitionKey: { name: 'product_id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Add auto scaling
    productsTable.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    });

    productsTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 10,
    });

    // GSI for category filtering
    productsTable.addGlobalSecondaryIndex({
      indexName: 'CategoryIndex112120252130',
      partitionKey: { name: 'category', type: dynamodb.AttributeType.STRING },
      readCapacity: 5,
      writeCapacity: 5,
    });

    // GSI for brand filtering
    productsTable.addGlobalSecondaryIndex({
      indexName: 'BrandIndex112120252130',
      partitionKey: { name: 'brand', type: dynamodb.AttributeType.STRING },
      readCapacity: 5,
      writeCapacity: 5,
    });

    // Lambda Functions
    const getProductsFunction = new lambda.Function(this, 'GetProductsFunction112120252130', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'getProducts.handler',
      code: lambda.Code.fromAsset('../lambda'),
      environment: {
        PRODUCTS_TABLE_NAME: productsTable.tableName,
        CATEGORY_INDEX_NAME: 'CategoryIndex112120252130',
        BRAND_INDEX_NAME: 'BrandIndex112120252130',
      },
      timeout: cdk.Duration.seconds(30),
    });

    const getProductByIdFunction = new lambda.Function(this, 'GetProductByIdFunction112120252130', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'getProductById.handler',
      code: lambda.Code.fromAsset('../lambda'),
      environment: {
        PRODUCTS_TABLE_NAME: productsTable.tableName,
      },
      timeout: cdk.Duration.seconds(30),
    });

    const createSampleDataFunction = new lambda.Function(this, 'CreateSampleDataFunction112120252130', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'createSampleData.handler',
      code: lambda.Code.fromAsset('../lambda'),
      environment: {
        PRODUCTS_TABLE_NAME: productsTable.tableName,
      },
      timeout: cdk.Duration.seconds(60),
    });

    // Grant DynamoDB permissions
    productsTable.grantReadData(getProductsFunction);
    productsTable.grantReadData(getProductByIdFunction);
    productsTable.grantWriteData(createSampleDataFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, 'ProductApi112120252130', {
      restApiName: 'Product API 112120252130',
      description: 'API for accessing product specifications',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
      },
    });

    // API Resources and Methods
    const products = api.root.addResource('products');
    
    // GET /products
    products.addMethod('GET', new apigateway.LambdaIntegration(getProductsFunction));
    
    // GET /products/{id}
    const productById = products.addResource('{id}');
    productById.addMethod('GET', new apigateway.LambdaIntegration(getProductByIdFunction));

    // Output API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'Product API URL',
    });

    new cdk.CfnOutput(this, 'CreateSampleDataFunctionName', {
      value: createSampleDataFunction.functionName,
      description: 'Sample Data Function Name',
    });
  }
}
