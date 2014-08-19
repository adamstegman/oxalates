require 'rails_helper'

describe "Food lists" do
  describe "The very high oxalate food list" do
    it "lists very high oxalate foods" do
      list = List.create(name: "Very High Oxalate Foods", foods: ["spinach"])

      visit list_path(list)
      expect(page).to have_content("Very High Oxalate Foods")
      expect(page).to have_content(/spinach/i)
    end
  end

  describe "The high oxalate food list" do
    it "lists high oxalate foods" do
      list = List.create(name: "High Oxalate Foods", foods: ["chocolate"])

      visit list_path(list)
      expect(page).to have_content("High Oxalate Foods")
      expect(page).to have_content(/chocolate/i)
    end
  end
end