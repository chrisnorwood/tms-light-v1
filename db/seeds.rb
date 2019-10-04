# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

5.times do
  Carrier.create(
    company_name: Faker::Company.name,
    notes: Faker::TvShows::BojackHorseman.quote
  )  
end

5.times do
  Shipper.create(
    company_name: Faker::Company.name,
    notes: Faker::TvShows::BojackHorseman.quote
  )  
end

10.times do
  Load.create(
    origin: Faker::Address.full_address,
    destination: Faker::Address.full_address,
    pick_up: (Date.today-rand(7)).to_s,
    delivery: (Date.today+rand(7)).to_s,
    weight: Random.new.rand(5000..40000).round(-3),
    dims: "6x3x2",
    equipment: "Van",
    notes: Faker::TvShows::BojackHorseman.quote,
    carrier_id: Random.new.rand(1..5),
    shipper_id: Random.new.rand(1..5),
    amt_charged: Random.new.rand(1750..2200).round(-2),
    amt_paid: Random.new.rand(500..1500).round(-2),
    complete: false
  )
end

10.times do
  Contact.create(
    name: Faker::Name.name,
    phone: Faker::PhoneNumber.phone_number,
    email: Faker::Internet.email,
    notes: Faker::TvShows::BojackHorseman.quote,
    contactable: Shipper.order('RANDOM()').first 
  )  
end

10.times do
  Contact.create(
    name: Faker::Name.name,
    phone: Faker::PhoneNumber.phone_number,
    email: Faker::Internet.email,
    notes: Faker::TvShows::BojackHorseman.quote,
    contactable: Carrier.order('RANDOM()').first
  )  
end