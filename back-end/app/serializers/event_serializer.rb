# frozen_string_literal: true

# == Schema Information
#
# Table name: events
#
#  id             :integer          not null, primary key
#  title          :string
#  starts         :datetime
#  ends           :datetime
#  details        :string
#  t.string :address_line_1
#  t.string :address_line_2
#  t.string :city
#  t.string :state_province_region
#  t.string :zip_postalcode
#  t.string :country
#
class EventSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :starts, :ends, :starts_raw, :ends_raw, :details, :address_line_1, :address_line_2, :city,
             :state_province_region, :zip_postalcode, :country, :starts_short, :ends_short, :image

  def time
    "From #{object.starts.strftime('%A %d %b %Y, at %-I:%M%p')} to #{object.ends.strftime('%A %d %b %Y, at %-I:%M%p')}"
  end

  def starts
    object.starts.strftime('%A %d %b %Y, at %-I:%M%p')
  end

  def starts_raw
    object.starts.strftime('%Y-%m-%dT%H:%M')
  end

  def starts_short
    object.starts.strftime('%d %b %Y')
  end

  def ends
    object.ends.strftime('%A %d %b %Y, at %-I:%M%p')
  end

  def ends_raw
    object.ends.strftime('%Y-%m-%dT%H:%M')
  end

  def ends_short
    object.ends.strftime('%d %b %Y')
  end

  def image
    Rails.application.routes.default_url_options[:host] + rails_blob_path(object.image) if object.image.present?
  end
end
