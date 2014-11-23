module ApplicationHelper
  def current_path
    request.fullpath
  end

  def active_class_name(list)
    if list.id == @list.id
      'active'
    else
      ''
    end
  end

  def list_class_name(list)
    list.name.sub(/ Oxalate Foods\z/, '').downcase.gsub(/\W+/, '-').sub(/\A-/, '').sub(/-\z/, '')
  end
end
