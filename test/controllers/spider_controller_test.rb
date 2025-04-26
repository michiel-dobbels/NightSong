require "test_helper"

class SpiderControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get spider_index_url
    assert_response :success
  end
end
