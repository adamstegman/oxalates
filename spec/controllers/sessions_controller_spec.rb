require 'spec_helper'

describe SessionsController do
  before { ENV['OXALATES_PASSWORD'] = BCrypt::Password.create('password') }

  describe "POST create" do
    it "sets a current user if the password is correct" do
      post :create, password: 'password'
      expect(controller.current_user).not_to be_nil
    end

    it "does not set a current user if the password is incorrect" do
      post :create, password: 'whatever'
      expect(!!controller.current_user).to be(false)
    end

    it "redirects to the given from path" do
      post :create, from: '/somepath'
      expect(response).to redirect_to('/somepath')
    end

    it "redirects to root if no from path is given" do
      post :create
      expect(response).to redirect_to(root_path)
    end
  end

  describe "DELETE destroy" do
    it "deletes the current user" do
      post :create, password: 'password'
      expect(controller.current_user).not_to be_nil

      delete :destroy
      expect(!!controller.current_user).to be(false)
    end

    it "redirects to the given from path" do
      delete :destroy, from: '/somepath'
      expect(response).to redirect_to('/somepath')
    end

    it "redirects to root if no from path is given" do
      delete :destroy
      expect(response).to redirect_to(root_path)
    end
  end
end
