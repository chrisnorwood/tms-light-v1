module Api::V1
  class CarriersController < ApplicationController
    before_action :set_carrier, only: [:show, :update, :destroy]

    # GET /carriers
    def index
      @carriers = Carrier.all
      
      json_response(@carriers)
    end

    # GET /carriers/:id
    def show
      json_response(@carrier)
    end

    # POST /carriers
    def create
      @carrier = Carrier.create!(carrier_params)

      json_response(@carrier, :created)
    end

    # PATCH/PUT /carriers/:id
    def update
      @carrier.update(carrier_params)
      head :no_content
    end

    # DELETE /carriers/1
    def destroy
      @carrier.destroy
      head :no_content
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_carrier
        @carrier = Carrier.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def carrier_params
        params.require(:carrier).permit(:company_name, :notes)
      end
  end
end
