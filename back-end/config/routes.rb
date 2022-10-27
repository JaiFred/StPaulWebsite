Rails.application.routes.draw do  
    
    resources :users 

    namespace :api do 
      resources :events
      # or else if not in an api block write like this get "/me", to: "api/users#show"
      get "/me", to: "users#show"
      get "/events", to: "events#index"
      get "/event/:id", to: "events#show"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
    end
    
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
