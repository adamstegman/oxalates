class RemoveAppNameFromListNames < ActiveRecord::Migration
  def up
    List.find_each do |list|
      list.update_attribute(:name, list.name.gsub(/ oxalate foods\z/i, ''))
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
