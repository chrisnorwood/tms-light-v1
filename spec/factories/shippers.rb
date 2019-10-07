FactoryBot.define do
  factory :shipper do
    company_name { Faker::Company.name }
    notes { Faker::TvShows::BojackHorseman.quote }
  end
end
