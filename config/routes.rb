Rails.application.routes.draw do
  root 'lists#show', id: AllFoodsList::ID
  resources :lists, only: [:show, :index, :edit, :update]

  resources :foods, only: [:index, :new, :create, :edit, :update, :destroy]
  get "search" => 'foods#search'

  resource :session, only: [:new, :create, :destroy] do
    collection do
      post :validate
    end
  end
end
