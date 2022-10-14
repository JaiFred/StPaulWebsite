class User < ApplicationRecord
    has_many :events
    has_many :event_months, through: :events
end
