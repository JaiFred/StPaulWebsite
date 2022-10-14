class EventsController < ApplicationController

    def index
        render json: Event.all, status: :ok #200
    end

    def self.between()
        
    end


    
end
