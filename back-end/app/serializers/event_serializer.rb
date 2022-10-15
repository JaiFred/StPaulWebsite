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
class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :starts, :ends, :details, :location, :time

  def time
      "From #{object.starts.strftime("%A %d %b %Y, at %-I:%M%p")} to #{object.ends.strftime("%A %d %b %Y, at %-I:%M%p")}"
  end

  def starts
      object.starts.strftime("%A %d %b %Y, at %-I:%M%p")
    end

    def ends
      object.ends.strftime("%A %d %b %Y, at %-I:%M%p")
    end
end
