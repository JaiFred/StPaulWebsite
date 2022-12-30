class FutureSubscription < ApplicationRecord
  belongs_to :user

  scope :eligible, -> { where(converted: false) }
end
