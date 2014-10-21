class FoodsController < ApplicationController
  def new
    @food = Food.new
  end

  def create
    list = List.find(params[:food][:list])
    food_params = params.require(:food).permit(:name)
    list.foods << Food.new(food_params)
    redirect_to list
  end

  def search
    # SELECT * from foods WHERE `foods`.name LIKE "%chocolate%"
    @results = Food.where('name LIKE ?', "%#{params[:search]}%")
  end
end
