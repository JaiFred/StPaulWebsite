class DeleteS3ImagesJob
  include Sidekiq::Job
  include Rails.application.routes.url_helpers

  def perform
    # new table: rails_representation_url, resize, object.file referecne, object.file aws s3 reference
    # write a rake task, where we fetch all the existing aws s3 objects and build an array,
    # fetch all the img url by parsing all the document text description parsing

    # valid_urls = fetch all the img url by parsing all the document text description parsing
    # all_image_urls = Image.all.map do |image|
    # resize_values = ['485x485', '700x700']
    # end
    # generate url for both resize_values from the array ^^
    
    # image_url = Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(
    #   image.file.variant(resize: resize_value).processed, only_path: true
    # )

    # 0. FIRST THING TOMORROW: Verify if we can get rid of ImageDatum model altogether.
    # and, just use image_url to determine whether it's a valid one or not. If invalid, then, destroy the image.
    # 
    # next unless ImageDatum.exists?(image_id: image.id, image_url: image_url)

    # 1. Document.description && DashboardDocument.description parsing will give array of valid_image_urls

    # 2.
    # unless valid_image_urls.include?(image_url) # 2nd check before destroying
    # image.destroy!
    # end
    # end
  end
end
