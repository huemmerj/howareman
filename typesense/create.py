import typesense

# Connect to the Typesense server
client = typesense.Client({
    'nodes': [{
        'host': 'localhost', # or your server's address
        'port': '8108',
        'protocol': 'http',
    }],
    'api_key': 'xyz', # Replace with your API key
    'connection_timeout_seconds': 2
})

# Define the schema for the Article collection
schema = {
    "name": "articles",
    "fields": [
        {"name": "articleNumber", "type": "string"},
        {"name": "description", "type": "string"},
        {"name": "ean", "type": "string"},
        {"name": "name", "type": "string"},
        {"name": "uuid", "type": "string"},
        {"name": "warehouse", "type": "string"},
        {"name": "category", "type": "string"},
        {"name": "vector", "type": "float[]", "facet": False, "optional": True}
    ],
}

# Create the collection in Typesense
try:
    client.collections.create(schema)
except typesense.exceptions.RequestMalformed as e:
    print(f"Collection creation failed: {e}")
