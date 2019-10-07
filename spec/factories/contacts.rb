FactoryBot.define do
  factory :contact do
    name { Faker::Name.name } 
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }
    notes { Faker::TvShows::BojackHorseman.quote }
    contactable { |c| c.association(:shipper) }
  end

  factory :shipper_contact do
    name { Faker::Name.name } 
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }
    notes { Faker::TvShows::BojackHorseman.quote }
    contactable { |c| c.association(:shipper) }
  end

  factory :carrier_contact do
    name { Faker::Name.name } 
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }
    notes { Faker::TvShows::BojackHorseman.quote }
    contactable { |c| c.association(:carrier) }
  end

  factory :load_contact do
    name { Faker::Name.name } 
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }
    notes { Faker::TvShows::BojackHorseman.quote }
    contactable { |c| c.association(:load) }
  end
end
