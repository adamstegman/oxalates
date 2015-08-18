class Food < ActiveRecord::Base
  scope :for_list, ->(list) {
    if list.top_threshold && list.bottom_threshold
      where(
        "oxalate_mg >= :bottom_threshold AND oxalate_mg < :top_threshold",
        bottom_threshold: list.bottom_threshold,
        top_threshold: list.top_threshold,
      )
    elsif list.top_threshold
      where("oxalate_mg < :top_threshold", top_threshold: list.top_threshold)
    elsif list.bottom_threshold
      where("oxalate_mg >= :bottom_threshold", bottom_threshold: list.bottom_threshold)
    end
  }
end
