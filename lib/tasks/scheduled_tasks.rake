# frozen_string_literal: true

namespace :scheduled_tasks do
  desc 'Convert Future Subscriptions into Stripe Subscriptions'
  task convert_future_subscriptions: :environment do
    # CreateEligibleSubscriptionsJob.perform_async
    FutureSubscription.eligible.each do |future_sub|
      Rails.logger.debug { "processing future_sub: #{future_sub.id}" }
      Rails.logger.debug do
        "(future_sub.payment_start_date - Date.today).to_i > future_sub.frequency #{(future_sub.payment_start_date - Date.today).to_i > future_sub.frequency}"
      end

      next if (future_sub.payment_start_date - Date.today).to_i > future_sub.frequency

      response = Stripe::Subscription.create({ customer: future_sub.user.stripe_customer_id,
                                               items: [
                                                 { price: future_sub.plan }
                                               ],
                                               billing_cycle_anchor: future_sub.billing_cycle_anchor,
                                               proration_behavior: 'none' })

      future_sub.user.subscriptions.create!(
        stripe_subscription_id: response.id,
        title: future_sub.title
      )

      future_sub.update!(converted: true)
    end
    puts 'Done!'
  end

  desc 'delete_obsolete_images_from_aws_s3_bucket'
  task delete_obsolete_images_from_aws_s3_bucket: :environment do
    # DeleteS3ImagesJob.perform_async

    valid_image_urls = []
    (Document.pluck(:description) + DashboardDocument.pluck(:description)).each do |document|
      html = Nokogiri::HTML(document)      
  
      html.xpath("//img").each do |row|
        # puts row.inspect
        valid_image_urls << row['src']
      end
    end

    puts "*" * 100
    puts "valid_image_urls: #{valid_image_urls.inspect}"
    puts "valid_image_urls size: #{valid_image_urls.size}"
    puts "*" * 100

    puts "Processing total images: #{Image.count}"

    Image.all.each do |image|
      puts "processing image: #{image.id}"

      if image.file.blank?
        puts "no file or variant present for image: #{image.id}. so, deleting it."
        image.destroy!
        next
      end

      image_url_1 = Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(
        image.file.variant(resize: '485x485')&.processed, only_path: true
      )
      image_url_2 = Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(
        image.file.variant(resize: '700x700')&.processed, only_path: true
      )

      puts "#" * 100      
      puts "image_url_1: #{image_url_1.inspect}"
      puts "image_url_2: #{image_url_2.inspect}"
      puts "#" * 100

      if valid_image_urls.include?(image_url_1)
        puts "image_url_1 is present in the valid_image_urls. so keeping the image: #{image.id}"
        next
      end

      if valid_image_urls.include?(image_url_2)
        puts "image_url_2 is present in the valid_image_urls. so keeping the image: #{image.id}"
        next
      end

      puts "image_url_1 and image_url_2 are not found in the valid_image_urls. So, deleting the image: #{image.id}"

      image.destroy!
    rescue Exception => ex
      puts "Image: #{image.id} got exception #{ex.message} while processing. So, deleting it."
      image.destroy!
    end
    puts 'Done!'
  end
end
