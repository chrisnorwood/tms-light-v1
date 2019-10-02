class AddPrimaryContactToCarrier < ActiveRecord::Migration[6.0]
  def change
    add_reference :carriers, :primary_contact, index: true
    add_foreign_key :carriers, :contacts, column: :primary_contact_id
  end
end
