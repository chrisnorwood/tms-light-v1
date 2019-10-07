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

      render json: @loads
    end

    # GET /loads/1
    def show
      render json: @load
    end

    # POST /loads
    def create
      @load = Load.new(load_params)

      if @load.save
        render json: @load, status: :created, location: @load
      else
        render json: @load.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /loads/1
    def update
      if @load.update(load_params)
        render json: @load
      else
        render json: @load.errors, status: :unprocessable_entity
      end
    end

    # DELETE /loads/1
    def destroy
      @load.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_load
        @load = Load.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def load_params
        params.require(:load).permit(:origin, :destination, :pick_up, :delivery, :weight, :dims, :equipment, :notes)
      end
  end
end
