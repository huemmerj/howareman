import os
from sentence_transformers import SentenceTransformer
from pymongo import MongoClient
import typesense
from tqdm import tqdm

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

# File to track processed IDs
checkpoint_file = "processed_ids.txt"

# Load processed IDs
if os.path.exists(checkpoint_file):
    with open(checkpoint_file, "r") as f:
        processed_ids = set(line.strip() for line in f.readlines())
else:
    processed_ids = set()

# Get the total count of articles for progress tracking
total_articles = collection.count_documents({})

# Process and add articles to Typesense
batch_size = 50
batch = []

try:
    with collection.find(no_cursor_timeout=True) as cursor:
        for article in tqdm(cursor, total=total_articles, desc="Processing Articles"):
            article_id = str(article.get('_id'))  # Get the article ID as a string
            
            # Skip if already processed
            if article_id in processed_ids:
                continue
            
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
            
            # Prepare data for Typesense
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

            # Mark as processed
            processed_ids.add(article_id)
            with open(checkpoint_file, "a") as f:
                f.write(article_id + "\n")

    # Send any remaining data
    if batch:
        client.collections['articles'].documents.import_(batch)

except Exception as e:
    print(f"Error encountered: {e}. Progress saved, you can restart the script.")
