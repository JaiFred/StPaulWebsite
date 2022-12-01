class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :starts
      t.datetime :ends
      t.string :details
      t.string :address_line_1
      t.string :address_line_2
      t.string :city
      t.string :state_province_region
      t.string :zip_postalcode
      t.string :country

      t.timestamps
    end
  end
end
