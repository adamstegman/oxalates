const lists = require('./lists.json');

export class ListService {
  listForFood(food) {
    return lists.find((list) => (
      (!list.bottomThreshold || list.bottomThreshold <= food.oxalate_mg) &&
      (!list.topThreshold || list.topThreshold >= food.oxalate_mg)
    ));
  }
}
