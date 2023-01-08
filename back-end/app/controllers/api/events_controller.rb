module Api
    class EventsController < ApplicationController
        before_action :authenticate_user!, only: [ :create, :update, :destroy]

        #get '/events'
        #get '/events?starts_time=2022-06-01&ends_time=2022-06-31'
        #get '/events?month=06'

# Goal:
# Have each event display with only the day number, month and year on the EventCard page
# Have each event display with the day, day number, month, year and time on the EventInfoPage
# Have a months filter bar that appears when an event within that month is made - you can click on months to show events that take place during the month

        def index
            # binding.pry
            @events = if params[:starts_time].present? && params[:ends_time].present?
                Event.between(params[:starts_time], params[:ends_time])
            elsif (month = params[:month]).present?
                year = params[:month].split(" ").last
                month = params[:month].split(" ").first
                month_number = Date::MONTHNAMES.index(month)

                starts_time = "#{year}-#{month_number}-01"

                ends_time = if month == 'February'
                    Date.parse("#{year}-#{month_number}-28").end_of_month.to_s
                else
                    Date.parse("#{year}-#{month_number}-30").end_of_month.to_s
                end

                Event.between(starts_time, ends_time)
            else
                Event.all
            end
            @events = @events.order(starts: :desc)

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
            event = Event.new(event_params.except(:image))

            unless event.save
                render json: { errors: event.errors.full_messages }, status: 422
                return
            end

            if event_params[:image].present?
                event.image.attach(event_params[:image])
            end

            render json: event, status: :created
        end

        def update
            @event = Event.find(params[:id])

            unless @event.update(event_params.except(:image))
                render json: { errors: @event.errors.full_messages }, status: 422
                return
            end

            if event_params[:image].present?
                @event.image.attach(event_params[:image])
            end

            render json: @event, status: :ok
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
            params.permit(:id, :title, :starts, :ends, :details, :address_line_1, :address_line_2, :city, :state_province_region, :zip_postalcode, :country, :image)
        end

    end
end
