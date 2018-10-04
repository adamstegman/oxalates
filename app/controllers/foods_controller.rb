class FoodsController < ApplicationController
  def index
    list = fetch_list
    respond_to do |format|
      format.html do
        redirect_to AllFoodsList.new
      end
      format.json do
        @foods = Food.for_list(list)
      end
    end
  end

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
    respond_to do |format|
      format.html { redirect_to :back }
      format.js { head 204 }
    end
  end

  def search
    @query = params[:search]
    if @query.present?
      @query.strip!
      # SELECT * from foods WHERE `foods`.name ILIKE "%7%up%"
      @results = Food.where('name ILIKE ?', "%#{@query.gsub(/\W/, '%')}%")
    else
      @results = Food.all
    end
    respond_to do |format|
      format.html
      format.json do
        @foods = @results
        render action: :index
      end
    end
  end

  private

  def fetch_list
    if params[:list_id] == AllFoodsList::ID
      AllFoodsList.new
    else
      List.find(params[:list_id])
    end
  end

  def food_params
    params.require(:food).permit(:name, :oxalate_mg, :serving)
  end
end
