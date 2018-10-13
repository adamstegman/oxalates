import React from 'react';
import PropTypes from 'prop-types';

import { foodPropType } from './foodPropType';
import { FoodListEmptyItem } from './FoodListEmptyItem';
import { FoodListError } from './FoodListError';
import { FoodListItem } from './FoodListItem';
import { FoodListLoading } from './FoodListLoading';
import { FoodListNewItem } from './FoodListNewItem';
import { listPropType } from './listPropType';

import './FoodList.scss';

export class FoodList extends React.Component {
  // Find the "highest" (most dangerous) list
  getListForFood(food, lists) {
    return lists.find(list => (
      (
        (list.bottomThreshold && list.bottomThreshold <= food.oxalateMg) &&
        (list.topThreshold && list.topThreshold >= food.oxalateMg)
      ) ||
      (list.bottomThreshold === null && (list.topThreshold && list.topThreshold >= food.oxalateMg)) ||
      ((list.bottomThreshold && list.bottomThreshold <= food.oxalateMg) && list.topThreshold === null)
    ));
  }

  sortFoodsAlphabetically(foods) {
    return foods.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortListsByThresholds(lists) {
    return lists.sort((a, b) => {
      const aBottom = a.bottomThreshold || 0;
      const aTop = a.topThreshold || Number.MAX_VALUE;
      const aTotal = aBottom + aTop;
      const bBottom = b.bottomThreshold || 0;
      const bTop = b.topThreshold || Number.MAX_VALUE;
      const bTotal = bBottom + bTop;
      if (aTotal < bTotal) {
        return 1;
      } else if (aTotal > bTotal) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  render() {
    const {
      foods,
      lists,
      requestedListId,
      newFood,
      newFoodListId,
      error,
      password,
      createFood,
      setNewFood,
    } = this.props;
    const sortedFoods = this.sortFoodsAlphabetically(foods);
    const sortedLists = this.sortListsByThresholds(lists);

    let contents = <FoodListEmptyItem />;
    if (requestedListId) {
      contents = <FoodListLoading />;
    } else if (newFood) {
      contents = <FoodListNewItem newFood={newFood}
                                  newFoodListId={newFoodListId}
                                  createFood={createFood}
                                  setNewFood={setNewFood}
                                  error={error}
                                  password={password} />;
    } else if (error) {
      contents = <FoodListError error={error} />;
    } else if (foods.length > 0) {
      contents = sortedFoods.map(food => {
        const list = this.getListForFood(food, sortedLists);
        return <FoodListItem key={food.id} food={food} list={list} />;
      });
    }

    return (
      <div className="content">
        <ul className="food-list">
          {contents}
        </ul>
      </div>
    );
  }
};

FoodList.propTypes = {
  foods: PropTypes.arrayOf(foodPropType).isRequired,
  lists: PropTypes.arrayOf(listPropType).isRequired,
  requestedListId: PropTypes.node,
  error: PropTypes.string,
  newFood: PropTypes.shape({}),
  newFoodListId: PropTypes.node,
  password: PropTypes.string,
  createFood: PropTypes.func,
  setNewFood: PropTypes.func,
};
