require 'rails_helper'

describe "searching for food" do
  before(:all) do
    @list = List.find_or_create_by(name: "High Oxalate Foods") do |list|
      list.foods << Food.new(name: "chocolate")
      list.foods << Food.new(name: "something else")
      list.foods << Food.new(name: "hot chocolate")
    end
  end
  after(:all) do
    List.destroy_all
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
    @list.foods << Food.new(name: "Cold Chocolate")
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
