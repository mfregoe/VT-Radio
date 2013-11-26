class RadioStationsController < ApplicationController
  def index
  end

  def listing
    where_clause += radio_station_filters
    @radio_stations = RadioStation.where(where_clause).order('name ASC, city ASC, genre ASC, band ASC')

    respond_to do |format|
      format.html
      format.json { render json: @radio_stations }
    end
  end

  def find
    where_clause += radio_station_filters
    @radio_stations = RadioStation.where(where_clause).order('name ASC, city ASC, genre ASC, band ASC')

    respond_to do |format|
      format.html
      format.json { render json: @radio_stations }
    end
  end

  private

    def radio_station_filters
      return filter_by_genre if params[:genre].present?
      return filter_by_band if params[:band].present?
      return filter_by_city if params[:city].present?
      return ''
    end

    def filter_by_genre
      return " AND genre LIKE '%#{params[:genre]}%'"
    end

    def filter_by_band
      " AND band = '#{params[:band]}'"
    end

    def filter_by_city
      " AND city = '#{params[:city]}'"
    end

    def app_params
      params.require(:list).permit(:band, :call_letters, :city, :frequency, :genre, :latitude, :longitude, :name, :phone, :state, :streaming_url)
    end
end