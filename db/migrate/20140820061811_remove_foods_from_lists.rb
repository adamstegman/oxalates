class RemoveFoodsFromLists < ActiveRecord::Migration[7.0]
  def change
    remove_column :lists, :foods, :text
  end
end
