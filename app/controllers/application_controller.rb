class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def all_lists
    List.all.unshift(List.new(name: "All"))
  end
  helper_method :all_lists

  def current_user
    session[:current_user]
  end
  helper_method :current_user
end
