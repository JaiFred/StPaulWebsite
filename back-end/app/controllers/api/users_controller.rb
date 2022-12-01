module Api
    class UsersController < ApplicationController
        before_action :authenticate_user, only: [:show]
    
        # get '/me'
        def show 
            render json: current_user, status: :ok
        end
    
        # DELETE '/users/:id'
        def destroy 
            @user = User.find_by(username: params[:username])
            
            if @user && @user.id == params[:id].to_i && @user.authenticate(params[:password])
                
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
    
        private
    
        # t.string :first_name
        # t.string :last_name
        # t.string :username
        # t.string :email
        # t.string :password
    
        def user_params
            params.permit(:username, :password, :password_confirmation)
        end

    end
end
