# frozen_string_literal: true

json.extract! dashboard_document, :id, :description, :created_at, :updated_at
json.url dashboard_document_url(dashboard_document, format: :json)
