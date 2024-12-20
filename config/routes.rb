# frozen_string_literal: true

Rails.application.routes.draw do
  mount StripeEvent::Engine, at: '/stripe-webhooks'
  
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, path: '', path_names: {
                                 sign_in: 'signin',
                                 sign_out: 'logout',
                                 registration: 'signup'
                               },
                     controllers: {
                       sessions: 'users/sessions',
                       registrations: 'users/registrations',
                       confirmations: 'users/confirmations',
                       passwords: 'users/passwords'
                     }

  devise_scope :user do
    post 'reset_password' => 'users/passwords#update'
  end  

  resource :fallback do
    get 'test_image', to: 'fallback#test_image'
  end

  namespace :api do
    resources :events
    resources :subscriptions
    resources :future_subscriptions
    resources :users
    resources :dashboard_documents
    resources :images, only: %i[create index]

    post '/client_secret', to: 'payments#client_secret'
    get '/client_secret_recurring', to: 'payments#client_secret_recurring'

    post '/payment_subscription', to: 'payments#payment_subscription'
    patch '/cancel_subscription', to: 'payments#cancel_subscription'

    # or else if not in an 'api block' write like this - get "/me", to: "api/users#show"
    get '/me', to: 'users#show'
    get '/events', to: 'events#show'
    post '/events', to: 'events#create'
    patch '/events', to: 'events#update'
    post '/sign_up', to: 'registrations#create'
    post '/login', to: 'sessions#create'
    delete '/events', to: 'events#destroy'
    delete '/logout', to: 'sessions#destroy'

    resources :honor_pages
    resources :button_visible_configs
    resources :documents, only: %i[show update destroy]
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
end
