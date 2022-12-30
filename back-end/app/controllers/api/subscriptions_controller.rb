module Api
    class SubscriptionsController < ApplicationController
        before_action :authenticate_user!, only: [ :create, :update, :destroy]

        def index
            user = User.find(params[:user_id])
            @subscriptions = user.subscriptions.active
            
            render json: @subscriptions, status: :ok #200
        end
    end
end
