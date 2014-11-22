# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

List.find_or_create_by(name: "Very High") do |list|
  list.foods << Food.new(name: "spinach")
end
List.find_or_create_by(name: "High") do |list|
  list.foods << Food.new(name: "chocolate")
end
List.find_or_create_by(name: "Moderate") do |list|
  list.foods << Food.new(name: "hot chocolate")
end
List.find_or_create_by(name: "Low") do |list|
  list.foods << Food.new(name: "poultry")
end
