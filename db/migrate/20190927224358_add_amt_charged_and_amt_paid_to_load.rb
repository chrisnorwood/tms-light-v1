class AddAmtChargedAndAmtPaidToLoad < ActiveRecord::Migration[6.0]
  def change
    add_column :loads, :amt_charged, :decimal
    add_column :loads, :amt_paid, :decimal
  end
end
