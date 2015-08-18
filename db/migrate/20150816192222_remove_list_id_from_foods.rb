class RemoveListIdFromFoods < ActiveRecord::Migration
  def change
    remove_reference :foods, :list, index: true
  end
end
