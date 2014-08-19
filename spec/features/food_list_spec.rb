require 'rails_helper'

describe "Food lists" do
  before(:all) do
    require_relative '../../db/seeds'
  end
  after(:all) do
    List.destroy_all
  end

  before { visit '/' }

  describe "The very high oxalate food list" do
    it "lists very high oxalate foods" do
      click_on "Very High Oxalate Foods"

      expect(page).to have_content("Very High Oxalate Foods")
      expect(page).to have_content(/spinach/i)
    end
  end

  describe "The high oxalate food list" do
    it "lists high oxalate foods" do
      click_on "High Oxalate Foods"

      expect(page).to have_content("High Oxalate Foods")
      expect(page).to have_content(/chocolate/i)
    end
  end
end