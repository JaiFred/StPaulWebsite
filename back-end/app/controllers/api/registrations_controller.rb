module Api
    class RegistrationsController < ApplicationController

        # POST '/sign_up'
        def create
            @user = User.new(user_sign_up_params)
            if @user.save                
                session[:user_id] = @user.id
                render json: { user: UserSerializer.new(@user) }, status: :accepted
            else
                render json: { errors: @user.errors.messages.join(", ") }, status: 422
            end
        end


        private

        def user_sign_up_params
          params.permit(:first_name, :last_name, :email, :password)
        end
    end
end