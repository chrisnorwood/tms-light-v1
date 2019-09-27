class AddCompleteToLoad < ActiveRecord::Migration[6.0]
  def change
    add_column :loads, :complete, :boolean
  end
end
