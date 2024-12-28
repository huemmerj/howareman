const Typesense = require('typesense');

// Initialize the Typesense client
const client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost',  // Replace with your Typesense server host
      port: 8108,       // Replace with your Typesense server port
      protocol: 'http',   // Use 'https' if your Typesense server uses https
    }
  ],
  apiKey: 'xyz',           // Replace with your actual Typesense API key
  connectionTimeoutSeconds: 2  // Optional: Timeout for connection
});

// Function to get 5 articles from Typesense
async function getFiveArticles() {
  try {
    // Perform the search query to get 5 documents
    const searchResults = await client.collections('articles').documents().search({
      q: '110 polokal Bogen 87,5',           // Query to search
      query_by: 'name,description,category', // Fields to search
      per_page: 5                            // Limit to 5 documents
    });

    // Iterate over the results and print the name and description
    searchResults.hits.forEach((hit) => {
      const name = hit.document.name;
      const description = hit.document.description;
      console.log(`name: ${name}, description: ${description}`);
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

// Call the function to fetch and display the articles
getFiveArticles();
