require 'rails_helper'

RSpec.describe ListsController, :type => :controller do

  describe "GET show" do
    it "returns http success" do
      get :show, id: 1
      expect(response).to be_success
    end
  end

end
