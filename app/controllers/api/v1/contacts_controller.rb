module Api::V1
  class ContactsController < ApplicationController
    before_action :set_contact, only: [:show, :update, :destroy]

    # GET /contacts
    # GET /contacts?shipper=shipper_id
    # GET /contacts?carrier=carrier_id
    def index
      if params[:shipper]
        @contacts = Contact.where(contactable_type: 'Shipper', contactable_id: params[:shipper])
      elsif params[:carrier]
        @contacts = Contact.where(contactable_type: 'Carrier', contactable_id: params[:carrier])
      else
        @contacts = Contact.all
      end

      render json: @contacts
    end

    # GET /contacts/1
    def show
      render json: @contact
    end

    # POST /contacts
    def create
      @contact = Contact.new(contact_params)

      if @contact.save
        render json: @contact, status: :created, location: @contact
      else
        render json: @contact.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /contacts/1
    def update
      if @contact.update(contact_params)
        render json: @contact
      else
        render json: @contact.errors, status: :unprocessable_entity
      end
    end

    # DELETE /contacts/1
    def destroy
      @contact.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_contact
        @contact = Contact.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def contact_params
        params.require(:contact).permit(:name, :phone, :email, :notes, :contactable_id, :contactable_type)
      end
  end
end