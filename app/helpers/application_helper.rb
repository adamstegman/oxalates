module ApplicationHelper
  def all_foods_list
    @all_foods_list ||= AllFoodsList.new
  end

  def list_as_json_for_state(list)
    list.as_json(only: [:id, :name]).merge(bottomThreshold: list.bottom_threshold, topThreshold: list.top_threshold).to_json
  end

  def current_path
    request.fullpath
  end

  def active_class_name(list)
    if @list && list.id == @list.id
      'active'
    else
      ''
    end
  end

  def food_list_item(food)
    "#{food.name} - #{sprintf("%g", food.oxalate_mg.round(2))}mg - #{food.serving}"
  end

  def foods_for_list(list)
    Food.for_list(list).sort { |a, b| a.name.downcase <=> b.name.downcase }
  end

  def list_class_name(food)
    cssify(List.for_food(food).name)
  end

  def list_header(list)
    if list.name != "All"
      "#{list.name} Oxalates"
    else
      "#{list.name} Foods"
    end
  end

  def list_menu_item_icon_line_colors(list)
    case list.name
    when 'Very High'
      %w(black) * 4
    when 'High'
      %w(#e00) * 4
    when 'Moderate'
      %w(#fa0) * 4
    when 'Low'
      %w(green) * 4
    else
      %w(black #e00 #fa0 green)
    end
  end

  def cssify(string)
    string.downcase.gsub(/\W+/, '-').sub(/\A-/, '').sub(/-\z/, '')
  end
end
