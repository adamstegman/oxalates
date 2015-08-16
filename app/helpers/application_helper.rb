module ApplicationHelper
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

  def list_class_name(list)
    list.name.sub(/ Oxalate Foods\z/, '').downcase.gsub(/\W+/, '-').sub(/\A-/, '').sub(/-\z/, '')
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

  def lists_options(selected_list_id)
    options_from_collection_for_select(List.all, :id, :name, selected_list_id)
  end
end
