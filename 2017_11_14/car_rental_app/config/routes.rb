Rails.application.routes.draw do
  root 'home#index'

  resources :clients
  resources :cars
  resources :rentals
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
