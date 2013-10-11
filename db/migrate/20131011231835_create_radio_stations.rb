class CreateRadioStations < ActiveRecord::Migration
  def change
    create_table :radio_stations do |t|
      t.string :band
      t.string :frequency
      t.string :call_letters
      t.string :city
      t.string :state
      t.string :name
      t.string :phone
      t.string :genre
      t.string :streaming_url
      t.string :longitude
      t.string :latitude

      t.timestamps
    end
  end
end
