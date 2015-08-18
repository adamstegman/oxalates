class AllFoodsList
  include ActiveModel::Model
  extend ActiveModel::Naming

  ID   = "all"
  NAME = "All"

  def id
    ID
  end

  def name
    NAME
  end

  def bottom_threshold
    nil
  end

  def top_threshold
    nil
  end

  def persisted?
    true
  end

  def self.model_name
    List.model_name
  end
end
