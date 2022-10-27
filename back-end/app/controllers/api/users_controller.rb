module Api
    class UsersController < ApplicationController
        before_action :authenticate_user, only: [:show]
    
        # get '/me'
        def show 
            render json: current_user, status: :ok
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
