class AddCarrierAndShipperToLoad < ActiveRecord::Migration[6.0]
  def change
    add_reference :loads, :carrier, null: false, foreign_key: true
    add_reference :loads, :shipper, null: false, foreign_key: true
  end
end
