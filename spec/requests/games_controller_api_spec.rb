require 'rails_helper'

RSpec.describe GamesController, type: :request do
  describe('Game start_for') do
    let!(:game) { Game.create(name: "New Game") }
    let!(:james) { create(:user, name: 'James', password: 'examplepassword') }

    it 'shows the games' do
      game.go_fish = GoFish.new("GameName")
      game.save
      headers = {
        'CONTENT_TYPE' => 'application/json',
        "ACCEPT" => "application/json",
        "HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(james.name, "password")
      }

      get "/games/#{game.id}", :headers => headers

      expect(response).to have_http_status(200)
      expect(response.content_type).to include("application/json")
      expect(JSON.parse(response.body)).to eq({"card_deck_count"=>52, "opponent_results"=>[], "opponents"=>[], "player"=>nil, "results"=>[], "viewer_results"=>[]})
    end
  end
end
