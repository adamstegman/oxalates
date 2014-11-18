Rails.application.routes.draw do
  root 'lists#index'
  resources :lists, only: [:show, :index]

  resources :foods, only: [:new, :create, :edit, :update, :destroy]
  get "search" => 'foods#search'

  resource :session, only: [:create, :destroy]
end
