require 'rails_helper'

# Test suite for the Load model
RSpec.describe Load, type: :model do
  # Associations
  it { should belong_to(:user) }
  it { should belong_to(:shipper) }
  it { should belong_to(:carrier).optional }
  it { should have_many(:contacts) }

  # Validations
  it { should validate_presence_of(:origin) }
  it { should validate_presence_of(:destination) }
  it { should validate_presence_of(:shipper) }
end