Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contacts
      resources :loads
      resources :shippers
      resources :carriers

      post 'auth/login', to: 'authentication#authenticate'
      post 'signup', to: 'users#create'
    end
  end
end
