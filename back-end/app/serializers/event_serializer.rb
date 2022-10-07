class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :starts, :ends, :details, :location
end
