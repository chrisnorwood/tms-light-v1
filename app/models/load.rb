class Load < ApplicationRecord
  belongs_to :carrier, optional: true
  belongs_to :shipper
  has_many :contacts, as: :contactable

  validates :origin, :destination, :shipper, presence: true
end
