module Api::V1
  class CarriersController < ApplicationController
    before_action :set_carrier, only: [:show, :update, :destroy]

    # GET /carriers
    def index
      @carriers = Carrier.all

      render json: @carriers
    end

    # GET /carriers/1
    def show
      render json: @carrier
    end

    # POST /carriers
    def create
      @carrier = Carrier.new(carrier_params)

      if @carrier.save
        render json: @carrier, status: :created, location: @carrier
      else
        render json: @carrier.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /carriers/1
    def update
      if @carrier.update(carrier_params)
        render json: @carrier
      else
        render json: @carrier.errors, status: :unprocessable_entity
      end
    end

    # DELETE /carriers/1
    def destroy
      @carrier.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_carrier
        @carrier = Carrier.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def carrier_params
        params.require(:carrier).permit(:company_name, :contact, :phone, :email, :notes)
      end
  end
end
