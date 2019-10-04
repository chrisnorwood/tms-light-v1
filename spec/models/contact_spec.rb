require 'rails_helper'

# Test suite for the Contact model
RSpec.describe Contact, type: :model do
  # Associations
  it { should belong_to(:contactable) }

  # Validations
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:phone) }
  it { should validate_presence_of(:email) }
end