const testFoods = require('./foods.json');

export class FoodService {
  query() {
    return new Promise((resolve) => {
      resolve(testFoods);
    });
  }
}
