class AddUserToShippers < ActiveRecord::Migration[6.0]
  def change
    add_reference :shippers, :user, null: false, foreign_key: true
  end
end
