require 'rails_helper'

RSpec.describe User, type: :model do
  # associations
  it { should have_many(:contacts) }
  it { should have_many(:shippers) }
  it { should have_many(:carriers) }
  it { should have_many(:loads) }
  
  # validations
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
end
