class RemoveFoodsFromLists < ActiveRecord::Migration
  def change
    remove_column :lists, :foods, :text
  end
end
