const lists = require('./lists.json');

export class ListService {
  listForFood(food) {
    return lists.find((list) => (
      (!list.bottomThreshold || list.bottomThreshold <= food.oxalate_mg) &&
      (!list.topThreshold || list.topThreshold >= food.oxalate_mg)
    ));
  }

  get(name) {
    const list = lists.find(list => list.name === name);
    if (!list) {
      throw new Error(`Could not find list '${name}'`);
    }
    return list;
  }
}
