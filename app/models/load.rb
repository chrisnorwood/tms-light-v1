class Load < ApplicationRecord
  belongs_to :carrier
  belongs_to :shipper
end
