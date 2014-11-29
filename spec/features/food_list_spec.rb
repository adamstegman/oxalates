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
      navigate_to "Very High"

      expect(page).to have_content("Very High Oxalate Foods")
      expect(page).to have_content(/spinach/i)
    end
  end

  describe "The high oxalate food list" do
    it "lists high oxalate foods" do
      navigate_to "High"

      expect(page).to have_content("High Oxalate Foods")
      expect(page).to have_content(/chocolate/i)
    end
  end

  describe "The moderate oxalate food list" do
    it "lists moderate oxalate foods" do
      navigate_to "Moderate"

      expect(page).to have_content("Moderate Oxalate Foods")
      expect(page).to have_content(/hot chocolate/i)
    end
  end

  describe "The low oxalate food list" do
    it "lists low oxalate foods" do
      navigate_to "Low"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content(/poultry/i)
    end
  end

  it "displays foods alphabetically case-insensitively" do
    log_in

    add_food name: "ZZZ", list: "Low"
    add_food name: "aaa", list: "Low"

    expect(page).to have_content(/aaa.*ZZZ/)
  end

  context "when signed in" do
    before do
      log_in
    end

    it "Adds a food" do
      navigate_to "Low"
      action "Add"
      expect(page).to have_select("List", selected: "Low")

      fill_in "Name", with: "Dog"
      within '.content' do
        click_on "Add"
      end
      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content("Dog")
    end

    it "edits a food" do
      navigate_to "Low"
      expect(page).to have_content(/poultry/i)

      action "Edit"
      # FIXME
      fill_in "Name", with: "Cat"
      click_on "Save"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content("Cat")
    end

    it "deletes a food" do
      navigate_to "Low"
      expect(page).to have_content(/poultry/i)

      # FIXME
      click_on "Delete"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).not_to have_content(/poultry/i)
    end
  end

  context "when not signed in" do
    it "does not add a food" do
      navigate_to "Low"
      expect(page).not_to have_link("Add")
    end

    it "does not edit a food" do
      navigate_to "Low"
      expect(page).not_to have_link("Edit")
    end

    it "does not delete a food" do
      navigate_to "Low"
      expect(page).not_to have_link("Delete")
    end
  end
end

def add_food(name: name, list: list)
  action "Add"
  select list, from: "List"
  fill_in "Name", with: name
  within '.content' do
    click_on "Add"
  end
end

def log_in
  action "Log in"
  fill_in "Password", with: "password"
  within '.content' do
    click_on "Log in"
  end
end

def action(name)
  within '.actions' do
    click_on name
  end
end

def navigate_to(name)
  within '.list-menu' do
    click_on name
  end
end
