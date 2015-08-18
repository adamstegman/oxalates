class ListsController < ApplicationController
  def show
    @list = fetch_list
  end

  def edit
    @list = fetch_list
  end

  def update
    # Does not merge conflicting writes, last write wins
    # A more friendly approach might be incremental updates rather than the entire list at a time
    Array(params[:list][:foods]).each { |food_params|
      food = Food.find(food_params[:id])
      food.update_attributes!(food_params.permit(:name))
    }
    redirect_to fetch_list
  end

  def index
    redirect_to List.first
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
