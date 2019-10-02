Rails.application.routes.draw do
  
  resources :contacts
  namespace :api do
    namespace :v1 do
      resources :loads
      resources :shippers
      resources :carriers
    end
  end

end
