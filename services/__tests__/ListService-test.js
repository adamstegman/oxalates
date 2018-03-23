import { ListService } from '../ListService';
import testLists from '../lists.json';

describe('listForFood', () => {
  it('is "High" for a high oxalate food', () => {
    const listService = new ListService();
    const food = { oxalate_mg: 40 }
    expect(listService.listForFood(food).name).toEqual("High");
  });

  it('is "Moderate" for a moderate oxalate food', () => {
    const listService = new ListService();
    const food = { oxalate_mg: 10 }
    expect(listService.listForFood(food).name).toEqual("Moderate");
  })

  it('is "Very High" for a very high oxalate food', () => {
    const listService = new ListService();
    const food = { oxalate_mg: 60 }
    expect(listService.listForFood(food).name).toEqual("Very High");
  })

  it('is "Low" for a low oxalate food', () => {
    const listService = new ListService();
    const food = { oxalate_mg: 1 }
    expect(listService.listForFood(food).name).toEqual("Low");
  })

  describe('when multiple lists match', () => {
    it('is the higher list', () => {
      const listService = new ListService();
      const food = { oxalate_mg: 50 }
      expect(listService.listForFood(food).name).toEqual("Very High");
    });
  });

  it('is "Low" for a 0-oxalate food', () => {
    const listService = new ListService();
    const food = { oxalate_mg: 0 }
    expect(listService.listForFood(food).name).toEqual("Low");
  });
});
