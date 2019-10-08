class AddUserToLoads < ActiveRecord::Migration[6.0]
  def change
    add_reference :loads, :user, null: false, foreign_key: true
  end
end
