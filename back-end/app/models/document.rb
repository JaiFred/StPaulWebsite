# frozen_string_literal: true

class Document < ApplicationRecord
  belongs_to :honor_page

  has_one_attached :file
end
