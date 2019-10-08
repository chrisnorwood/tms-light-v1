module Api::V1
  class ContactsController < ApplicationController
    before_action :set_contact, only: [:show, :update, :destroy]

    # GET /contacts
    # GET /contacts?shipper=shipper_id
    # GET /contacts?carrier=carrier_id
    def index
      if params[:shipper]
        @contacts = current_user.contacts.where(contactable_type: 'Shipper', contactable_id: params[:shipper])
      elsif params[:carrier]
        @contacts = current_user.contacts.where(contactable_type: 'Carrier', contactable_id: params[:carrier])
      else
        @contacts = current_user.contacts.all
      end

      json_response(@contacts)
    end

    # GET /contacts/1
    def show
      json_response(@contact)
    end

    # POST /contacts
    def create
      @contact = current_user.contacts.create!(contact_params)

      json_response(@contact, :created)
    end

    # PATCH/PUT /contacts/1
    def update
      @contact.update(contact_params)
      head :no_content
    end

    # DELETE /contacts/1
    def destroy
      @contact.destroy
      head :no_content
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_contact
        @contact = current_user.contacts.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def contact_params
        params.require(:contact).permit(:name, :phone, :email, :notes, :contactable_id, :contactable_type, :user_id)
      end
  end
end