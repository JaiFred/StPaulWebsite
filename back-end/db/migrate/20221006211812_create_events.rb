class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :starts
      t.datetime :ends
      t.string :details
      t.string :location
      t.belongs_to :event_month, foreign_key: true

      t.timestamps
    end
  end
end
