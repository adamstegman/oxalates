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
      expect(assigns(:list)).to eq(list)
    end
  end

end
