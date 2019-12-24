require "rails_helper"

RSpec.describe 'System', type: :system, js: true do
  let(:user_fred) { create(:user, name: 'Fred', password: 'examplepassword')}
  let(:user_bill) { create(:user, name: 'Bill', password: 'examplepassword', password_confirmation: 'examplepassword')}

  before :each do
    visit root_path
  end

  describe 'Sign Up' do
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

  describe 'Log In' do
    it 'allows an existing user to login' do
      existing_user = create(:user, name: 'Jake', password: "evenIfUd0n't")
      visit root_path
      click_on 'Sign In'
      expect(page).to have_css("h1", text: "Sign In")
      fill_in 'Name', with: existing_user.name
      fill_in 'Password', with: existing_user.password
      click_on 'Log In'
      expect(page).to have_content('Pending Games')
    end

    it 'prevents login/signup for blank name' do
      click_on 'Sign Up'
      expect(page).to have_content 'Invalid Input'
    end
  end

  describe 'Create Game' do
    it 'expects the page to change when the user clicks the create game button' do
      sign_up("Danny", page)
      create_game("Test Game", page)
      expect(page).to have_content('Game Successfully Created')
    end
  end

  describe 'Join Game' do
    let(:session1) { Capybara::Session.new(:selenium_chrome_headless, app) }
    let(:session2) { Capybara::Session.new(:selenium_chrome_headless, app) }

    it 'expects the page to change when the user clicks the join game button' do
      sign_up("Rodgers", session1)
      create_game("Game 455", session1)

      sign_up("Steve", session2)
      session2.click_on 'Join'
      expect(session1).to have_content("Your Cards")
    end
  end

  describe 'Pusher' do
    let(:session1) { Capybara::Session.new(:selenium_chrome, app) }
    let(:session2) { Capybara::Session.new(:selenium_chrome, app) }

    it 'expects the page to refresh after taking a turn' do
      game_setup
      expect(session2.body).to have_css(".card_image")
      expect(session1.body).to have_css(".card_image")
    end
  end

  def log_in(user, session)
    session.click_on 'Sign In'
    session.fill_in 'user_name', with: user.name
    session.fill_in 'Password', with: user.password
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
    sign_up("Jansen", session1)
    create_game("Game 455", session1)
    sign_up("Veronica", session2)
    session2.click_on 'Join'
  end
end
