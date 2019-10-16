FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "email#{n}#{rand(200).to_s}#{rand(200).to_s}@factory.com"
    end

    name { Faker::Name.name }
    password { 'foobar' }
    password_confirmation { 'foobar' }
  end
end
