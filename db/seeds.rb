# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

List.find_or_create_by(name: "Very High Oxalate Foods") do |list|
  list.foods = ["spinach"]
end
List.find_or_create_by(name: "High Oxalate Foods") do |list|
  list.foods = ["chocolate"]
end
List.find_or_create_by(name: "Moderate Oxalate Foods") do |list|
  list.foods = ["hot chocolate"]
end
List.find_or_create_by(name: "Low Oxalate Foods") do |list|
  list.foods = ["poultry"]
end