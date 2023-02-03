# frozen_string_literal: true

class CreateHonorPages < ActiveRecord::Migration[7.0]
  def change
    create_table :honor_pages, &:timestamps
  end
end
