const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const sampleProducts = [
    {
        product_id: 'PROD-001',
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        brand: 'TechSound',
        attributes: {
            price: 99.99,
            color: 'Black',
            wireless: true,
            battery_life: '20 hours',
            weight: '250g',
            noise_cancelling: true
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-002',
        name: 'Gaming Laptop',
        category: 'Electronics',
        brand: 'GameTech',
        attributes: {
            price: 1299.99,
            processor: 'Intel i7',
            ram: '16GB',
            storage: '512GB SSD',
            graphics: 'RTX 3060',
            screen_size: '15.6 inches'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-003',
        name: 'Cotton T-Shirt',
        category: 'Clothing',
        brand: 'ComfortWear',
        attributes: {
            price: 24.99,
            material: '100% Cotton',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['White', 'Black', 'Blue'],
            care_instructions: 'Machine wash cold'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-004',
        name: 'Running Shoes',
        category: 'Sports',
        brand: 'RunFast',
        attributes: {
            price: 89.99,
            type: 'Running',
            sizes: [7, 8, 9, 10, 11, 12],
            color: 'Blue/White',
            weight: '280g',
            cushioning: 'High'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-005',
        name: 'JavaScript Programming Guide',
        category: 'Books',
        brand: 'TechBooks',
        attributes: {
            price: 39.99,
            pages: 450,
            author: 'John Developer',
            isbn: '978-1234567890',
            format: 'Paperback',
            publication_year: 2024
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-006',
        name: 'Smartphone',
        category: 'Electronics',
        brand: 'MobileTech',
        attributes: {
            price: 699.99,
            storage: '128GB',
            camera: '48MP',
            battery: '4000mAh',
            screen_size: '6.1 inches',
            os: 'Android 14'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-007',
        name: 'Office Chair',
        category: 'Furniture',
        brand: 'ComfortSeating',
        attributes: {
            price: 199.99,
            material: 'Mesh and Fabric',
            adjustable_height: true,
            lumbar_support: true,
            weight_capacity: '300lbs',
            warranty: '5 years'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-008',
        name: 'Yoga Mat',
        category: 'Sports',
        brand: 'FlexFit',
        attributes: {
            price: 29.99,
            thickness: '6mm',
            material: 'TPE',
            size: '72" x 24"',
            non_slip: true,
            eco_friendly: true
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-009',
        name: 'Coffee Maker',
        category: 'Home',
        brand: 'BrewMaster',
        attributes: {
            price: 79.99,
            capacity: '12 cups',
            programmable: true,
            auto_shutoff: true,
            filter_type: 'Paper',
            warranty: '2 years'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-010',
        name: 'Denim Jeans',
        category: 'Clothing',
        brand: 'DenimCo',
        attributes: {
            price: 59.99,
            material: '98% Cotton, 2% Elastane',
            fit: 'Slim',
            sizes: [28, 30, 32, 34, 36, 38],
            color: 'Dark Blue',
            wash: 'Stone Washed'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-011',
        name: 'Cooking Cookbook',
        category: 'Books',
        brand: 'CulinaryPress',
        attributes: {
            price: 29.99,
            pages: 320,
            author: 'Chef Maria',
            recipes: 150,
            difficulty: 'Beginner to Intermediate',
            cuisine_type: 'International'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        product_id: 'PROD-012',
        name: 'Wireless Mouse',
        category: 'Electronics',
        brand: 'TechPeripherals',
        attributes: {
            price: 24.99,
            connectivity: 'Wireless 2.4GHz',
            battery_life: '12 months',
            dpi: '1600',
            buttons: 3,
            ergonomic: true
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

exports.handler = async (event) => {
    try {
        // Split products into batches of 25 (DynamoDB limit)
        const batchSize = 25;
        const batches = [];
        
        for (let i = 0; i < sampleProducts.length; i += batchSize) {
            batches.push(sampleProducts.slice(i, i + batchSize));
        }

        let totalInserted = 0;

        for (const batch of batches) {
            const putRequests = batch.map(product => ({
                PutRequest: {
                    Item: product
                }
            }));

            const command = new BatchWriteCommand({
                RequestItems: {
                    [process.env.PRODUCTS_TABLE_NAME]: putRequests
                }
            });

            await docClient.send(command);
            totalInserted += batch.length;
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                success: true,
                message: `Successfully inserted ${totalInserted} sample products`,
                data: {
                    inserted_count: totalInserted,
                    categories: [...new Set(sampleProducts.map(p => p.category))],
                    brands: [...new Set(sampleProducts.map(p => p.brand))]
                }
            }),
        };
    } catch (error) {
        console.error('Error creating sample data:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                success: false,
                error: {
                    code: 'SAMPLE_DATA_ERROR',
                    message: 'Failed to create sample data'
                }
            }),
        };
    }
};
