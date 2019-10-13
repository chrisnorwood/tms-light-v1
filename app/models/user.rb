class User < ApplicationRecord
  has_secure_password
  has_many :contacts
  has_many :carriers
  has_many :shippers
  has_many :loads

  before_save { self.email = email.downcase }

  validates_presence_of :name, :email, :password, :password_confirmation
  validates :email, uniqueness: { case_sensitive: false }
end
