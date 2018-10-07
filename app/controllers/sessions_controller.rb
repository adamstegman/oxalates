require 'uri'

class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:validate]

  def new
    if params[:from] && params[:from].start_with?(new_session_path)
      from_new_session_path = URI.unescape(URI.parse(params[:from]).query)
      original_from_match = /\Afrom=(?<original_from>.*)\z/.match(from_new_session_path)
      @from = original_from_match[:original_from]
    else
      @from = params[:from]
    end
  end

  def create
    session[:current_user] = valid_password?
    redirect_to params.fetch(:from, root_path)
  end

  def destroy
    session.delete :current_user
    redirect_to params.fetch(:from, root_path)
  end

  def validate
    respond_to do |format|
      format.html do
        redirect_to new_session_path
      end
      format.json do
        if valid_password?
          head :ok
        else
          head :unauthorized
        end
      end
    end
  end

  private

  def valid_password?
    BCrypt::Password.new(ENV['OXALATES_PASSWORD']) == params[:password]
  end
end
