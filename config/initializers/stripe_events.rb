require 'subscription_event_handler.rb'

StripeEvent.signing_secret = ENV.fetch('STRIPE_SIGNING_SECRET', nil)
Stripe.api_key = ENV.fetch('STRIPE_SECRET_KEY', nil)

StripeEvent.configure do |events|
  events.subscribe 'customer.subscription.', SubscriptionEventHandler.new
  events.subscribe 'invoice.payment_failed', SubscriptionEventHandler.new
end