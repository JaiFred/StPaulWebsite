# frozen_string_literal: true

module Api
  class ImagesController < ApplicationController
    def index
      @images = Image.all
      render json: @images, status: :ok # 200
    end

    def create
      if image_params[:image].present?
        image = Image.create!
        image.file.attach(image_params[:image])

        resize_value = if image_params[:aspect_ratio] == 'small'
          '485x485'
        else
          '700x700'
        end

        image_url = Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(
          image.file.variant(resize: resize_value).processed, only_path: true
        )

        ImageDatum.create!(image: image, image_url: image_url, resize_value: resize_value)

        render json: {
          image_url: image_url
        }, status: :ok
      else
        render json: { message: 'No image uploaded!' }, status: :ok
      end
    end

    private

    def image_params
      params.permit(:image, :aspect_ratio)
    end
  end
end
