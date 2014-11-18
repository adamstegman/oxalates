class ListsController < ApplicationController
  def show
    @list = SortedList.new(List.find(params[:id]))
  end

  def index
    redirect_to List.first
  end
end
