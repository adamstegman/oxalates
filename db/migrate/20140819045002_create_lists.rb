class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name
      t.text :foods

      t.timestamps
    end
  end
end
