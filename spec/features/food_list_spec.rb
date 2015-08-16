require 'rails_helper'

describe "Food lists", js: true do
  before(:each) do
    load File.expand_path('../../../db/seeds.rb', __FILE__)
    ENV['OXALATES_PASSWORD'] = BCrypt::Password.create('password')
  end
  after(:each) do
    List.destroy_all
  end

  before { visit '/' }

  describe "The all foods list" do
    it "lists all foods" do
      navigate_to "All"

      expect(page).to have_content("All Oxalate Foods")
      expect(page).to have_content(/spinach/i)
      expect(page).to have_content(/chocolate/i)
      expect(page).to have_content(/hot chocolate/i)
      expect(page).to have_content(/poultry/i)
    end

    it "edits a food" do
      log_in
      navigate_to "All"
      expect(page).to have_content(/poultry/i)

      action "Edit"
      click_on "poultry"
      fill_in "Name", with: "Cat"
      click_on "Done"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content("Cat")
    end
  end

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

    it "adds a food" do
      navigate_to "Low"
      action "Add"
      expect(page).to have_select("List", selected: "Low")

      fill_in "New food name", with: "Dog"
      fill_in "Oxalates per serving", with: "50"
      fill_in "Serving", with: "1 animal"
      within '.content' do
        click_on "Add"
      end
      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content("Dog")
      expect(page).to have_content(/50\s*mg/)
      expect(page).to have_content("1 animal")
    end

    it "edits a food" do
      navigate_to "Low"
      expect(page).to have_content(/poultry/i)

      action "Edit"
      click_on "poultry"
      fill_in "Name", with: "Cat"
      fill_in "Oxalates per serving", with: "100"
      fill_in "Serving", with: "2 animals"
      click_on "Done"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content("Cat")

      click_on "Done"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_content("Cat")
      expect(page).to have_content(/100\s*mg/)
      expect(page).to have_content("2 animals")
    end

    it "deletes a food" do
      navigate_to "Low"
      expect(page).to have_content(/poultry/i)

      action "Edit"
      click_on "Delete"

      expect(page).to have_content("Low Oxalate Foods")
      expect(page).to have_link("Done")
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

def add_food(name:, list:)
  action "Add"
  select list, from: "List"
  fill_in "New food name", with: name
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
