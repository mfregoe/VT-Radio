class RadioStation < ActiveRecord::Base
  attr_accessible :band, :call_letters, :city, :frequency, :genre, :latitude, :longitude, :name, :phone, :state, :streaming_url

  def has_streaming_url
    return streaming_url == nil ? false : true
  end
end
