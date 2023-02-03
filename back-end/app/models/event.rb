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
#  location       :string
#  event_month_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Event < ApplicationRecord
  has_one_attached :image

  def self.between(starts_time, ends_time)
    starts_time = Date.parse(starts_time).beginning_of_day
    ends_time = Date.parse(ends_time).end_of_day
    where(starts: starts_time..ends_time).or(Event.where(ends: starts_time..ends_time))
  end

  validates :title, :starts, :ends, presence: true
  # :starts, :ends, :details, :address_line_1, :address_line_2, :city, :state_province_region, :zip_postalcode, :country,
  # validates :title, uniqueness: {
  #     scope: [:location, :starts],
  #     message: ' is already used for an event at this location starting at the same time'
  # }, on: :create
  validates :title, uniqueness: {
    message: 'That title is already used for an event'
  }, on: :create
  # validates :starts, :ends, :details, :address_line_1, :address_line_2, :city, :state_province_region, :zip_postalcode, :country, allow_blank: true
  validates :details, length: { maximum: 8000 }, allow_blank: true
  validates :address_line_1, length: { in: 1..300 }, allow_blank: true
  validates :address_line_2, length: { in: 1..300 }, allow_blank: true
  validates :city, length: { in: 1..50 }, allow_blank: true
  validates :state_province_region, length: { in: 1..100 }, allow_blank: true
  validates :zip_postalcode, numericality: { only_integer: true }, length: { in: 1..9 }, allow_blank: true
  validates :country, length: { in: 1..50 }, allow_blank: true

  # validates :details, length: {:maximum => 8000}, :unless => :pending?
  # validates :address_line_1, length: => {:in => 1..300} :unless => :pending?
  # validates :address_line_2, length: => {:in => 1..300} :unless => :pending?
  # validates :city, :length => {:in => 1..50}, :unless => :pending?
  # validates :state_province_region, :length => {:in => 1..100} :unless => :pending?
  # validates :zip_postalcode, {:only_integer => true}, :length => {:in => 1..9}, :unless => :pending?
  # validates :country :length => {:in => 1..50} :unless => :pending?

  # def pending?
  #     active_state == "pending"
  #  end
end
