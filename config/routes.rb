HackVT2013Teamzeusbear::Application.routes.draw do
  resources :radio_stations, only: [:index] do
    get 'streaming', :on => :collection
    get 'analog', :on => :collection
  end


  root to: 'radio_stations#index'
end
