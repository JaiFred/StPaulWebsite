class SubscriptionEventHandler
  def call(event)
    puts "event.type: #{event.type}"
    begin
      method = "handle_" + event.type.tr('.', '_')
      puts "method: #{method}"
      self.send method, event
    end
  end

  def handle_customer_subscription_deleted(event)
    sub_id = event.data.object.id
    canceled_at = Time.at event.data.object.canceled_at
    subscription = Subscription.find_by(stripe_subscription_id: sub_id)
    subscription.update!(cancelled_at: canceled_at)
  end

  def handle_invoice_payment_failed(event)
    binding.pry
    raise event.data
    invoice = event.data.object
    reason = invoice.billing_reason
    customer_id = invoice.customer
    user = User.find_by(stripe_customer_id: customer_id)
    # UserMailer.send_payment_failed_email(user: user, reason: reason)
    # put Logger to see the log later on
  end
end