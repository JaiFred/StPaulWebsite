# frozen_string_literal: true

class Image < ApplicationRecord
  has_one_attached :file
  has_many :image_data, dependent: :destroy
end
