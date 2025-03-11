const express = require('express');
const productRoutes = require('./productRoutes');
const { logRequest } = require('./middleware');
const { errorResponder } = require('./error.middleware');

const app = express();
const PORT = 3000;

// Hardcoded in-memory products array (in a real app, data would typically come from a database)
const products = [
  { id: 1, name: 'Product 1', brand: 'Brand A' },
  { id: 2, name: 'Product 2', brand: 'Brand B' },
  { id: 3, name: 'Product 3', brand: 'Brand A' }
];

// Middleware
app.use(logRequest);
app.use(express.json()); // To parse JSON request bodies

// Main route
app.get('/', (request, response) => {
  response.send('Response for GET request');
});

// Route with a parameter to get products by brand
app.get('/products/:brand', (req, res) => {
    const { brand } = req.params;
    const filteredProducts = products.filter(product => product.brand === brand);
    res.json(filteredProducts);
});

// Use external routes and error handling
app.use(productRoutes);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
