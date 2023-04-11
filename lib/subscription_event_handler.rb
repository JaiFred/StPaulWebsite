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
    invoice = event.data.object
    reason = invoice.billing_reason
    customer_id = invoice.customer
    user = User.find_by(stripe_customer_id: customer_id)
    Rails.logger.info("sending UserInvoiceMailer email to user: #{user.email}")
    UserInvoiceMailer.payment_failed(user, reason).deliver_now
    user.update!(payment_failed_email_sent_at: DateTime.current)
  end
end