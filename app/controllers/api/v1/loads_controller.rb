module Api::V1
  class LoadsController < ApplicationController
    before_action :set_load, only: [:show, :update, :destroy]

    # GET /loads
    # GET /loads?shipper=shipper_id
    # GET /loads?carrier=carrier_id
    def index
      if params[:shipper]
        @loads = Load.where(shipper_id: params[:shipper])
      elsif params[:carrier]
        @loads = Load.where(carrier_id: params[:carrier])
      else
        @loads = Load.all
      end

      json_response(@loads)
    end

    # GET /loads/:id
    def show
      json_response(@load)
    end

    # POST /loads
    def create
      @load = Load.create!(load_params)

      json_response(@load, :created)
    end

    # PATCH/PUT /loads/:id
    def update
      @load.update(load_params)
      head :no_content
    end

    # DELETE /loads/:id
    def destroy
      @load.destroy
      head :no_content
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_load
        @load = Load.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def load_params
        params.require(:load).permit(:origin, :destination, :pick_up, :delivery, :weight, :dims, :equipment, :notes, :amt_charged, :amt_paid, :complete, :shipper_id, :carrier_id)
      end
  end
end
