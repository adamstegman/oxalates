import { FoodService } from '../FoodService';
import testFoods from '../foods.json';

const veryHighFood = {
  name: "Almonds",
  serving: "22 nuts (1 oz)",
  oxalate_mg: 120,
};
const highFood = {
  name: "carrots, grated",
  oxalate_mg: 15,
  serving: "1/2 cup",
};
const moderateFood = {
  name: "tomato, raw, sliced",
  oxalate_mg: 5,
  serving: "1/2 cup",
};
const lowFood = {
  name: "cider, bottled, sweet",
  oxalate_mg: 0,
  serving: "12 oz",
};

it('fetches all foods', () => {
  const foodService = new FoodService();
  return expect(foodService.query()).resolves.toEqual(testFoods);
});

it('fetches foods between two thresholds', () => {
  const foodService = new FoodService();
  return foodService.query({ bottomThreshold: 5, topThreshold: 15 }).then((foods) => {
    expect(foods).not.toContainEqual(lowFood);
    expect(foods).not.toContainEqual(highFood);
    expect(foods).not.toContainEqual(veryHighFood);
    expect(foods).toContainEqual(moderateFood);
  });
});

it('fetches foods above one threshold', () => {
  const foodService = new FoodService();
  return foodService.query({ bottomThreshold: 15 }).then((foods) => {
    expect(foods).not.toContainEqual(lowFood);
    expect(foods).not.toContainEqual(moderateFood);
    expect(foods).toContainEqual(highFood);
    expect(foods).toContainEqual(veryHighFood);
  });
});

it('fetches foods below one threshold', () => {
  const foodService = new FoodService();
  return foodService.query({ topThreshold: 15 }).then((foods) => {
    expect(foods).not.toContainEqual(highFood);
    expect(foods).not.toContainEqual(veryHighFood);
    expect(foods).toContainEqual(lowFood);
    expect(foods).toContainEqual(moderateFood);
  });
});
