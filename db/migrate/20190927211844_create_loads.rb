class CreateLoads < ActiveRecord::Migration[6.0]
  def change
    create_table :loads do |t|
      t.string :origin
      t.string :destination
      t.date :pick_up
      t.date :delivery
      t.string :weight
      t.string :dims
      t.string :equipment
      t.string :dest_contact
      t.text :notes

      t.timestamps
    end
  end
end
