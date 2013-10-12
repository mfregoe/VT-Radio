class RadioStationsController < ApplicationController
  def index
    @radio_stations = filter_radio_stations

    respond_to do |format|
      format.html
      format.json { render json: @radio_stations }
    end
  end

  private

    def filter_radio_stations
      return filter_by_genre if params[:genre].present?
      return filter_by_band if params[:band].present?
      return filter_by_is_streaming if params[:is_streaming].present?
      return filter_by_city if params[:city].present?
      return RadioStation.order('name ASC')
    end

    def filter_by_genre
      return RadioStation.where('genre LIKE ?', "%#{params[:genre]}%").order('name ASC, genre ASC')
    end

    def filter_by_band
      return RadioStation.where('band = ?', params[:band]).order('name ASC, band ASC')
    end

    def filter_by_is_streaming
      return RadioStation.where('streaming_url IS NULL').order('name ASC') if params[:is_streaming] == 'false' || params[:is_streaming] == false
      return RadioStation.where('streaming_url IS NOT NULL').order('name ASC')
    end

    def filter_by_city
      return RadioStation.where('city = ?', params[:city])
    end
end