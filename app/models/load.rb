class Load < ApplicationRecord
  belongs_to :carrier
  belongs_to :shipper
  has_many :contacts, as: :contactable
end
