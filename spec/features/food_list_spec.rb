require 'rails_helper'

describe "The very high oxalate food list" do
  it "lists very high oxalate foods" do
    visit '/lists/1'

    expect(page).to have_content(/spinach/i)
  end
end