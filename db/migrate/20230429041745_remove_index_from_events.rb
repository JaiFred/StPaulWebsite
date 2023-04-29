class RemoveIndexFromEvents < ActiveRecord::Migration[7.0]
  def change
    remove_index :events, :title, unique: true
  end
end
