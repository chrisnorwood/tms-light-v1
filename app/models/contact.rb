class Contact < ApplicationRecord
  belongs_to :contactable, polymorphic: true

  validates :name, :phone, :email, presence: true
end
