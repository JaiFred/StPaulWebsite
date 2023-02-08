# frozen_string_literal: true

class CreateFutureSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :future_subscriptions do |t|
      t.bigint :billing_cycle_anchor
      t.date :payment_start_date
      t.references :user, null: false, foreign_key: true
      t.string :plan
      t.string :title
      t.integer :frequency
      t.boolean :converted, default: false

      t.timestamps
    end
  end
end
