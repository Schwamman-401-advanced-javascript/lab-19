/* eslint-disable no-unused-vars */
const Categories = require('../src/models/categories/categories');
let categories = new Categories();

require('./supergoose.js');

describe('Categories Model (Modular)', () => {

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new category', async () => {
    let categoryObj = {
      name: 'Test',
      description: 'Description',
    };

    let record = await categories.post(categoryObj);

    expect(record).toHaveProperty('_id');
    expect(record).toHaveProperty('name', 'Test');

    let saved = await categories.get(record._id);

    expect(saved).toHaveProperty('_id', record._id);
    expect(saved).toHaveProperty('name', 'Test');
  });

  it('can get() a category', async () => {
    let categoryObj = {
      name: 'Test',
      description: 'Description',
    };

    let record = await categories.post(categoryObj);
    let saved = await categories.get(record._id);

    expect(saved).toHaveProperty('_id');
    expect(saved).toHaveProperty('name', 'Test');
  });

  it('can get() all categories', async () => {
    await categories.post({ name: 'Test1', description: 'Description1' });
    await categories.post({ name: 'Test2', description: 'Description2' });
    await categories.post({ name: 'Test3', description: 'Description3' });
  
    let saved = await categories.get();

    expect(saved.results.length).toBeGreaterThan(1);
    expect(saved.count).toEqual(saved.results.length);
    expect(saved.results[0]).toHaveProperty('name', 'Test');
    expect(saved.results[saved.results.length - 1]).toHaveProperty('name', 'Test3');

  });

  it('can update() a category', async () => {
    let record = await categories.post({ name: 'Test4', description: 'Description4' });
    let updated = await categories.put(record._id, { name: 'Updated - Test4', description: 'Updated - Description4' });

    expect(record._id).toEqual(updated._id);
    expect(record).not.toEqual(updated);
    expect(updated).toHaveProperty('name', 'Updated - Test4');
    expect(updated).toHaveProperty('description', 'Updated - Description4');
  });

  it('can delete() a category', async () => {
    let record = await categories.post({ name: 'Test5', description: 'Description5' });
    
    await categories.delete(record._id);

    let saved = await categories.get(record._id);

    let allRecords = await categories.get();
    for(let i = 0; i < allRecords.count; i++) {
      await categories.delete(allRecords.results[i]._id);
    }
    let emptyRecords = await categories.get();
    
    expect(saved).toBeFalsy();
    expect(emptyRecords.count).toEqual(0);
  });

});
