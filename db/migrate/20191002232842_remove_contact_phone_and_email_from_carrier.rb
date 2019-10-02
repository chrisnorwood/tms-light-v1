class RemoveContactPhoneAndEmailFromCarrier < ActiveRecord::Migration[6.0]
  def change
    change_table :carriers do |t|
      t.remove :contact
      t.remove :phone
      t.remove :email
    end
  end
end
