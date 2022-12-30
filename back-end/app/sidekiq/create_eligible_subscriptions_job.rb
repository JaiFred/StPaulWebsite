# TODO: setup schedule to run the job everyday
# TODO: schedule rake scheduled_tasks:convert_future_subscriptions in heroku schedule 
# to run once every day.

class CreateEligibleSubscriptionsJob
  include Sidekiq::Job

  def perform
    FutureSubscription.eligible.each do |future_sub|

      puts "processing future_sub: #{future_sub.id}"
      puts "(future_sub.payment_start_date - Date.today).to_i > future_sub.frequency #{(future_sub.payment_start_date - Date.today).to_i > future_sub.frequency}"

      next if (future_sub.payment_start_date - Date.today).to_i > future_sub.frequency

      response = Stripe::Subscription.create({customer: future_sub.user.stripe_customer_id,
        items: [
            { price: future_sub.plan },
        ],                
        billing_cycle_anchor: future_sub.billing_cycle_anchor,
        proration_behavior: 'none'
      })
      
      future_sub.user.subscriptions.create!(
        stripe_subscription_id: response.id, 
        title: future_sub.title                
      )

      future_sub.update!(converted: true)
    end
  end
end
