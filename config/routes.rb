Rails.application.routes.draw do
  root 'lists#show', id: AllFoodsList::ID
  resources :lists, only: [:index, :show]

  resources :foods, only: [:index, :create, :update, :destroy]
  get "search" => 'foods#search'

  resource :session, only: [] do
    collection do
      post :validate
    end
  end
end
