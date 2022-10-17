Rails.application.routes.draw do  
    resources :events, module: :api
    resources :users 

    get "/me", to: "user#show"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
