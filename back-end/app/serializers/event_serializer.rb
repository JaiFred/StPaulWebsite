class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :eventType, :activity, :description, :location, :starts, :ends
  has_one :user
  has_one :bulletin
end
