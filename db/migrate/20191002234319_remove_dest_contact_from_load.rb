class RemoveDestContactFromLoad < ActiveRecord::Migration[6.0]
  def change
    change_table :loads do |t|
      t.remove :dest_contact
    end
  end
end
