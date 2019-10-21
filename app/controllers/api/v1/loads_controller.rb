module Api::V1
  class LoadsController < ApplicationController
    before_action :set_load, only: [:show, :update, :destroy]

    # GET /loads
    # GET /loads?shipper=shipper_id
    # GET /loads?carrier=carrier_id
    def index
      if params[:shipper]
        @loads = current_user.loads.where(shipper_id: params[:shipper])
      elsif params[:carrier]
        @loads = current_user.loads.where(carrier_id: params[:carrier])
      else
        @loads = current_user.loads.all
      end

      json_response(@loads)
    end

    # GET /loads/:id
    def show
      json_response(@load)
    end

    # POST /loads
    def create
      @load = current_user.loads.create!(load_params)

      json_response(@load, :created)
    end

    # PATCH/PUT /loads/:id
    def update
      @load.update(load_params)
      
      json_response(@load, :accepted)
    end

    # DELETE /loads/:id
    def destroy
      @load.destroy
      head :no_content
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_load
        @load = current_user.loads.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def load_params
        params.require(:load).permit(:origin, :destination, :pick_up, :delivery, :weight, :dims, :equipment, :notes, :amt_charged, :amt_paid, :complete, :shipper_id, :carrier_id, :user_id)
      end
  end
end
