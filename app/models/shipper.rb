class Shipper < ApplicationRecord
  has_many :loads
  has_many :contacts, as: :contactable
  belongs_to :primary_contact, class_name: 'Contact', foreign_key: :primary_contact_id, optional: true
end