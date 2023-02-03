# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json
    # before_action :configure_sign_in_params, only: [:create]

    # GET /resource/sign_in
    # def new
    #   super
    # end

    # POST /resource/sign_in
    def create
      resource = User.find_by(email: params[:user][:email])
      unless resource.confirmed?
        return render json: { errors: 'Please confirm your email before logging in' }, status: :ok
      end

      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      respond_with resource, location: after_sign_in_path_for(resource)
    end

    # DELETE /resource/sign_out
    def destroy
      if current_user
        session.clear
      else
        render json: { errors: 'No active session' }, status: :unauthorized # 401
      end
    end

    # protected

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_sign_in_params
    #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
    # end

    private

    def respond_with(resource, _opts = {})
      render json: { user: UserSerializer.new(resource).serializable_hash }, status: :ok
    end

    def respond_to_on_destroy
      if current_user
        render json: {
          status: 200,
          message: 'logged out successfully'
        }, status: :ok
      else
        render json: {
          status: 401,
          message: "couldn't find an active session."
        }, status: :unauthorized
      end
    end
  end
end
