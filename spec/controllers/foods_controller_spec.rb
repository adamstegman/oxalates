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

end
