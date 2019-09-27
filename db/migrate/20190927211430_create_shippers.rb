class CreateShippers < ActiveRecord::Migration[6.0]
  def change
    create_table :shippers do |t|
      t.string :company_name
      t.string :contact
      t.string :phone
      t.string :email
      t.text :notes

      t.timestamps
    end
  end
end
