class RemoveNullDbConstraintForCarrierIdOnLoads < ActiveRecord::Migration[6.0]
  def change
    change_column_null :loads, :carrier_id, true
  end
end
