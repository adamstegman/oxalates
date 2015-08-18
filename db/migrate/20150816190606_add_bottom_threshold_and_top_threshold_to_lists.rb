class AddBottomThresholdAndTopThresholdToLists < ActiveRecord::Migration
  def change
    add_column :lists, :bottom_threshold, :float
    add_column :lists, :top_threshold, :float
  end
end
