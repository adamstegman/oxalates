const testFoods = require('./foods.json');

export class FoodService {
  query({ bottomThreshold, topThreshold } = {}) {
    return new Promise((resolve) => {
      let foods = testFoods;
      if (bottomThreshold) {
        foods = foods.filter(food => food.oxalate_mg >= bottomThreshold);
      }
      if (topThreshold) {
        foods = foods.filter(food => food.oxalate_mg < topThreshold);
      }
      resolve(foods);
    });
  }
}
