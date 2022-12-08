Rails.application.routes.draw do
  
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
  }
      
    namespace :api do       
      resources :events
      resources :subscriptions
      resources :users

      get '/event_months', to: "events#event_months"
      
      post '/client_secret', to: "payments#client_secret"
      get '/client_secret_recurring', to: "payments#client_secret_recurring"
      

      post "/payment_subscription", to: "payments#payment_subscription"
      patch "/cancel_subscription", to: "payments#cancel_subscription"

      # or else if not in an 'api block' write like this - get "/me", to: "api/users#show"
      get "/me", to: "users#show"
      get "/events", to: "events#show"
      post "/events", to: "events#create"
      patch "/events", to: "events#update"
      post '/sign_up', to: "registrations#create"
      post "/login", to: "sessions#create"
      delete "/events", to: "events#destroy"
      delete "/logout", to: "sessions#destroy"

      resources :honor_pages
      resources :documents, only: %i[show update destroy]
    end
    
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")  
end
