class RadioStationsController < ApplicationController
  def index
  end

  def streaming
    where_clause = 'streaming_url IS NOT NULL'
    where_clause += radio_station_filters
    @radio_stations = RadioStation.where(where_clause).order('name ASC, city ASC, genre ASC, band ASC')

    respond_to do |format|
      format.html
      format.json { render json: @radio_stations.to_json(:methods => :has_streaming_url) }
    end
  end

  def analog
    where_clause = 'streaming_url IS NULL'
    where_clause += radio_station_filters
    @radio_stations = RadioStation.where(where_clause).order('name ASC, city ASC, genre ASC, band ASC')

    respond_to do |format|
      format.html
      format.json { render json: @radio_stations.to_json(:methods => :has_streaming_url) }
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
end