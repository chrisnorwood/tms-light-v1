require 'rails_helper'

RSpec.describe 'Contacts API', type: :request do
  # initialize test data
  let(:user) { create(:user) }
  let!(:contacts) { create_list(:contact, 10, user: user) }
  let!(:shippers) { create_list(:shipper, 10, user: user) }
  let(:valid_shipper_id) { shippers.first.id }
  let(:contact_id) { contacts.first.id }
  let(:contact_shipper_id) { contacts.first.contactable.id }
  let(:headers) { valid_headers }

  # Test suite for GET /api/v1/contacts
  describe 'GET /api/v1/contacts' do
    context 'when requesting all contacts' do
      before { get '/api/v1/contacts', params: {}, headers: headers }

      it 'returns contacts' do
        # `json` is custom helper to parse JSON into ruby hash
        expect(json).not_to be_empty
        expect(json.size).to eq(10)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when requesting shipper contacts' do
      before { get "/api/v1/contacts?shipper=#{contact_shipper_id}", params: {}, headers: headers }

      
      it 'returns contacts of the shipper' do
        # `json` is custom helper to parse JSON into ruby hash
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when requesting carrier contacts' do
      let!(:contact) { create(:contact, :for_carrier) }
      before { get "/api/v1/contacts?carrier=#{contact.contactable.id}", params: {}, headers: headers }

      # THIS TEST WON'T RUN WITHOUT BETTER FIXTURES
      # it 'returns contacts of the carrier' do
      #   # `json` is custom helper to parse JSON into ruby hash
      #   expect(json).not_to be_empty
      #   expect(json.size).to eq(1)
      # end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  # Test suite for GET /api/v1/contacts/:id
  describe 'GET /api/v1/contacts/:id' do
    # make HTTP get request before each example
    before { get "/api/v1/contacts/#{contact_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the contact' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(contact_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:contact_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Contact/)
      end
    end
  end

  # Test suite for POST /api/v1/contacts
  describe 'POST /api/v1/contacts' do
    # valid payload
    let(:valid_attributes) { 
      { contact: 
        { name: 'John Doe', phone: '1234567890', email: 'john@doe.net', contactable_type: 'Shipper', contactable_id: valid_shipper_id, user_id: user.id }
      }.to_json
    }

    context 'when the request is valid' do
      before { post '/api/v1/contacts', params: valid_attributes, headers: headers }

      it 'creates a contact' do
        expect(json['name']).to eq('John Doe')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/contacts', params: { contact: { name: '' }}.to_json, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed/)
      end    
    end
  end

  # Test suite for PUT /api/v1/contacts/:id
  describe 'PUT /api/v1/contacts/:id' do
    # valid payload
    let(:valid_attributes) { 
      { contact: 
        { name: 'John Doob', phone: '1234567890', email: 'john@doe.net', contactable_type: 'Shipper', contactable_id: valid_shipper_id }
      }.to_json
    }

    # make HTTP get request before each example
    before { put "/api/v1/contacts/#{contact_id}", params: valid_attributes, headers: headers }

    context 'when the record exists' do
      it 'updates the record' do
        expect(json['name']).to eq('John Doob')
      end

      it 'returns status code 202' do
        expect(response).to have_http_status(202)
      end
    end

    context 'when the record does not exist' do
      # invalid contact_id, though payload is still valid
      let(:contact_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Contact/)
      end
    end
  end

  # Test suite for DELETE /api/v1/contacts/:id
  describe 'DELETE /api/v1/contacts/:id' do
    before { delete "/api/v1/contacts/#{contact_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'deletes the record' do
        expect(response.body).to be_empty
      end
      
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when the record does not exist' do
      # invalid contact_id
      let(:contact_id) { 696969 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
      
      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Contact/)
      end
    end
  end

end