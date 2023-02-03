# frozen_string_literal: true

class CreateButtonVisibleConfigs < ActiveRecord::Migration[7.0]
  def change
    create_table :button_visible_configs do |t|
      t.boolean :facebook, default: true

      t.timestamps
    end
  end
end
