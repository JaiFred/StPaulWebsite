
class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordInvalid, with: :render_validation_errors
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    
    before_action :configure_permitted_parameters, if: :devise_controller?

    protected
  
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name email username password_confirmation])
    #   devise_parameter_sanitizer.permit(:sign_in, keys: [:username])
    #   devise_parameter_sanitizer.permit(:account_update, keys: [:username])
    end

    private

    def authenticate_user
        render json: { errors: "You must be logged in to do that." }, status: :unauthorized unless current_user
    end

    # def current_user
    #     @current_user ||= User.find_by_id(session[:user_id])
    # end

    def render_uprocessable_entity(invalid)
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity #422
    end

    def render_not_found(e)
        render json: { errors: e.message }, status: :not_found #404
    end

    def render_validation_errors
        render json: { errors: "unable to save"}
    end
end
