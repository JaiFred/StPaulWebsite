# frozen_string_literal: true

class AddTitleToSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :subscriptions, :title, :string
    add_column :subscriptions, :cancelled_at, :datetime
  end
end
