require 'rails_helper'

describe "searching for food" do
    before(:all) do
        List.find_or_create_by(name: "High Oxalate Foods") do |list|
            list.foods << Food.new(name: "chocolate")
		end
		List.find_or_create_by(name: "Moderate Oxalate Foods") do |list|
  			list.foods << Food.new(name: "hot chocolate")
    	end
    end
    after(:all) do
        List.destroy_all
    end

	it "displays matching foods' lists" do
		visit "/"
		fill_in "Search", with: "chocolate"
		click_on "Search"
		expect(page).to have_content("chocolate")
		expect(page).to have_content("hot chocolate")
		expect(page).to have_content("High Oxalate")
		expect(page).to have_content("Moderate Oxalate")
	end
end