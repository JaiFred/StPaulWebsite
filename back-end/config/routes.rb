Rails.application.routes.draw do  
    
    resources :users 

    namespace :api do 
      
      resources :events
      get '/event_months', to: "events#event_months"

      # or else if not in an 'api block' write like this - get "/me", to: "api/users#show"
      get "/me", to: "users#show"
      get "/events", to: "events#show"
      post "/events", to: "events#create"
      patch "/events", to: "events#update"
      post "/login", to: "sessions#create"
      delete "/events", to: "events#destroy"
      delete "/logout", to: "sessions#destroy"
    end
    
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
