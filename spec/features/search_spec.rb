require 'rails_helper'

describe "searching for food" do
  before(:all) do
    Food.create!(name: "chocolate")
    Food.create!(name: "something else")
    Food.create!(name: "hot chocolate")
  end
  after(:all) do
    Food.destroy_all
  end

  it "displays matching foods" do
    search_for "chocolate"
    expect(page).to have_content("chocolate")
    expect(page).to have_content("hot chocolate")
  end

  it "keeps the search query in the search box" do
    search_for "a query"
    expect(page.find("#search").value).to eq("a query")
  end

  it "searches case-insensitively" do
    Food.create!(name: "Cold Chocolate")
    search_for "CHOCOLATE"
    expect(page).to have_content("chocolate")
    expect(page).to have_content("hot chocolate")
    expect(page).to have_content("Cold Chocolate")
  end
end

def search_for(query)
  visit "/"
  fill_in "Search", with: query
  click_on "Search"
end
