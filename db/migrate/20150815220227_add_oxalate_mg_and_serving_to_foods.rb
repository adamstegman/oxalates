class AddOxalateMgAndServingToFoods < ActiveRecord::Migration
  def change
    add_column :foods, :oxalate_mg, :integer, null: false, default: 0
    add_column :foods, :serving, :string
  end
end
