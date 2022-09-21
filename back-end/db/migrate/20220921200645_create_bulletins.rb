class CreateBulletins < ActiveRecord::Migration[7.0]
  def change
    create_table :bulletins do |t|
      t.string :title
      t.string :month
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :calendar_year, null: false, foreign_key: true

      t.timestamps
    end
  end
end
