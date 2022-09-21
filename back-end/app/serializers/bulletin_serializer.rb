class BulletinSerializer < ActiveModel::Serializer
  attributes :id, :title, :month
  has_one :user
  has_one :calendar_year
end
