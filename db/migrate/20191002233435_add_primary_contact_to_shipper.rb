class AddPrimaryContactToShipper < ActiveRecord::Migration[6.0]
  def change
    add_reference :shippers, :primary_contact, index: true
    add_foreign_key :shippers, :contacts, column: :primary_contact_id
  end
end
