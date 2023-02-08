# frozen_string_literal: true

module Api
  class HonorPagesController < ApplicationController
    before_action :authenticate_user!, only: %i[create update destroy]

    def index
      @honor_pages = HonorPage.all
      render json: @honor_pages, status: :ok # 200
    end

    def create
      honor_page = HonorPage.first_or_create

      if honor_pages_params[:file].present?
        document = honor_page.documents.create(description: honor_pages_params[:description])
        document.file.attach(honor_pages_params[:file])
      end

      render json: honor_page, status: :created
    end

    # def update
    #     @event = Event.find(params[:id])
    #     @event.update!(event_params)

    #     if event_params[:image].present?
    #         @event.image.attach(event_params[:image])
    #     end

    #     render json: @event, status: :created #201
    # end

    # def destroy
    #     @event = Event.find(params[:id])
    #     @event.destroy!
    #     render json: { message: 'Event deleted successfully' }, status: :ok #200
    # end

    private

    def set_event
      @event = Event.find(params[:id])
    end

    def honor_pages_params
      params.permit(:description, :file)
    end
  end
end
