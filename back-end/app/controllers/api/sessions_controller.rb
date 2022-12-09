module Api
    class SessionsController < ApplicationController
        # skip_before_action :verify_authenticity_token

        # POST '/login'
        def create
            @user = User.find_by(email: params[:email])
            if @user && @user.authenticate(params[:password])
                # @token = encode_token({ user_id: @user.id }) 
                session[:user_id] = @user.id
                render json: { user: UserSerializer.new(@user) }, status: :accepted
            else
                render json: { errors: 'Invalid email or password' }, status: :unauthorized #401
            end
        end
    
        # DELETE '/logout'
        def destroy 
            # binding.pry
            if current_user 
                session.clear
            else
                render json: { errors: 'No active session'}, status: :unauthorized #401
            end
        end

        private

        def user_login_params
          params.require(:user).permit(:email, :password)
        end
    end
end