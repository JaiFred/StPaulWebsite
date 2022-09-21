class CalendarYearSerializer < ActiveModel::Serializer
  attributes :id
  has_one :year
end
