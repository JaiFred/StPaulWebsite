class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:show]

    def index
        render json: User.all, status: :ok #200
    end

    # get '/me'
    def show 
        current_user = User.find_by_id(session[:user_id])
        if current_admin
            render json: current_user, status: :ok
        else
            render json: { errors: "No Active Sessions" }, status: :unauthorized #401
        end
    end

end
