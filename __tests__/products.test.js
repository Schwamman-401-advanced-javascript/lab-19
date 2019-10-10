const Products = require('../src/models/products/products');
let products = new Products();

require('./supergoose.js');

describe('Products Model (Modular)', () => {

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new product', async () => {
    let productObj = {
      name: 'Test',
      price: 10.00,
      quantity: 5,
      inStock: true,
    };

    let record = await products.post(productObj);
    expect(record).toHaveProperty('_id');
    expect(record).toHaveProperty('name', 'Test');

    let saved = await products.get(record._id);

    expect(saved).toHaveProperty('_id', record._id);
    expect(saved).toHaveProperty('name', 'Test');
  });

  it('can get() a product', async () => {
    let productObj = {
      name: 'Test',
      price: 10.00,
      quantity: 5,
      inStock: true,
    };

    let record = await products.post(productObj);
    let saved = await products.get(record._id);

    expect(saved).toHaveProperty('_id');
    expect(saved).toHaveProperty('name', 'Test');
  });

  it('can get() all products', async () => {
    await products.post({ name: 'Test1', price: 5.49, quantity: 7, inStock: true });
    await products.post({ name: 'Test2', price: 11.99, quantity: 1, inStock: true });
    await products.post({ name: 'Test3', price: 8.33, quantity: 0, inStock: false });
  
    let saved = await products.get();

    expect(saved.results.length).toBeGreaterThan(1);
    expect(saved.count).toEqual(saved.results.length);
    expect(saved.results[0]).toHaveProperty('name', 'Test');
    expect(saved.results[saved.results.length - 1]).toHaveProperty('name', 'Test3');
    expect(saved.results[saved.results.length - 1]).toHaveProperty('inStock', false);
  });

  it('can update() a product', async () => {
    let record = await products.post({ name: 'Test4', price: 5.49, quantity: 7, inStock: true });
    let updated = await products.put(record._id, { name: 'Updated - Test4', price: 5.49, quantity: 6, inStock: true });

    expect(record._id).toEqual(updated._id);
    expect(record).not.toEqual(updated);
    expect(updated).toHaveProperty('name', 'Updated - Test4');
    expect(updated).toHaveProperty('quantity', 6);
  });

  it('can delete() a product', async () => {
    let record = await products.post({ name: 'Test5', price: 5.49, quantity: 7, inStock: true });
    
    await products.delete(record._id);

    let saved = await products.get(record._id);

    let allRecords = await products.get();
    for(let i = 0; i < allRecords.count; i++) {
      await products.delete(allRecords.results[i]._id);
    }
    let emptyRecords = await products.get();
    
    expect(saved).toBeFalsy();
    expect(emptyRecords.count).toEqual(0);
  });

});