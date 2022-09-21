class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :title
      t.text :eventType
      t.string :activity
      t.string :description
      t.string :location
      t.datetime :starts
      t.datetime :ends
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :bulletin, null: false, foreign_key: true

      t.timestamps
    end
  end
end
