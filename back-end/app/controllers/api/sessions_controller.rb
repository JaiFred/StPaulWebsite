module Api
    class SessionsController < ApplicationController
        #skip_before_action :authenticate_user
    
        # POST '/login'
        # def create_user
        #     admin = User.find_by(username: params[:username])
        #     if user&.authenticate(params[:password])
        #         session[:user_id] = user.id
        #         render json: user, status: :ok
        #     else
        #         render json: { errors: 'Invalid credentials' }, status: :unauthorized #401
        #     end
        # end
    
        # # DELETE '/logout'
        # def destroy_user
        #     if current_user
        #         session.clear
        #     else
        #         render json: { errors: 'No active session'}, status: :unauthorized #401
        #     end
        # end
    
    end
end