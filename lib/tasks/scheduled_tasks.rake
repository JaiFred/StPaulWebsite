# frozen_string_literal: true

# TODO: schedule rake scheduled_tasks:convert_future_subscriptions in heroku schedule
# TODO: schedule rake scheduled_tasks:delete_obsolete_images_from_aws_s3_bucket in heroku schedule
# to run once every day.

namespace :scheduled_tasks do
  desc 'Convert Future Subscriptions into Stripe Subscriptions'
  task convert_future_subscriptions: :environment do
    CreateEligibleSubscriptionsJob.perform_async
    puts 'Done!'
  end

  task delete_obsolete_images_from_aws_s3_bucket: :environment do
    DeleteS3ImagesJob.perform_async
    puts 'Done!'
  end
end
