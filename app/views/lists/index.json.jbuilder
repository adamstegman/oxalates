json.lists(@lists) do |list|
  json.(list, :id, :name, :bottom_threshold, :top_threshold)
end
