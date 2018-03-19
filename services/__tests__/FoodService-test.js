import { FoodService } from '../FoodService';
import testFoods from '../foods.json';

it('fetches all foods', () => {
  const foodService = new FoodService();
  return expect(foodService.query()).resolves.toEqual(testFoods);
});
