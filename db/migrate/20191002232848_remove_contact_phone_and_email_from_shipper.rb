class RemoveContactPhoneAndEmailFromShipper < ActiveRecord::Migration[6.0]
  def change
    change_table :shippers do |t|
      t.remove :contact
      t.remove :phone
      t.remove :email
    end
  end
end
