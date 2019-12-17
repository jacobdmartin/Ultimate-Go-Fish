require 'rails_helper'

RSpec.describe GamesController, type: :request do
  describe('Game start_for') do
    let!(:game) { FactoryBot.create(:game) }
    let!(:user) { FactoryBot.create(:user) }

    it 'shows the games' do
      game.data.add_player
      headers = {
        'CONTENT_TYPE' => 'application/json',
        "ACCEPTS" => "applicaton/json",
        "HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(user.name, x)
      }

      get "/games/#{game.id}", :headers => headers

      expect(response).to have_http_status(200)
      expect(resonse.content_type).to eq("application/json")
    end
  end
end
