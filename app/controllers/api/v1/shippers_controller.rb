module Api::V1
  class ShippersController < ApplicationController
    before_action :set_shipper, only: [:show, :update, :destroy]

    # GET /shippers
    def index
      @shippers = Shipper.all

      json_response(@shippers)
    end

    # GET /shippers/:id
    def show
      json_response(@shipper)
    end

    # POST /shippers
    def create
      @shipper = Shipper.create!(shipper_params)

      json_response(@shipper, :created)
    end

    # PATCH/PUT /shippers/:id
    def update
      @shipper.update(shipper_params)
      head :no_content
    end

    # DELETE /shippers/:id
    def destroy
      @shipper.destroy
      head :no_content
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_shipper
        @shipper = Shipper.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def shipper_params
        params.require(:shipper).permit(:company_name, :notes)
      end
  end
end
