class Contact < ApplicationRecord
  belongs_to :user
  belongs_to :contactable, polymorphic: true

  validates :name, :phone, :email, presence: true
end
