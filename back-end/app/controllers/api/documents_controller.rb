module Api
    class DocumentsController < ApplicationController
        before_action :authenticate_user!, only: [ :create, :update, :destroy]
        before_action :set_document

        def update            
            @document.update!(description: document_params[:description])         
            
            if document_params[:file].present?
                @document.file.attach(document_params[:file])
            end

            render json: @document, status: :ok
        end
        
        def show
            render json: @document, status: :ok
        end

        def destroy            
            @document.destroy!
            render json: { message: 'Document deleted successfully' }, status: :ok #200
        end

        private

        def set_document
            @document = Document.find(params[:id])
        end

        def document_params
            params.permit(:id, :description, :file)
        end

    end
end
