class Subscription < ApplicationRecord
  belongs_to :user

  scope :active, -> { where(cancelled_at: nil) }
end
