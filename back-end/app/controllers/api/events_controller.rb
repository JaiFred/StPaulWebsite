module Api
    class EventsController < ApplicationController
        skip_before_action :verify_authenticity_token

        #get '/events'
        #get '/events?starts_time=2022-06-01&ends_time=2022-06-31'
        def index
            @events = if params[:starts_time].present? && params[:ends_time].present?
                Event.between(params[:starts_time], params[:ends_time])
            else
                Event.all
            end
            render json: @events, status: :ok #200
        end

        #get '/events/:id'
        def show
            @event = Event.find(params[:id])
            render json: @event, status: :ok
        end

        def create
            event = Event.create!(event_params) 
            render json: event, status: :created
        end

        def update
            @event = Event.find(params[:id])
            @event.update!(event_params)
            render json: @event, status: :created #201
        end

        def destroy
            @event = Event.find(params[:id])
            @event.destroy!
            render json: { message: 'Event deleted successfully' }, status: :ok
        end

        private

        def set_event
            @event = Event.find(params[:id])
        end

        def event_params
            params.permit(:id, :title, :starts, :ends, :details, :location)
        end

    end
end
