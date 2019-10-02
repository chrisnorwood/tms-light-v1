class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :phone
      t.string :email
      t.text :notes
      t.references :contactable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
