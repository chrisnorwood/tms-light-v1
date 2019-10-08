FactoryBot.define do
  factory :load do
    origin { Faker::Address.full_address }
    destination { Faker::Address.full_address }
    pick_up { (Date.today-rand(7)).to_s }
    delivery { (Date.today+rand(7)).to_s }
    weight { Random.new.rand(5000..40000).round(-3) }
    dims { "6x3x2" }
    equipment { "Van" }
    notes { Faker::TvShows::BojackHorseman.quote }
    carrier_id { Random.new.rand(1..5) }
    shipper_id { Random.new.rand(1..5) }
    amt_charged { Random.new.rand(1750..2200).round(-2) }
    amt_paid { Random.new.rand(500..1500).round(-2) }
    complete { false }
    shipper
    carrier
    user
  end
end
