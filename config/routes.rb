Rails.application.routes.draw do
  get "spider/index"
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  get "spider", to: "spider#index"

  resources :users, only: [:show] # 👈 Add this line
  resources :replies, only: [:show, :create] do
    resources :likes, only: [:create, :destroy]
    resources :replies, only: [:create]
  end
  
  resources :posts do
    resource :like, only: [:create, :destroy], controller: 'likes'
  end
  
  resources :replies, only: [:show, :create] do
    resource :like, only: [:create, :destroy], controller: 'likes'
  end
  
  
  resources :follows, only: [:create, :destroy]
  get 'following', to: 'posts#following'
  get 'users/:id/followers', to: 'users#followers', as: 'user_followers'
  get 'users/:id/following', to: 'users#following', as: 'user_following'


  resources :friends
  resources :posts do
    resources :replies, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
  end

  root 'posts#index'
  get 'search', to: 'search#index'

  resources :quotes, only: [:create, :destroy]

  resources :entities, only: [:index, :new, :create, :show]

  resources :entities do
    resources :ratings, only: [:create, :update]
    resources :quotes, only: [:create]
  end
end
