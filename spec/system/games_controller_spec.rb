require 'rails_helper'

RSpec.describe GamesController, type: :system do

  before :each do
    session = Capybara::Session.new(:selenium_chrome_headless, app)
    visit root_path
  end

  describe "GET #show" do
    it "should get the show page with the correct data in the data-react-class", js: true do
      fill_in 'Name', with: 'Jake'
      fill_in 'Password', with: "examplepassword"
      fill_in 'Password confirmation', with: "examplepassword"
      click_on 'Sign Up'
      click_on 'Create Game'
      fill_in 'Name', with: 'Test Game'
      click_on 'Create Game'
      expect(page).to have_content("Game Successfully Created")
    end
  end

end
