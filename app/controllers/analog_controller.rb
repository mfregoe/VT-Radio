class AnalogController < ApplicationController
  def index
  end

  def bands
    @radio_stations = RadioStation.where('band = ?', params[:band].upcase).order('name ASC, city ASC, genre ASC, band ASC')
    
    respond_to do |format|
      format.html
      format.json { render json: @radio_stations.to_json(:methods => :has_streaming_url) }
    end
  end

  def all_genres
    @all_genres = (RadioStation.all.map { |station| station.genre.split(', ') }.flatten).uniq.sort
    
    respond_to do |format|
      format.html
      format.json { render json: @all_genres }
    end
  end

  def genres
    @radio_stations = RadioStation.where('genre LIKE ?', "%#{params[:genre]}%").order('name ASC, city ASC, genre ASC, band ASC')

    respond_to do |format|
      format.html
      format.json { render json: @radio_stations.to_json(:methods => :has_streaming_url) }
    end
  end

  def location
  end
end