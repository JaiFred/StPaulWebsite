module Api
  class DashboardDocumentsController < ApplicationController
    before_action :set_dashboard_document, only: %i[ show update destroy ]
  
    # GET /dashboard_documents
    # GET /dashboard_documents.json
    def index
      @dashboard_document = DashboardDocument.last
      render json: @dashboard_document, status: :ok
    end
  
    # GET /dashboard_documents/1
    # GET /dashboard_documents/1.json
    def show
    end
  
    # POST /dashboard_documents
    # POST /dashboard_documents.json
    def create
      @dashboard_document = DashboardDocument.new(dashboard_document_params)
  
      if @dashboard_document.save
        render :show, status: :created, location: @dashboard_document
      else
        render json: @dashboard_document.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /dashboard_documents/1
    # PATCH/PUT /dashboard_documents/1.json
    def update
      if @dashboard_document.update(dashboard_document_params)
        render :show, status: :ok, location: @dashboard_document
      else
        render json: @dashboard_document.errors, status: :unprocessable_entity
      end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_dashboard_document
        @dashboard_document = DashboardDocument.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def dashboard_document_params
        params.require(:dashboard_document).permit(:description)
      end
  end
end
