class CreateDashboardDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :dashboard_documents do |t|
      t.text :description

      t.timestamps
    end
  end
end
