class CreateCalendarYears < ActiveRecord::Migration[7.0]
  def change
    create_table :calendar_years do |t|
      t.belongs_to :year, null: false, foreign_key: true

      t.timestamps
    end
  end
end
