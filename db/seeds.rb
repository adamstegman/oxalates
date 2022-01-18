# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

List.find_or_initialize_by(name: "Very High").update!(bottom_threshold: 50.0)
List.find_or_initialize_by(name: "High").update!(bottom_threshold: 15.0, top_threshold: 50.0)
List.find_or_initialize_by(name: "Moderate").update!(bottom_threshold: 5.0, top_threshold: 15.0)
List.find_or_initialize_by(name: "Low").update!(top_threshold: 5.0)
