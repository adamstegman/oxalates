require 'rails_helper'

describe "Food lists", js: true do
  before(:each) do
    ENV['OXALATES_PASSWORD'] = BCrypt::Password.create('password')
  end
  before(:each) do
    load File.expand_path('../../../db/seeds.rb', __FILE__)
    Food.create!(name: "beetroot, steamed", oxalate_mg: 50.0, serving: "just under 1/2 cup")
    Food.create!(name: "carrots, grated", oxalate_mg: 15.0, serving: "1/2 cup")
    Food.create!(name: "tomato, raw, sliced", oxalate_mg: 5.0, serving: "1/2 cup")
    Food.create!(name: "asparagus, raw", oxalate_mg: 4.9, serving: "1/2 cup")
  end
  after(:each) do
    List.destroy_all
    Food.destroy_all
  end

  before { visit '/' }

  describe "The all foods list" do
    it "lists all foods" do
      navigate_to "All"

      expect(page).to have_content("All Foods")
      expect(page).to have_content(/beetroot/i)
      expect(page).to have_content(/carrot/i)
      expect(page).to have_content(/tomato/i)
      expect(page).to have_content(/asparagus/i)
    end

    it "edits a food" do
      log_in
      navigate_to "All"
      expect(page).to have_content(/asparagus/i)

      action "Edit"
      click_on "asparagus"
      fill_in "Name", with: "Cat"
      click_on "Done"

      expect(page).to have_content("Low Oxalates")
      expect(page).to have_content("Cat")
    end
  end

  describe "The very high oxalate food list" do
    it "lists very high oxalate foods" do
      navigate_to "Very High"

      expect(page).to have_content("Very High Oxalates")
      expect(page).to have_content(/beetroot/i)
    end
  end

  describe "The high oxalate food list" do
    it "lists high oxalate foods" do
      navigate_to "High"

      expect(page).to have_content("High Oxalates")
      expect(page).to have_content(/carrots/i)
    end
  end

  describe "The moderate oxalate food list" do
    it "lists moderate oxalate foods" do
      navigate_to "Moderate"

      expect(page).to have_content("Moderate Oxalates")
      expect(page).to have_content(/tomato/i)
    end
  end

  describe "The low oxalate food list" do
    it "lists low oxalate foods" do
      navigate_to "Low"

      expect(page).to have_content("Low Oxalates")
      expect(page).to have_content(/asparagus/i)
    end
  end

  it "displays foods alphabetically case-insensitively" do
    log_in

    add_food name: "ZZZ"
    add_food name: "aaa"

    expect(page).to have_content(/aaa.*ZZZ/)
  end

  context "when signed in" do
    before do
      log_in
    end

    it "adds a food" do
      navigate_to "Low"
      action "Add"

      fill_in "New food name", with: "Dog"
      fill_in "Oxalates per serving", with: "5"
      fill_in "Serving", with: "1 animal"
      within '.content' do
        click_on "Add"
      end
      expect(page).to have_content("Moderate Oxalates")
      expect(page).to have_content("Dog")
      expect(page).to have_content(/5\s*mg/)
      expect(page).to have_content("1 animal")
    end

    it "edits a food" do
      navigate_to "Very High"
      expect(page).to have_content(/beetroot/i)

      action "Edit"
      click_on "beetroot"
      fill_in "Name", with: "Cat"
      fill_in "Oxalates per serving", with: "100"
      fill_in "Serving", with: "2 animals"
      click_on "Done"

      expect(page).to have_content("Very High Oxalates")
      expect(page).to have_content("Cat")

      click_on "Done"

      expect(page).to have_content("Very High Oxalates")
      expect(page).to have_content("Cat")
      expect(page).to have_content(/100\s*mg/)
      expect(page).to have_content("2 animals")
    end

    it "deletes a food" do
      navigate_to "Low"
      expect(page).to have_content(/asparagus/i)

      action "Edit"
      click_on "Delete"

      expect(page).to have_content("Low Oxalates")
      expect(page).to have_link("Done")
      expect(page).not_to have_content(/asparagus/i)
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

def add_food(name:)
  action "Add"
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
