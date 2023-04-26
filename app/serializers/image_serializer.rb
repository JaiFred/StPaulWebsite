# frozen_string_literal: true

class ImageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :image_url

  def image_url
    Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(
      object.file.variant(resize: '300x300').processed, only_path: true
    )
  end
end
