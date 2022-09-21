class CalendarYear < ApplicationRecord
    has_many :bulletins
    has_many :events through: :bulletins
end
