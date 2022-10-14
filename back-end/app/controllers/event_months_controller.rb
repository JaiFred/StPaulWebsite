class EventMonthsController < ApplicationController
    
    def index
        render json: EventMonth.all, status: :ok #200
    end

end
