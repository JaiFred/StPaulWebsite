require 'nokogiri'

class DeleteS3ImagesJob
  include Sidekiq::Job
  include Rails.application.routes.url_helpers

  def perform
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
  end
end