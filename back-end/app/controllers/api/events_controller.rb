module Api
    class EventsController < ApplicationController
        before_action :authenticate_user, only: [ :create, :update, :destroy]

        #get '/events'
        #get '/events?starts_time=2022-06-01&ends_time=2022-06-31'
        #get '/events?month=06'

# Goal:
# Have each event display with only the day number, month and year on the EventCard page 
# Have each event display with the day, day number, month, year and time on the EventInfoPage
# Have a months filter bar that appears when an event within that month is made - you can click on months to show events that take place during the month 

        def index
            @events = if params[:starts_time].present? && params[:ends_time].present?
                Event.between(params[:starts_time], params[:ends_time])
            elsif (month = params[:month]).present?
                starts_time = "2022-#{month}-01"
                ends_time = "2022-#{month}-30"
                Event.between(starts_time, ends_time)
            else
                Event.all
            end
            render json: @events, status: :ok #200
        end

        #get '/events/:id'
        def show
            # binding.pry
            event = Event.find(params[:id])
            # if event
            render json: event, status: :ok
            # else
            # render json: { message: 'cannot find id'}, status: :internal_service_error #500
            # end
        end

        def create
            event = Event.create!(event_params) 
            render json: event, status: :created
        end

        def event_months
            start_months = Event.order(:starts).pluck(:starts).map{ |s| s.strftime("%B") }.uniq
            end_months = Event.order(:ends).pluck(:ends).map{ |s| s.strftime("%B") }.uniq
            
            @event_months = (start_months + end_months).uniq

            render json: @event_months, status: :ok
        end

        def update
            @event = Event.find(params[:id])
            @event.update!(event_params)
            render json: @event, status: :created #201
        end

        def destroy
            @event = Event.find(params[:id])
            @event.destroy!
            render json: { message: 'Event deleted successfully' }, status: :ok #200
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
