class ListingController < ApplicationController
  def index
  end

  def bands
    @radio_stations = RadioStation.where('band = ?', params[:band].upcase).order('name ASC, city ASC, genre ASC, band ASC')
    
    respond_to do |format|
      format.html
      format.json { render json: @radio_stations }
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
      format.json { render json: @radio_stations }
    end
  end

  private
  
    def app_params
      params.require(:list).permit(:band, :call_letters, :city, :frequency, :genre, :latitude, :longitude, :name, :phone, :state, :streaming_url)
    end
end