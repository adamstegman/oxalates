class ListsController < ApplicationController
  def show
    @list = fetch_list
  end

  def index
    respond_to do |format|
      format.json do
        @lists = List.all.to_a.unshift(AllFoodsList.new)
      end
    end
  end

  private

  def fetch_list
    if params[:id] == AllFoodsList::ID
      AllFoodsList.new
    else
      List.find(params[:id])
    end
  end
end
