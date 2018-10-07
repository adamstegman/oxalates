require 'rails_helper'

describe "API" do
  before(:each) do
    ENV['OXALATES_PASSWORD'] = BCrypt::Password.create('password')
  end
  before(:each) do
    List.destroy_all
    Food.destroy_all
    ActiveRecord::Base.connection.execute('ALTER SEQUENCE lists_id_seq RESTART WITH 1')
    ActiveRecord::Base.connection.execute('ALTER SEQUENCE foods_id_seq RESTART WITH 1')

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

  describe "/lists" do
    it "returns all lists" do
      get "/lists", headers: {'Accept' => 'application/json'}
      lists = JSON.parse(response.body)["lists"]
      expect(lists).to eq([
        {"id" => "all", "name" => "All", "bottom_threshold" => nil, "top_threshold" => nil},
        {"id" => 1, "name" => "Very High", "bottom_threshold" => 50.0, "top_threshold" => nil},
        {"id" => 2, "name" => "High", "bottom_threshold" => 15.0, "top_threshold" => 50.0},
        {"id" => 3, "name" => "Moderate", "bottom_threshold" => 5.0, "top_threshold" => 15.0},
        {"id" => 4, "name" => "Low", "bottom_threshold" => nil, "top_threshold" => 5.0},
      ])
    end
  end

  describe "/foods" do
    it "returns foods for the All Foods list" do
      get "/foods?list_id=all", headers: {'Accept' => 'application/json'}
      foods = JSON.parse(response.body)["foods"]
      expect(foods).to eq([
        {"id" => 1, "name" => "beetroot, steamed", "oxalate_mg" => 50.0, "serving" => "just under 1/2 cup"},
        {"id" => 2, "name" => "carrots, grated", "oxalate_mg" => 15.0, "serving" => "1/2 cup"},
        {"id" => 3, "name" => "tomato, raw, sliced", "oxalate_mg" => 5.0, "serving" => "1/2 cup"},
        {"id" => 4, "name" => "asparagus, raw", "oxalate_mg" => 4.9, "serving" => "1/2 cup"},
      ])
    end

    it "returns foods for the Very High list" do
      get "/foods?list_id=1", headers: {'Accept' => 'application/json'}
      foods = JSON.parse(response.body)["foods"]
      expect(foods).to eq([
        {"id" => 1, "name" => "beetroot, steamed", "oxalate_mg" => 50.0, "serving" => "just under 1/2 cup"},
      ])
    end

    it "returns foods for the High list" do
      get "/foods?list_id=2", headers: {'Accept' => 'application/json'}
      foods = JSON.parse(response.body)["foods"]
      expect(foods).to eq([
        {"id" => 2, "name" => "carrots, grated", "oxalate_mg" => 15.0, "serving" => "1/2 cup"},
      ])
    end

    it "returns foods for the Moderate list" do
      get "/foods?list_id=3", headers: {'Accept' => 'application/json'}
      foods = JSON.parse(response.body)["foods"]
      expect(foods).to eq([
        {"id" => 3, "name" => "tomato, raw, sliced", "oxalate_mg" => 5.0, "serving" => "1/2 cup"},
      ])
    end

    it "returns foods for the Low list" do
      get "/foods?list_id=4", headers: {'Accept' => 'application/json'}
      foods = JSON.parse(response.body)["foods"]
      expect(foods).to eq([
        {"id" => 4, "name" => "asparagus, raw", "oxalate_mg" => 4.9, "serving" => "1/2 cup"},
      ])
    end
  end

  describe "/search" do
    before(:each) do
      Food.create!(name: "chocolate")
      Food.create!(name: "something else")
      Food.create!(name: "hot chocolate")
    end

    it "returns matching foods" do
      get "/search?search=chocolate", headers: {'Accept' => 'application/json'}
      foods = JSON.parse(response.body)["foods"]
      expect(foods).to eq([
        {"id" => 5, "name" => "chocolate", "oxalate_mg" => 0.0, "serving" => nil},
        {"id" => 7, "name" => "hot chocolate", "oxalate_mg" => 0.0, "serving" => nil},
      ])
    end

    it "searches case-insensitively" do
      Food.create!(name: "Cold Chocolate")
      get "/search?search=CHOCOLATE", headers: {'Accept' => 'application/json'}
      foods = JSON.parse(response.body)["foods"]
      expect(foods).to eq([
        {"id" => 5, "name" => "chocolate", "oxalate_mg" => 0.0, "serving" => nil},
        {"id" => 7, "name" => "hot chocolate", "oxalate_mg" => 0.0, "serving" => nil},
        {"id" => 8, "name" => "Cold Chocolate", "oxalate_mg" => 0.0, "serving" => nil},
      ])
    end

    context "given no query" do
      it "returns all foods" do
        get "/search", headers: {'Accept' => 'application/json'}
        foods = JSON.parse(response.body)["foods"]
        expect(foods).to eq([
          {"id" => 1, "name" => "beetroot, steamed", "oxalate_mg" => 50.0, "serving" => "just under 1/2 cup"},
          {"id" => 2, "name" => "carrots, grated", "oxalate_mg" => 15.0, "serving" => "1/2 cup"},
          {"id" => 3, "name" => "tomato, raw, sliced", "oxalate_mg" => 5.0, "serving" => "1/2 cup"},
          {"id" => 4, "name" => "asparagus, raw", "oxalate_mg" => 4.9, "serving" => "1/2 cup"},
          {"id" => 5, "name" => "chocolate", "oxalate_mg" => 0.0, "serving" => nil},
          {"id" => 6, "name" => "something else", "oxalate_mg" => 0.0, "serving" => nil},
          {"id" => 7, "name" => "hot chocolate", "oxalate_mg" => 0.0, "serving" => nil},
        ])
      end
    end
  end

  describe "/session/validate" do
    it "validates the password" do
      post "/session/validate", params: {password: 'password'}.to_json, headers: {'Accept' => 'application/json', 'Content-type' => 'application/json'}
      expect(response.code).to eq("200")
    end

    it "invalidates a wrong password" do
      post "/session/validate", params: {password: 'wrong'}.to_json, headers: {'Accept' => 'application/json', 'Content-type' => 'application/json'}
      expect(response.code).to eq("401")
    end

    xit "gives up after a few tries" do
      post "/session/validate", params: {password: 'wrong'}.to_json, headers: {'Accept' => 'application/json', 'Content-type' => 'application/json'}
      post "/session/validate", params: {password: 'wrong'}.to_json, headers: {'Accept' => 'application/json', 'Content-type' => 'application/json'}
      post "/session/validate", params: {password: 'password'}.to_json, headers: {'Accept' => 'application/json', 'Content-type' => 'application/json'}
      expect(response.code).to eq("401")
    end
  end

  xdescribe "The all foods list" do
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

  xcontext "when signed in" do
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

  xcontext "when not signed in" do
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
