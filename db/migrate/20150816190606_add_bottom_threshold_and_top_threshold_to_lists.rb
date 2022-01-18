class AddBottomThresholdAndTopThresholdToLists < ActiveRecord::Migration[7.0]
  def change
    add_column :lists, :bottom_threshold, :float
    add_column :lists, :top_threshold, :float
  end
end
