require 'rails_helper'

describe ListsController, :type => :controller do

  describe "GET show" do
    it "returns http success" do
      list = List.create
      get :show, id: list
      expect(response).to be_success
    end

    it "grabs correct list" do
      list = List.create
      get :show, id: list
      expect(assigns(:list).id).to eq(list.id)
    end
  end

  describe "GET index" do
    it "redirects to first list" do
      list = List.create
      get :index
      expect(response).to redirect_to(list)
    end
  end

end
