// Validation middleware for product data
const validateProduct = (req, res, next) => {
  const { name, category, price, description, stock } = req.body;
  const errors = [];

  // Required field validation
  if (!name || name.trim() === '') {
    errors.push('Product name is required');
  }

  if (!category || category.trim() === '') {
    errors.push('Product category is required');
  }

  if (!description || description.trim() === '') {
    errors.push('Product description is required');
  }

  // Price validation
  if (price === undefined || price === null) {
    errors.push('Product price is required');
  } else if (typeof price !== 'number' || price <= 0) {
    errors.push('Product price must be a positive number');
  }

  // Stock validation
  if (stock === undefined || stock === null) {
    errors.push('Product stock is required');
  } else if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
    errors.push('Product stock must be a non-negative integer');
  }

  // Category validation (optional - check against allowed categories)
  const allowedCategories = ['Apparel', 'Electronics', 'Books', 'Home & Garden', 'Sports & Outdoors'];
  if (category && !allowedCategories.includes(category)) {
    errors.push(`Category must be one of: ${allowedCategories.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors
    });
  }

  next();
};

// Validation for product ID parameter
const validateProductId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || id.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Product ID is required'
    });
  }

  next();
};

// Validation for category query parameter
const validateCategoryQuery = (req, res, next) => {
  const { category } = req.query;
  
  if (category && category.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Category parameter cannot be empty'
    });
  }

  next();
};

module.exports = {
  validateProduct,
  validateProductId,
  validateCategoryQuery
};