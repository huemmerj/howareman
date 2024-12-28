const { MongoClient } = require('mongodb');
const Typesense = require('typesense');

// MongoDB configuration
const mongodbUri = 'mongodb://admin:adminpassword@localhost:27017/'; // Your MongoDB URI
const dbName = 'howareman';  // Replace with your MongoDB database name
const collectionName = 'Article';  // Replace with your MongoDB collection name

// Typesense configuration
const typesenseClient = new Typesense.Client({
  nodes: [{
    host: 'localhost',  // Your Typesense host
    port: '8108',       // Your Typesense port
    protocol: 'http'    // Use https if your Typesense server is secure
  }],
  apiKey: 'xyz',  // Your Typesense API key
  connectionTimeoutSeconds: 2
});

// MongoDB to Typesense sync function
async function syncMongoToTypesense() {
  // Connect to MongoDB
  const client = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Fetch data from MongoDB
    const documents = await collection.find({}).toArray();
    console.log(`Fetched ${documents.length} documents from MongoDB`);

    // Create the Typesense collection (if not exists)
    try {
      await typesenseClient.collections.create({
        name: 'articles',
        fields: [
          { name: 'articleNumber', type: 'string', facet: false },
          { name: 'description', type: 'string', facet: false },
          { name: 'ean', type: 'string', facet: false },
          { name: 'name', type: 'string', facet: false },
          { name: 'uuid', type: 'string', facet: false },
          { name: 'warehouse', type: 'string', facet: true },
          { name: 'category', type: 'string', facet: true }
        ],
        default_sorting_field: 'articleNumber'
      });
      console.log('Typesense collection created');
    } catch (err) {
      console.log('Collection might already exist or error occurred', err);
    }

    // Add documents to Typesense
    const documentPromises = documents.map(async doc => {
      try {
        // Correct way to add the document
        await typesenseClient.collections('Article').documents.create({
          document: doc
        });
        console.log('Document added:', doc.articleNumber);
      } catch (err) {
        console.log('Error adding document to Typesense', err);
      }
    });
    
    await Promise.all(documentPromises);
    console.log('All documents added to Typesense');
  } catch (err) {
    console.error('Error syncing MongoDB to Typesense', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

syncMongoToTypesense();

