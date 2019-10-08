class User < ApplicationRecord
  has_secure_password
  has_many :contacts
  has_many :carriers
  has_many :shippers
  has_many :loads

  validates_presence_of :name, :email, :password_digest
end
