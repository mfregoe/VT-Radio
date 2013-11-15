class RadioStation < ActiveRecord::Base
  attr_accessible :band, :call_letters, :city, :frequency, :genre, :latitude, :longitude, :name, :phone, :state, :streaming_url
end
