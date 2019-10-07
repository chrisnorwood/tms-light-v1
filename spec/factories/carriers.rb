FactoryBot.define do
  factory :carrier do
    company_name { Faker::Company.name }
    notes { Faker::TvShows::BojackHorseman.quote }
  end
end
