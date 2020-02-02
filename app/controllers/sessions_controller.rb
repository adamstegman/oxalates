require 'uri'

class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:validate]

  def validate
    respond_to do |format|
      format.json do
        if valid_password?
          head :ok
        else
          head :unauthorized
        end
      end
    end
  end
end
