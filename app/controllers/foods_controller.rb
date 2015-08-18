class FoodsController < ApplicationController
  def new
    @food = Food.new
    @list_id = params[:list_id]
  end

  def create
    food = Food.create!(food_params)
    redirect_to List.for_food(food)
  end

  def edit
    @food = Food.find(params[:id])
  end

  def update
    food = Food.find(params[:id])
    food.update_attributes!(food_params)
    redirect_to edit_list_path(List.for_food(food))
  end

  def destroy
    food = Food.find(params[:id])
    food.destroy!
    redirect_to edit_list_path(List.for_food(food))
  end

  def search
    # SELECT * from foods WHERE `foods`.name LIKE "%chocolate%"
    @results = Food.where('name ILIKE ?', "%#{params[:search]}%")
    @query = params[:search]
  end

  private

  def food_params
    params.require(:food).permit(:name, :oxalate_mg, :serving)
  end
end
