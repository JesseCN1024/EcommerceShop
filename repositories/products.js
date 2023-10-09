
const Repository = require('./repository');

class ProductsRepository extends Repository{
    
}

// Export an instance
module.exports = new ProductsRepository('products.json');
