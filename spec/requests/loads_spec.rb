require 'rails_helper'

RSpec.describe 'Loads API', type: :request do
  # initialize test data
  let(:user) { create(:user) }
  let!(:loads) { create_list(:load, 10, user: user) }
  let(:load_id) { loads.first.id }
  let(:load_shipper) { loads.first.shipper }
  let(:load_carrier) { loads.first.carrier }
  
  let!(:shippers) { create_list(:shipper, 10, user: user) }
  let(:valid_shipper_id) { shippers.first.id }

  let(:headers) { valid_headers }

  # Test suite for GET /api/v1/loads
  describe 'GET /api/v1/loads' do
    context 'when requesting all loads' do
      before { get '/api/v1/loads', params: {}, headers: headers }

      it 'returns loads' do
        expect(json).not_to be_empty
        expect(json.size).to eq(10)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when requesting shipper loads' do
      before { get "/api/v1/loads?shipper=#{load_shipper.id}", params: {}, headers: headers }

      it 'returns loads of the shipper' do
        expect(json).not_to be_empty
        expect(json[0]['shipper_id']).to eq(load_shipper.id)
        expect(json.size).to eq(1)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when requesting carrier loads' do
      before { get "/api/v1/loads?carrier=#{load_carrier.id}", params: {}, headers: headers }

      it 'returns loads of the carrier' do
        expect(json).not_to be_empty
        expect(json[0]['carrier_id']).to eq(load_carrier.id)
        expect(json.size).to eq(1)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  # Test suite for GET /api/v1/loads/:id
  describe 'GET /api/v1/loads/:id' do
    before { get "/api/v1/loads/#{load_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the load' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(load_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:load_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Load/)
      end
    end
  end

  # Test suite for POST /api/v1/loads
  describe 'POST /api/v1/loads' do
    let(:shipper) { create(:shipper) }
    # valid payload
    let(:valid_attributes) { 
      {load: { 
        origin: 'Oceanside', 
        destination: 'KY',
        shipper_id: shipper.id,
        user_id: user.id
      }}.to_json
    }

    context 'when the request is valid' do
      before { post '/api/v1/loads', params: valid_attributes, headers: headers }

      it 'creates a load' do
        expect(json['origin']).to eq('Oceanside')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/loads', params: { load: { origin: '', destination: '', user_id: user.id }}.to_json, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed/)
      end    
    end
  end

  # Test suite for PUT /api/v1/loads/:id
  describe 'PUT /api/v1/loads/:id' do
    let(:valid_attributes) { 
      {load: { 
        origin: 'Salem', 
        destination: 'KY',
        amt_charged: '1700',
        amt_paid: '1200',
        complete: false
      }}.to_json
    }

    # make HTTP get request before each example
    before { put "/api/v1/loads/#{load_id}", params: valid_attributes, headers: headers }

    context 'when the record exists' do
      it 'updates the record' do
        expect(json['origin']).to eq('Salem')
      end

      it 'returns status code 202' do
        expect(response).to have_http_status(202)
      end
    end

    context 'when the record does not exist' do
      # invalid load_id, though payload is still valid
      let(:load_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Load/)
      end
    end
  end

  # Test suite for DELETE /api/v1/loads/:id
  describe 'DELETE /api/v1/loads/:id' do
    before { delete "/api/v1/loads/#{load_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'deletes the record' do
        expect(response.body).to be_empty
      end
      
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when the record does not exist' do
      # invalid load_id
      let(:load_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
      
      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Load/)
      end
    end
  end
end