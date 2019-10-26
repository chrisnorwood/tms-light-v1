Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contacts
      resources :loads
      resources :shippers
      resources :carriers

      post 'auth/login', to: 'authentication#authenticate'
      post 'signup', to: 'users#create'
      get 'current_user', to: 'users#profile'
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
