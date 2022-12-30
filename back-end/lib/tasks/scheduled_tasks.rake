# TODO: schedule rake scheduled_tasks:convert_future_subscriptions in heroku schedule 
# to run once every day.

namespace :scheduled_tasks do
    desc "Convert Future Subscriptions into Stripe Subscriptions"
    task convert_future_subscriptions: :environment do
        CreateEligibleSubscriptionsJob.perform_async
        puts "Done!"
    end
end