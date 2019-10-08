FactoryBot.define do
  factory :contact do
    name { Faker::Name.name } 
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }
    notes { Faker::TvShows::BojackHorseman.quote }
    for_shipper
    user

    trait :for_load do
      association(:contactable, factory: :load)
    end

    trait :for_shipper do
      association(:contactable, factory: :shipper)
    end

    trait :for_carrier do
      association(:contactable, factory: :carrier)
    end
  end

  factory :shipper_contact do
    name { Faker::Name.name } 
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }
    notes { Faker::TvShows::BojackHorseman.quote }
    contactable { |c| c.association(:shipper) }
    user
  end

  factory :carrier_contact do
    name { Faker::Name.name } 
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }
    notes { Faker::TvShows::BojackHorseman.quote }
    contactable { |c| c.association(:carrier) }
    user
  end

  factory :load_contact do
    name { Faker::Name.name } 
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }
    notes { Faker::TvShows::BojackHorseman.quote }
    contactable { |c| c.association(:load) }
    user
  end
end
