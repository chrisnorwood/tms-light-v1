# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_07_204435) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "carriers", force: :cascade do |t|
    t.string "company_name"
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "primary_contact_id"
    t.index ["primary_contact_id"], name: "index_carriers_on_primary_contact_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "name"
    t.string "phone"
    t.string "email"
    t.text "notes"
    t.string "contactable_type", null: false
    t.bigint "contactable_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["contactable_type", "contactable_id"], name: "index_contacts_on_contactable_type_and_contactable_id"
  end

  create_table "loads", force: :cascade do |t|
    t.string "origin"
    t.string "destination"
    t.date "pick_up"
    t.date "delivery"
    t.string "weight"
    t.string "dims"
    t.string "equipment"
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "carrier_id"
    t.bigint "shipper_id", null: false
    t.decimal "amt_charged"
    t.decimal "amt_paid"
    t.boolean "complete"
    t.index ["carrier_id"], name: "index_loads_on_carrier_id"
    t.index ["shipper_id"], name: "index_loads_on_shipper_id"
  end

  create_table "shippers", force: :cascade do |t|
    t.string "company_name"
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "primary_contact_id"
    t.index ["primary_contact_id"], name: "index_shippers_on_primary_contact_id"
  end

  add_foreign_key "carriers", "contacts", column: "primary_contact_id"
  add_foreign_key "loads", "carriers"
  add_foreign_key "loads", "shippers"
  add_foreign_key "shippers", "contacts", column: "primary_contact_id"
end
