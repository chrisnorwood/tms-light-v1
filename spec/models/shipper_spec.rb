require 'rails_helper'

# Test suite for the Shipper model
RSpec.describe Shipper, type: :model do
  # Associations
  it { should have_many(:loads) }
  it { should have_many(:contacts) }
  it { should belong_to(:primary_contact).optional }

  # Validations
  it { should validate_presence_of(:company_name) }
end