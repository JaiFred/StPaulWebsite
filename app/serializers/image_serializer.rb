# frozen_string_literal: true

class ImageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :image_url

  def image_url
    # new table: rails_representation_url, resize, object.file referecne, object.file aws s3 reference
    # write a rake task, where we fetch all the existing aws s3 objects and build an array,
    # fetch all the img url by parsing all the document text description parsing

    # valid_urls = fetch all the img url by parsing all the document text description parsing
    # all_image_urls = Image.all.map do |image|
    # url = Rails.application.routes.url_helpers.rails_representation_url(image.file.variant(resize: '300x300'))
    # unless valid_urls.include?(url)
    # image.destroy!
    # end
    # end

    Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(
      object.file.variant(resize: '300x300').processed, only_path: true
    )
  end
end
