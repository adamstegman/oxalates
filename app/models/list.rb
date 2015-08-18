class List < ActiveRecord::Base
  scope :food_between_thresholds, ->(food) {
    where(
      arel_table[:bottom_threshold].lteq(food.oxalate_mg).and(arel_table[:top_threshold].gteq(food.oxalate_mg)).
      or(arel_table[:bottom_threshold].eq(nil).and(arel_table[:top_threshold].gteq(food.oxalate_mg))).
      or(arel_table[:top_threshold].eq(nil).and(arel_table[:bottom_threshold].lteq(food.oxalate_mg)))
    )
  }

  def self.for_food(food)
    # Find the "highest" (most dangerous) list
    food_between_thresholds(food).max { |a,b|
      ((a.bottom_threshold || 0) + (a.top_threshold || Float::INFINITY)) <=>
        ((b.bottom_threshold || 0) + (b.top_threshold || Float::INFINITY))
    } || NoList.new
  end

  class NoList
    def name
      ""
    end
  end
end
