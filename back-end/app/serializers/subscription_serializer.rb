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
class SubscriptionSerializer < ActiveModel::Serializer

  attributes :id, :title

end
