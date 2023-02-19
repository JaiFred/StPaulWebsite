# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    # POST /resource/password
    def create

      # Reset Password Page (front-end)
      if params[:request_source] == 'front-end'
        if resource_class.find_by(email: resource_params[:email]).blank?
          render json: { message: 'Email Not Found' }, status: 422
          return
        end
      end

      self.resource = resource_class.send_reset_password_instructions(resource_params)
      yield resource if block_given?

      if successfully_sent?(resource)
        if params[:request_source] == 'front-end'
          render json: { message: 'Password Reset Was Succesfull' }, status: 200
          return
        else
          respond_with({ message: 'successfully sent password reset email' },
          location: after_sending_reset_password_instructions_path_for(resource_name))
        end
      else
        respond_with(resource)
      end
    end

    # PUT /resource/password
    def update
      self.resource = resource_class.reset_password_by_token(resource_params)
      yield resource if block_given?

      if resource.errors.empty?
        resource.unlock_access! if unlockable?(resource)
        if Devise.sign_in_after_reset_password
          flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
          set_flash_message!(:notice, flash_message)
          resource.after_database_authentication
        else
          set_flash_message!(:notice, :updated_not_active)
        end
        respond_with resource, location: after_resetting_password_path_for(resource)
      else
        set_minimum_password_length
        respond_with resource
      end
    end

    protected

    def after_resetting_password_path_for(_resource)    
      if Rails.env.production?
        "#{Rails.application.routes.default_url_options[:host]}/login"
      else
        'http://localhost:3001/login'
      end
    end

    # The path used after sending reset password instructions
    def after_sending_reset_password_instructions_path_for(_resource_name)
      if Rails.env.production?
        "#{Rails.application.routes.default_url_options[:host]}/login"
      else
        '/login'
      end
    end
  end
end
