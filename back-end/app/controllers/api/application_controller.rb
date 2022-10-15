module Api
    class ApplicationController < ActionController::Base
        # before_action :authenticate
        
        private

        def authenticate_user
            authenticate_or_request_with_http_token do |token, _options|
              User.find_by(token: token)
            end
        end

        # def current_user
        #     @current_user ||= authenticate
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
end