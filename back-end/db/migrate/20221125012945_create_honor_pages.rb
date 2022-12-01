class CreateHonorPages < ActiveRecord::Migration[7.0]
  def change
    create_table :honor_pages do |t|      

      t.timestamps
    end
  end
end
