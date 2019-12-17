require "rails_helper"

RSpec.describe 'System', type: :system do
  let(:session1) { Capybara::Session.new(:selenium_chrome_headless, app) }
  let(:session2) { Capybara::Session.new(:selenium_chrome_headless, app) }

  let(:user_fred) { create(:user, name: 'Fred', password: 'examplepassword')}
  let(:user_bill) { create(:user, name: 'Bill', password: 'examplepassword', password_confirmation: 'examplepassword')}

  before :each do
    session1 = Capybara::Session.new(:selenium_chrome_headless, app)
    session2 = Capybara::Session.new(:selenium_chrome_headless, app)
    visit root_path
  end

  describe 'Sign Up', type: :system do
    it 'allows a new user to sign up' do
      expect {
        fill_in 'Name', with: 'Caleb'
        fill_in 'Password', with: "evenIfUd0n't"
        fill_in 'Password confirmation', with: "evenIfUd0n't"
        click_on 'Sign Up'
      }.to change(User, :count).by(1)
      expect(page).to have_content 'Pending Games'
    end
  end

  describe 'Log In', type: :system do
    it 'allows an existing user to login' do
      existing_user = create(:user, name: 'Caleb', password: "evenIfUd0n't")
      click_on 'Sign In'
      expect {
        fill_in 'Name', with: 'Caleb'
        fill_in 'Password', with: "evenIfUd0n't"
        click_on 'Log In'
      }.to_not change(User, :count)
      expect(page).to have_content('Pending Games')
    end

    it 'prevents login for blank name' do
      click_on 'Sign Up'
      expect(page).to have_content 'Invalid Input'
    end
  end

  describe 'Create Game', type: :system do
    it 'expects the page to change when the user clicks the create game button' do
      fill_in 'Name', with: 'Caleb'
      fill_in 'Password', with: "examplepassword"
      fill_in 'Password confirmation', with: "examplepassword"
      click_on 'Sign Up'
      click_on 'Create Game'
      expect(page).to have_content('Name')
    end
  end

  describe 'Join Game', type: :system do
    it 'expects the page to change when the user clicks the join game button' do
      log_in(user_fred, session1)
      create_game("Test Game", session1)
      log_in(user_bill, session2)

      expect(session1).to have_content("Bill")
      expect(session1).to have_content("Your Cards")
    end
  end

  describe 'Spectate Game', type: :system do
    # it 'expects the page to change when the user clicks the spectate game button' do
    #   fill_in 'Name', with: 'Caleb'
    #   fill_in 'Password', with: "examplepassword"
    #   fill_in 'Password confirmation', with: "examplepassword"
    #   click_on 'Sign Up'
    #   click_on 'spectate'
    #   expect(page.body).to have_content("You are spectating the game")
    # end
  end

  def log_in(existing_user, session)
    session.visit login_path
    session.fill_in 'Name', with: existing_user.name
    session.fill_in 'Password', with: existing_user.password
    session.click_on 'Log In'
  end

  def create_game(name, session)
    session.click_on 'Create Game'
    session.fill_in 'Name', with: name
    session1.choose('2 Players')
    session.click_on 'Create Game'
  end
end
