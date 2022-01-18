class RemoveAppNameFromListNames < ActiveRecord::Migration[7.0]
  def up
    List.find_each do |list|
      list.update_attribute(:name, list.name.gsub(/ oxalate foods\z/i, ''))
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
