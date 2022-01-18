class RemoveListIdFromFoods < ActiveRecord::Migration[7.0]
  def change
    remove_reference :foods, :list, index: true
  end
end
