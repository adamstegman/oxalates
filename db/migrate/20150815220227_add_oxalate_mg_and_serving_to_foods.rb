class AddOxalateMgAndServingToFoods < ActiveRecord::Migration[7.0]
  def change
    add_column :foods, :oxalate_mg, :float, null: false, default: 0.0
    add_column :foods, :serving, :string
  end
end
