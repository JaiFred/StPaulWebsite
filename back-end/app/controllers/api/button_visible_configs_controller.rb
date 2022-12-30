module Api
    class ButtonVisibleConfigsController < ApplicationController
        before_action :authenticate_user!, only: [ :create, :update, :destroy]

        def index
            @config = ButtonVisibleConfig.last
            render json: @config, status: :ok #200
        end

        def update
            @config = ButtonVisibleConfig.find(params[:id])
            @config.update!(button_visible_configs_params)
            
            render json: @config, status: :ok
        end

        private

        def button_visible_configs_params
            params.permit(:facebook)
        end

    end
end
