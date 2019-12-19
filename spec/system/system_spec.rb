require "rails_helper"

RSpec.describe 'System', type: :system, js: true do
  let(:session1) { Capybara::Session.new(:selenium_chrome, app) }
  let(:session2) { Capybara::Session.new(:selenium_chrome, app) }

  let(:user_fred) { create(:user, name: 'Fred', password: 'examplepassword')}
  let(:user_bill) { create(:user, name: 'Bill', password: 'examplepassword', password_confirmation: 'examplepassword')}

  before :each do
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

  # TODO: Why does this test pass when chrome: true, and fail when I don't set chrome: true?
  # TODO: Why does this test pass when I focus it, and fail when I don't?
  describe 'Log In', type: :system, chrome: true do
    it 'allows an existing user to login' do
      existing_user = create(:user, name: 'Caleb', password: "evenIfUd0n't")
      click_on 'Sign In'
      expect {
        fill_in 'Name', with: existing_user.name
        fill_in 'Password', with: existing_user.password
        click_on 'Log In'
      }.to_not change(User, :count)
      expect(page).to have_content('Pending Games')
    end

    it 'prevents login/signup for blank name' do
      click_on 'Sign Up'
      expect(page).to have_content 'Invalid Input'
    end
  end

  describe 'Create Game', type: :system do
    it 'expects the page to change when the user clicks the create game button' do
      sign_up("Danny", page)
      create_game("Test Game", page)
      expect(page).to have_content('Game Successfully Created')
    end
  end

  describe 'Join Game', type: :system do
    it 'expects the page to change when the user clicks the join game button' do
      sign_up("Rodgers", session1)
      create_game("Game 455", session1)

      sign_up("Steve", session2)
      session2.click_on 'Join'
      expect(session1).to have_content("Your Cards")
    end
  end

  describe 'Pusher', type: :system do
    fit 'expects the page to refresh after taking a turn' do
      game_setup
      expect(session2.body).to have_css(".card_image")
      expect(session1.body).to have_css(".card_image")
    end
  end

  def log_in(existing_user, session)
    session.click_on 'Sign In'
    session.fill_in 'user_name', with: existing_user.name
    session.fill_in 'Password', with: existing_user.password
    session.click_on 'Log In'
  end

  def sign_up(username, session)
    session.visit root_path
    session.fill_in 'user_name', with: username
    session.fill_in 'Password', with: "examplepassword"
    session.fill_in 'Password confirmation', with: "examplepassword"
    session.click_on 'Sign Up'
  end

  def create_game(name, session)
    session.click_on 'Create Game'
    session.fill_in 'Name', with: name
    session.choose('2 Players')
    session.click_on 'Create Game'
  end

  def game_setup()
    sign_up("Captain", session1)
    create_game("Game 455", session1)
    sign_up("America", session2)
    session2.click_on 'Join'
  end
end
