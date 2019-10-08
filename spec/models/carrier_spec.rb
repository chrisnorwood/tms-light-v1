require 'rails_helper'

# Test suite for the Carrier model
RSpec.describe Carrier, type: :model do
  # Associations
  it { should belong_to(:user) }
  it { should have_many(:loads) }
  it { should have_many(:contacts) }
  it { should belong_to(:primary_contact).optional }

  # Validations
  it { should validate_presence_of(:company_name) }
end