const {server} = require('../src/app');
const supergoose = require('./supergoose');
const mockRequest = supergoose(server);

describe('Products/Categories API', () => {
  let newProduct = {name: 'Product1', price: 10, quantity: 0, inStock: false};

  it('responds wiht 404 if not found', () => {
    return mockRequest
      .get('/404')
      .expect(404);
  });

  describe('Products API', () => {
    it('can get all products', () => {
      return mockRequest
        .get('/api/v1/products')
        .expect(200)
        .expect({'results':{'count':0,'results':[]}});
    });

    //Ask question - how best to return status 404 if id not found
    it('returns 404 if id not found', () => {
      return mockRequest
        .get('/api/v1/products/5d8bdfa1f7e6135238aa3412')
        .expect(404);
    });

    it('cannot post new product if not logged in', () => {
      return mockRequest
        .post('/api/v1/products')
        .send(newProduct)
        .expect(401);
    });

    it('cannot update existing product if not logged in', () => {
      return mockRequest
        .put('/api/v1/products/5d98f3c364b26454ccc885cb')
        .send(newProduct)
        .expect(401);
    });  
    
    it('cannot delete existing product if not logged in', () => {
      return mockRequest
        .delete('/api/v1/products/5d98f3c364b26454ccc885cb')
        .expect(401);
    });
  });

  let newCategory = {name: 'Category1'};

  describe('Categories API', () => {
    it('can get all categories', () => {
      return mockRequest
        .get('/api/v1/categories')
        .expect(200)
        .expect({'results':{'count':0,'results':[]}});
    });

    //Ask question - how best to return status 404 if id not found
    it('returns 404 if id not found', () => {
      return mockRequest
        .get('/api/v1/categories/5d8bdfa1f7e6135238aa3412')
        .expect(404);
    });

    it('cannot post new category if not logged in', () => {
      return mockRequest
        .post('/api/v1/categories')
        .send(newCategory)
        .expect(401);
    });

    it('cannot update existing category if not logged in', () => {
      return mockRequest
        .put('/api/v1/categories/5d98f3c364b26454ccc885cb')
        .send(newCategory)
        .expect(401);
    });  
    
    it('can delete existing category', () => {
      return mockRequest
        .delete('/api/v1/categories/5d98f3c364b26454ccc885cb')
        .expect(401);
    });
  });
});