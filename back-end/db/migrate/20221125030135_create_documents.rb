class CreateDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :documents do |t|
      t.text :description
      t.references :honor_page, null: false, foreign_key: true

      t.timestamps
    end
  end
end
