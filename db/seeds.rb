# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

List.find_or_initialize_by(name: "Very High").update!(bottom_threshold: 50.0)
List.find_or_initialize_by(name: "High").update!(bottom_threshold: 15.0, top_threshold: 50.0)
List.find_or_initialize_by(name: "Moderate").update!(bottom_threshold: 5.0, top_threshold: 15.0)
List.find_or_initialize_by(name: "Low").update!(top_threshold: 5.0)
