class FoodsController < ApplicationController
  def new
    @food = Food.new
    @list_id = params[:list_id]
  end

  def create
    list = List.find(params[:food][:list])
    food_params = params.require(:food).permit(:name)
    list.foods << Food.new(food_params)
    redirect_to list
  end

  def edit
    @food = Food.find(params[:id])
  end

  def update
    list = List.find(params[:food][:list])
    food_params = params.require(:food).permit(:name)
    list.foods.find(params[:id]).update_attributes!(food_params)
    redirect_to list
  end

  def destroy
    food = Food.find(params[:id])
    list = food.list
    food.destroy!
    redirect_to edit_list_path(list)
  end

  def search
    # SELECT * from foods WHERE `foods`.name LIKE "%chocolate%"
    @results = Food.where('name LIKE ?', "%#{params[:search]}%")
    @query = params[:search]
  end
end
