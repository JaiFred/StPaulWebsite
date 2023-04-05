class SubscriptionEventHandler
  def call(event)
    # puts "event.type: #{event.type}"
    begin
      method = "handle_" + event.type.tr('.', '_')
      # puts "method: #{method}"
      self.send method, event
    end
  end

  def handle_customer_subscription_deleted(event)
    sub_id = event.data.object.id
    canceled_at = Time.at event.data.object.canceled_at
    subscription = Subscription.find_by(stripe_subscription_id: sub_id)
    subscription.update!(cancelled_at: canceled_at)
  end
end