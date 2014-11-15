require 'rails_helper'

RSpec.describe FoodsController, :type => :controller do
  describe "GET new" do
    it "returns http success" do
      get :new
      expect(response).to be_success
    end
  end

  describe "POST create" do
    it "creates a new food" do
      list = List.create
      expect {
        post :create, food: {name: "something", list: list.id}
      }.to change(Food, :count).by(1)
    end

    it "redirects to the new food's list" do
      list = List.create
      post :create, food: {name: "something", list: list.id}
      expect(response).to redirect_to(list)
    end
  end

  describe "GET edit" do
    it "returns http success" do
      food = Food.create
      get :edit, id: food
      expect(response).to be_success
    end
  end

  describe "PUT update" do
    it "updates the food" do
      list = List.create
      food = list.foods.create
      expect {
        put :update, id: food, food: {name: "something", list: list.id}
      }.to change { food.reload.name }.to("something")
    end

    it "redirects to the new food's list" do
      list = List.create
      food = list.foods.create
      put :update, id: food, food: {name: "something", list: list.id}
      expect(response).to redirect_to(list)
    end
  end

  describe "DELETE destroy" do
    it "deletes the food" do
      list = List.create
      food = list.foods.create
      expect {
        delete :destroy, id: food
      }.to change(Food, :count).by(-1)
    end

    it "redirects to the old food's list" do
      list = List.create
      food = list.foods.create
      delete :destroy, id: food
      expect(response).to redirect_to(list)
    end
  end
end
