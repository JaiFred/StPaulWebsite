# == Schema Information
#
# Table name: events
#
#  id             :integer          not null, primary key
#  title          :string
#  starts         :datetime
#  ends           :datetime
#  details        :string
#  location       :string
#  event_month_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class ImageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :image_url

  def image_url
    # Rails.application.routes.default_url_options[:host] + rails_blob_path(object.file) if object.file.present?
    # Rails.application.routes.url_helpers.image_tag(object.file.variant(resize_to_limit: [500, 500]))
    Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(object.file.variant(resize: "300x300").processed, only_path: true)
  end

end
