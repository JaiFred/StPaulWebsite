# frozen_string_literal: true

class FutureSubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :title, :next_payment_date

  def next_payment_date
    object.payment_start_date.strftime('%A %d %b %Y')
  end
end
