Rails.application.routes.draw do
  root 'users#new'
  get    'signup',  to: 'users#new'
  get    'login',   to: 'sessions#new'
  post   'login',   to: 'sessions#create'
  delete 'logout',  to: 'sessions#destroy'
  post   'signup',  to: 'users#create'
  post   'spectate',  to: 'games#watch'
  resources :users
  resources :games do
    member do
      post 'join'
    end
  end
end
