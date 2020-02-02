class AllFoodsList
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON
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

  def attributes
    {
      "id" => id,
      "name" => name,
      "bottom_threshold" => bottom_threshold,
      "top_threshold" => top_threshold,
    }
  end

  def self.model_name
    List.model_name
  end
end
