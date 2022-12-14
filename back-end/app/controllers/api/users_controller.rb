module Api
    class UsersController < ApplicationController
        before_action :authenticate_user!, only: [:show]
    
        # get '/me'
        def show
            render json: current_user, status: :ok
        end
    
        # DELETE '/users/:id'
        def destroy 
            @user = User.find_by(email: params[:email])
            
            if @user && @user.id == params[:id].to_i && @user.valid_password?(params[:password])                
                @user.subscriptions.each do |subscription|
                    Stripe::Subscription.update(
                        subscription.stripe_subscription_id,
                        {
                            cancel_at_period_end: true,
                        }
                    )        
                end

                @user.destroy

                render json: { message: 'User Deleted Successfully' }, status: :ok
            else
                render json: { errors: 'Invalid username or password' }, status: 422
            end
        end
        
        def update
            @user = User.find(params[:id])

            if @user.update(user_params)
                render json: { user: @user, message: 'User Updated Successfully' }, status: :ok
            else
                render json: { message: @user.errors.full_messages }, status: 422
            end
        end
    
        private
    
        def user_params
            params.require(:user).permit(:email, :first_name, :last_name)
        end

    end
end
