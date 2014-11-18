class SessionsController < ApplicationController
  def create
    session[:current_user] = BCrypt::Password.new(ENV['OXALATES_PASSWORD']) == params[:password]
    redirect_to params.fetch(:from, root_path)
  end

  def destroy
    session.delete :current_user
    redirect_to params.fetch(:from, root_path)
  end
end
