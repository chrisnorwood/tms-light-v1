require 'rails_helper'

RSpec.describe 'Shippers API', type: :request do
  # initialize test data
  let(:user) { create(:user) }
  let!(:shippers) { create_list(:shipper, 10, user: user) }
  let(:shipper_id) { shippers.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /api/v1/shippers
  describe 'GET /api/v1/shippers' do
    # make HTTP get request before each example
    before { get '/api/v1/shippers', params: {}, headers: headers }

    it 'returns shippers' do
      # `json` is custom helper to parse JSON into ruby hash
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /api/v1/shippers/:id
  describe 'GET /api/v1/shippers/:id' do
    # make HTTP get request before each example
    before { get "/api/v1/shippers/#{shipper_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the shipper' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(shipper_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:shipper_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Shipper/)
      end
    end
  end

  # Test suite for POST /api/v1/shippers
  describe 'POST /api/v1/shippers' do
    # valid payload
    let(:valid_attributes) { {shipper: { company_name: 'Company, Inc.', notes: 'Lorem ipsum and such', user_id: user.id }}.to_json }

    context 'when the request is valid' do
      before { post '/api/v1/shippers', params: valid_attributes, headers: headers }

      it 'creates a shipper' do
        expect(json['company_name']).to eq('Company, Inc.')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/shippers', params: { shipper: { company_name: '', user_id: user.id }}.to_json, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Company name can't be blank/)
      end    
    end
  end

  # Test suite for PUT /api/v1/shippers/:id
  describe 'PUT /api/v1/shippers/:id' do
    # valid payload
    let(:valid_attributes) { {shipper: { company_name: 'Company, LLC', notes: 'Lorem ipsum and such' }}.to_json }

    # make HTTP get request before each example
    before { put "/api/v1/shippers/#{shipper_id}", params: valid_attributes, headers: headers }

    context 'when the record exists' do
      it 'updates the record' do
        expect(json['company_name']).to eq('Company, LLC')
      end

      it 'returns status code 202' do
        expect(response).to have_http_status(202)
      end
    end

    context 'when the record does not exist' do
      # invalid shipper_id, though payload is still valid
      let(:shipper_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Shipper/)
      end
    end
  end

  # Test suite for DELETE /api/v1/shippers/:id
  describe 'DELETE /api/v1/shippers/:id' do
    before { delete "/api/v1/shippers/#{shipper_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'deletes the record' do
        expect(response.body).to be_empty
      end
      
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when the record does not exist' do
      # invalid shipper_id
      let(:shipper_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
      
      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Shipper/)
      end
    end
  end
end