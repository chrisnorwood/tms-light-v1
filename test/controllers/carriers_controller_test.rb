require 'test_helper'

class CarriersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @carrier = carriers(:one)
  end

  test "should get index" do
    get carriers_url, as: :json
    assert_response :success
  end

  test "should create carrier" do
    assert_difference('Carrier.count') do
      post carriers_url, params: { carrier: { company_name: @carrier.company_name, contact: @carrier.contact, email: @carrier.email, notes: @carrier.notes, phone: @carrier.phone } }, as: :json
    end

    assert_response 201
  end

  test "should show carrier" do
    get carrier_url(@carrier), as: :json
    assert_response :success
  end

  test "should update carrier" do
    patch carrier_url(@carrier), params: { carrier: { company_name: @carrier.company_name, contact: @carrier.contact, email: @carrier.email, notes: @carrier.notes, phone: @carrier.phone } }, as: :json
    assert_response 200
  end

  test "should destroy carrier" do
    assert_difference('Carrier.count', -1) do
      delete carrier_url(@carrier), as: :json
    end

    assert_response 204
  end
end
