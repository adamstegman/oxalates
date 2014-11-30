class ListsController < ApplicationController
  def show
    @list = SortedList.new(List.find(params[:id]))
  end

  def edit
    @list = SortedList.new(List.find(params[:id]))
  end

  def update
    # Does not merge conflicting writes, last write wins
    # A more friendly approach might be incremental updates rather than the entire list at a time
    list = List.find(params[:id])
    list.foods = Array(params[:list][:foods]).map { |food_params|
      Food.find(food_params[:id]).tap do |food|
        food.update_attributes(food_params.permit(:name))
      end
    }
    redirect_to list
  end

  def index
    redirect_to List.first
  end
end
