class CreateImageData < ActiveRecord::Migration[7.0]
  def change
    create_table :image_data do |t|
      t.references :image, null: false, foreign_key: true
      t.string :image_url
      t.string :resize_value

      t.timestamps
    end
  end
end
