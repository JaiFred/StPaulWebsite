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
class Event < ApplicationRecord

    def self.between(starts_time, ends_time)
        where(starts: starts_time .. ends_time).or(Event.where(ends: starts_time .. ends_time))
    end

    validates :title,  :starts, :ends, :details, :location, presence: true
    validates :title, uniqueness: { 
        scope: [:location, :starts],
        message: ' is already used for an event at this location starting at the same time'
    }, on: :create

    # upcomingEvents{}



end
