# frozen_string_literal: true

module Api
  class FutureSubscriptionsController < ApplicationController
    before_action :authenticate_user!

    def index
      user = User.find(params[:user_id])
      @future_subscriptions = user.future_subscriptions.eligible

      render json: @future_subscriptions, status: :ok # 200
    end

    def destroy
      user = User.find(params[:user_id])
      @future_subscription = user.future_subscriptions.eligible.find(params[:id])
      @future_subscription.destroy

      render json: { message: 'Future Subscription Deleted Successfully' }, status: :ok
    end
  end
end
