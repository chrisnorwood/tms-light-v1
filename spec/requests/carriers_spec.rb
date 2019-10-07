require 'rails_helper'

RSpec.describe 'Carriers API', type: :request do
  # initialize test data
  let!(:carriers) { create_list(:carrier, 10) }
  let!(:carrier_id) { carriers.first.id }

  # Test suite for GET /api/v1/carriers
  describe 'GET /api/v1/carriers' do
    # make HTTP get request before each example
    before { get '/api/v1/carriers' }

    it 'returns carriers' do
      # `json` is custom helper to parse JSON into ruby hash
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /api/v1/carriers/:id
  describe 'GET /api/v1/carriers/:id' do
    # make HTTP get request before each example
    before { get "/api/v1/carriers/#{carrier_id}" }

    context 'when the record exists' do
      it 'returns the carrier' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(carrier_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:carrier_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Carrier/)
      end
    end
  end

  # Test suite for POST /api/v1/carriers
  describe 'POST /api/v1/carriers' do
    # valid payload
    let(:valid_attributes) { {carrier: { company_name: 'Company, Inc.', notes: 'Lorem ipsum and such' }} }

    context 'when the request is valid' do
      before { post '/api/v1/carriers', params: valid_attributes }

      it 'creates a carrier' do
        expect(json['company_name']).to eq('Company, Inc.')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/carriers', params: { carrier: { company_name: '' }} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Company name can't be blank/)
      end    
    end
  end

  # Test suite for PUT /api/v1/carriers/:id
  describe 'PUT /api/v1/carriers/:id' do
    # valid payload
    let(:valid_attributes) { {carrier: { company_name: 'Company, Inc.', notes: 'Lorem ipsum and such' }} }

    # make HTTP get request before each example
    before { put "/api/v1/carriers/#{carrier_id}", params: valid_attributes }

    context 'when the record exists' do
      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when the record does not exist' do
      # invalid carrier_id, though payload is still valid
      let(:carrier_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Carrier/)
      end
    end
  end

  # Test suite for DELETE /api/v1/carriers/:id
  describe 'DELETE /api/v1/carriers/:id' do
    before { delete "/api/v1/carriers/#{carrier_id}" }

    context 'when the record exists' do
      it 'deletes the record' do
        expect(response.body).to be_empty
      end
      
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when the record does not exist' do
      # invalid carrier_id
      let(:carrier_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
      
      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Carrier/)
      end
    end

  end
end