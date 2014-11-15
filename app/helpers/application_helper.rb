module ApplicationHelper
  def list_class_name(list)
    list_class = list.name.sub(/ Oxalate Foods\z/, '').downcase.gsub(/\W+/, '-').sub(/\A-/, '').sub(/-\z/, '')
    "list--#{list_class}"
  end
end
