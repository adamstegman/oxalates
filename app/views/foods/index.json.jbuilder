json.foods(@foods) do |food|
  json.(food, :id, :name, :oxalate_mg, :serving)
end
