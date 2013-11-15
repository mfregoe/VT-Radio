HackVT2013Teamzeusbear::Application.routes.draw do
  resources :radio_stations, only: [:index]

  resources :listing, only: [:index] do
    get 'all_genres', :on => :collection
  end
  match '/listing/bands/:band' => 'listing#bands', via: [:get]
  match '/listing/genres/:genre' => 'listing#genres', via: [:get]

  resources :find, only: [:index] do
    get 'all_genres', :on => :collection
  end
  match '/find/bands/:band' => 'find#bands', via: [:get]
  match '/find/genres/:genre' => 'find#genres', via: [:get]
  match '/find/location' => 'find#location', via: [:get]

  root to: 'radio_stations#index'
end
