module Api
    class ImagesController < ApplicationController
        # before_action :authenticate_user!, only: [ :create, :update, :destroy]
        # before_action :set_document

        def create
            if image_params[:image].present?
                image = Image.create!
                image.file.attach(image_params[:image])

                render json: { 
                    image_url: Rails.application.routes.default_url_options[:host] + rails_blob_path(image.file)
                }, status: :ok
            else
                render json: { message: 'No image uploaded!' }, status: :ok
            end
        end

        private

        def image_params
            params.permit(:image)
        end

    end
end
