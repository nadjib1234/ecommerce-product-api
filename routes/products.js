const express = require('express');
const { v4: uuidv4 } = require('uuid');
const products = require('../data/products');
const { validateProduct, validateProductId, validateCategoryQuery } = require('../middleware/validation');

const router = express.Router();

// GET /products - Get all products or filter by category
router.get('/', validateCategoryQuery, (req, res) => {
  try {
    const { category } = req.query;
    
    let filteredProducts = products;
    
    // Filter by category if provided
    if (category) {
      filteredProducts = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    res.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
      message: category ? `Products in category: ${category}` : 'All products retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error: error.message
    });
  }
});

// GET /products/:id - Get single product by ID
router.get('/:id', validateProductId, (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`
      });
    }
    
    res.json({
      success: true,
      data: product,
      message: 'Product retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving product',
      error: error.message
    });
  }
});

// POST /products - Create new product (Bonus feature)
router.post('/', validateProduct, (req, res) => {
  try {
    const { name, category, price, description, stock, image } = req.body;
    
    // Create new product with generated ID
    const newProduct = {
      id: uuidv4(),
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price),
      description: description.trim(),
      stock: parseInt(stock),
      image: image || `https://example.com/${name.toLowerCase().replace(/\s+/g, '')}.jpg`,
      createdAt: new Date().toISOString()
    };
    
    // Add to products array (in real app, this would be saved to database)
    products.push(newProduct);
    
    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// PUT /products/:id - Update existing product (Additional bonus feature)
router.put('/:id', validateProductId, validateProduct, (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, stock, image } = req.body;
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`
      });
    }
    
    // Update product
    products[productIndex] = {
      ...products[productIndex],
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price),
      description: description.trim(),
      stock: parseInt(stock),
      image: image || products[productIndex].image,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: products[productIndex],
      message: 'Product updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// DELETE /products/:id - Delete product (Additional bonus feature)
router.delete('/:id', validateProductId, (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`
      });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    res.json({
      success: true,
      data: deletedProduct,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

module.exports = router;