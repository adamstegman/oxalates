class List < ActiveRecord::Base
  scope :food_between_thresholds, ->(food) {
    where(
      arel_table[:bottom_threshold].lteq(food.oxalate_mg).and(arel_table[:top_threshold].gteq(food.oxalate_mg)).
      or(arel_table[:bottom_threshold].eq(nil).and(arel_table[:top_threshold].gteq(food.oxalate_mg))).
      or(arel_table[:top_threshold].eq(nil).and(arel_table[:bottom_threshold].lteq(food.oxalate_mg)))
    )
  }

  class NoList
    def name
      ""
    end
  end
end
