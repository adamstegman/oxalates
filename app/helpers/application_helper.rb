module ApplicationHelper
  def all_foods_list
    @all_foods_list ||= AllFoodsList.new
  end

  def list_as_json_for_state(list)
    list.as_json(only: [:id, :name]).merge(
      bottomThreshold: list.bottom_threshold,
      topThreshold: list.top_threshold,
    ).to_json
  end
end
