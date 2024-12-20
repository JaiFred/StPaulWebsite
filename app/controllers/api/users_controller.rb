# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:show]

    # get '/me'
    def show
      render json: current_user, status: :ok
    end

    def update
      @user = User.find(params[:id])

      if @user.update(user_params)
        render json: { user: @user, message: 'User Updated Successfully' }, status: :ok
      else
        render json: { message: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE '/users/:id'
    def destroy
      @user = User.find_by(email: params[:email])

      if @user && @user.id == params[:id].to_i && @user.valid_password?(params[:password])
        Rails.logger.debug 'correct password given!'
        @user.subscriptions.active.each do |subscription|
          Rails.logger.debug do
            "cancelling subscription: stripe_subscription_id = #{subscription.stripe_subscription_id}"
          end
          Stripe::Subscription.update(
            subscription.stripe_subscription_id,
            {
              cancel_at_period_end: true
            }
          )
          subscription.update!(cancelled_at: DateTime.current)
        end

        @user.destroy

        render json: { message: 'User Deleted Successfully' }, status: :ok
      else
        render json: { errors: 'Invalid username or password' }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end
  end
end
