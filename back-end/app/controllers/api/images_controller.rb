module Api
    class ImagesController < ApplicationController
        def create
            if image_params[:image].present?
                image = Image.create!
                image.file.attach(image_params[:image])

                render json: {
                    image_url: Rails.application.routes.default_url_options[:host] + Rails.application.routes.url_helpers.rails_representation_url(image.file.variant(resize: "969x969").processed, only_path: true)
                }, status: :ok
            else
                render json: { message: 'No image uploaded!' }, status: :ok
            end
        end

        def index
            @images = Image.all
            render json: @images, status: :ok #200
        end

        private

        def image_params
            params.permit(:image)
        end

    end
end
