class ListsController < ApplicationController
  def show
    @list = List.find(params[:id])
  end
  def index
    redirect_to List.first
  end
end
