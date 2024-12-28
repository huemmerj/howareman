from sentence_transformers import SentenceTransformer
from pymongo import MongoClient
import typesense
from tqdm import tqdm



# Connect to the Typesense server
client = typesense.Client({
    'nodes': [{
        'host': 'localhost',  # Replace with your server address
        'port': '8108',
        'protocol': 'http',
    }],
    'api_key': 'xyz',  # Replace with your API key
    'connection_timeout_seconds': 2
})

# Load a text embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')  # Example model

# Connect to MongoDB
mongo_client = MongoClient("mongodb://admin:adminpassword@localhost:27017/")
db = mongo_client['howareman']
collection = db['Article']

# Connect to Typesense
client = typesense.Client({
    'nodes': [{
        'host': 'localhost',  # Replace with your server's address
        'port': '8108',
        'protocol': 'http'
    }],
    'api_key': 'xyz',  # Replace with your API key
    'connection_timeout_seconds': 2
})

# Process and add articles to Typesense
batch_size = 1000
batch = []

# Get the total count of articles for progress tracking
total_articles = collection.count_documents({})

# Use tqdm for progress bar
for article in tqdm(collection.find(), total=total_articles, desc="Processing Articles"):
    # Safely get all fields using .get() with a default empty string
    name = article.get('name', '')
    description = article.get('description', '')
    article_number = article.get('articleNumber', '')
    ean = article.get('ean', '')
    uuid = article.get('uuid', '')
    warehouse = article.get('warehouse', '')
    category = article.get('category', '')
    
    # Combine name and description fields
    combined_text = f"{name} {description}"
    
    # Generate embedding
    vector = model.encode(combined_text)  # Embedding from combined text
    
    # Prepare data for Typesense, using .get() for all fields
    document = {
        "articleNumber": article_number,
        "description": description,
        "name": name,
        "ean": ean,
        "uuid": uuid,
        "warehouse": warehouse,
        "category": category,
        "vector": vector.tolist()
    }
    
    batch.append(document)
    
    # Send in batches to Typesense
    if len(batch) == batch_size:
        client.collections['articles'].documents.import_(batch)
        batch = []

# Send any remaining data
if batch:
    client.collections['articles'].documents.import_(batch)