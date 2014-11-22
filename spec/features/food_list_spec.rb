require 'rails_helper'

describe "Food lists" do
  before(:all) do
    require_relative '../../db/seeds'
    ENV['OXALATES_PASSWORD'] = BCrypt::Password.create('password')
  end
  after(:all) do
    List.destroy_all
  end

  before { visit '/' }

  describe "The very high oxalate food list" do
    it "lists very high oxalate foods" do
      click_on "Very High"

      expect(page).to have_content("Very High Oxalate Foods")
      expect(page).to have_content(/spinach/i)
    end
  end

  describe "The high oxalate food list" do
    it "lists high oxalate foods" do
      click_on "High"

      expect(page).to have_content("High Oxalate Foods")
      expect(page).to have_content(/chocolate/i)
    end
  end

  describe "The moderate oxalate food list" do
    it "lists moderate oxalate foods" do
      click_on "Moderate"

      expect(page).to have_content("Moderate Oxalate Foods")
      expect(page).to have_content(/hot chocolate/i)
    end
  end

  describe "The low oxalate food list" do
    it "lists low oxalate foods" do
      click_on "Low"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content(/poultry/i)
    end
  end

  it "displays foods alphabetically case-insensitively" do
    fill_in "Password", with: "password"
    click_on "Log in"
    click_on "Add Food"
    select "Low", from: "List"
    fill_in "Name", with: "ZZZ"
    click_on "Add"
    click_on "Add Food"
    select "Low", from: "List"
    fill_in "Name", with: "aaa"
    click_on "Add"

    expect(page).to have_content(/aaa.*ZZZ/)
  end

  context "when signed in" do
    before do
      fill_in "Password", with: "password"
      click_on "Log in"
    end

    it "Adds a food" do
      click_on "Low"
      click_on "Add Food"
      expect(page).to have_select("List", selected: "Low")

      fill_in "Name", with: "Dog"
      click_on "Add"
      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content("Dog")
    end

    it "edits a food" do
      click_on "Low"
      expect(page).to have_content(/poultry/i)

      click_on "Edit"
      fill_in "Name", with: "Cat"
      click_on "Save"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content("Cat")
    end

    it "deletes a food" do
      click_on "Low"
      expect(page).to have_content(/poultry/i)

      click_on "Delete"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).not_to have_content(/poultry/i)
    end
  end

  context "when not signed in" do
    it "does not add a food" do
      click_on "Low"
      expect(page).not_to have_link("Add Food")
    end

    it "does not edit a food" do
      click_on "Low"
      expect(page).not_to have_link("Edit")
    end

    it "does not delete a food" do
      click_on "Low"
      expect(page).not_to have_link("Delete")
    end
  end
end
