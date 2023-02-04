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

        image_url = if image_params[:aspect_ratio] == 'small'
                      Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(
                        image.file.variant(resize: '485x485').processed, only_path: true
                      )
                    else
                      Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(
                        image.file.variant(resize: '700x700').processed, only_path: true
                      )
                    end

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
