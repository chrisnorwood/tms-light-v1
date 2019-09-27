require 'test_helper'

class LoadsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @load = loads(:one)
  end

  test "should get index" do
    get loads_url, as: :json
    assert_response :success
  end

  test "should create load" do
    assert_difference('Load.count') do
      post loads_url, params: { load: { delivery: @load.delivery, dest_contact: @load.dest_contact, destination: @load.destination, dims: @load.dims, equipment: @load.equipment, notes: @load.notes, origin: @load.origin, pick_up: @load.pick_up, weight: @load.weight } }, as: :json
    end

    assert_response 201
  end

  test "should show load" do
    get load_url(@load), as: :json
    assert_response :success
  end

  test "should update load" do
    patch load_url(@load), params: { load: { delivery: @load.delivery, dest_contact: @load.dest_contact, destination: @load.destination, dims: @load.dims, equipment: @load.equipment, notes: @load.notes, origin: @load.origin, pick_up: @load.pick_up, weight: @load.weight } }, as: :json
    assert_response 200
  end

  test "should destroy load" do
    assert_difference('Load.count', -1) do
      delete load_url(@load), as: :json
    end

    assert_response 204
  end
end
