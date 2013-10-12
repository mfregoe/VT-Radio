HackVT2013Teamzeusbear::Application.routes.draw do
  resources :radio_stations, only: [:index]

  resources :streaming, only: [:index] do
    get 'all_genres', :on => :collection
  end
  match '/streaming/bands/:band' => 'streaming#bands', via: [:get]
  match '/streaming/genres/:genre' => 'streaming#genres', via: [:get]

  resources :analog, only: [:index] do
    get 'all_genres', :on => :collection
  end
  match '/analog/bands/:band' => 'analog#bands', via: [:get]
  match '/analog/genres/:genre' => 'analog#genres', via: [:get]
  match '/analog/location' => 'analog#location', via: [:get]

  root to: 'radio_stations#index'
end
