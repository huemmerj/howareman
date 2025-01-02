import typesense

# Initialize a Typesense client
client = typesense.Client({
    "nodes": [{
        "host": "localhost",  # Replace with your Typesense server host
        "port": "8108",       # Default Typesense port
        "protocol": "http"    # Use https if your server is secure
    }],
    "api_key": "YOUR_API_KEY",  # Replace with your Typesense API key
    "connection_timeout_seconds": 2
})

# Define the schema
schema = {
    "name": "articles",
    "fields": [
        {"name": "articleNumber", "type": "string", "facet": False},
        {"name": "description", "type": "string", "facet": False},
        {"name": "ean", "type": "string", "facet": False},
        {"name": "name", "type": "string", "facet": False},
        {"name": "uuid", "type": "string", "facet": False},
        {"name": "warehouse", "type": "string", "facet": True},
        {"name": "category", "type": "string", "facet": True}
    ],
    "default_sorting_field": "articleNumber"
}

# Create the collection
try:
    client.collections.create(schema)
    print("Collection created successfully.")
except Exception as e:
    print(f"Error creating collection: {e}")

