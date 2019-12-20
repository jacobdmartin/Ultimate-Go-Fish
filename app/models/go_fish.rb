require_relative 'card_deck'
require_relative 'player'
require_relative 'results'
require 'json'

class GoFish
  attr_accessor :players, :current_player, :started, :cpu_arr, :results, :opponent_results, :viewer_results, :card_deck, :match_num, :name, :player_num

  def initialize(name = nil, player_num: nil, current_player: nil, card_deck: CardDeck.new, players: [], results: [], opponent_results: [], viewer_results: [], started: false)
    @name = name
    @player_num = player_num.to_i
    @card_deck = card_deck
    @players = players
    @results = results
    @opponent_results = opponent_results
    @viewer_results = viewer_results
    @current_player = current_player
    @started = started
  end

  def self.load(json)
    return nil if json.blank?
    game = GoFish.new(json["name"])
    game.game_from_values(json)
  end

  def self.dump(obj)
    obj.as_json
  end

  def game_from_values(values)
    players_to_object(values["players"])
    results_to_object(values["results"])
    deck_to_object(values["card_deck"])
    self.current_player = find_player_by_name(values["current_player"])
    player_num_to_object(values["player_num"])
    self.started = values["started"]
    self
  end

  def find_player_by_name(name)
    players.each do |player|
      return player if player.name == name
    end
    nil
  end

  def self.from_json
    GoFish.new(values["name"])
  end

  def as_json(options = {})
    {
      name: name,
      card_deck: card_deck,
      players: players,
      results: results,
      current_player: current_player&.name,
      player_num: player_num,
      started: started
    }
  end

  def state_for(player)
    {
      player: player.as_json,
      opponents: players.reject{|game_player| game_player.name == player.name },
      card_deck_count: card_deck.card_deck.count,
      results: results.map{ |result| result.message_for(player) },
      opponent_results: opponent_results,
      viewer_results: viewer_results
    }
  end

  def players_to_object(players)
    players.each do |player_hash|
      add_player(Player.from_json(player_hash))
    end
  end

  def results_to_object(results_hash)
    results_hash.each do |results|
      self.results << Results.from_json(results)
    end
  end

  def deck_to_object(deck_hash)
    self.card_deck = CardDeck.from_json(deck_hash)
  end

  def player_num_to_object(player_num_hash)
    self.player_num = player_num_hash
  end

  def add_player(player)
    players.push(player)
    return start if players.count == player_num
  end

  def empty?
    players.empty?
  end

  def find_current_player(player_name)
    players.each {|player| return player if player.name == player_name}
  end

  def deal
    deal_count.times do
      players.each {|player| player.add_cards_to_hand(card_deck.deal)}
    end
  end

  def deal_count
    players.count > 2 ? 5:7
  end

  def start
    self.started = true
    self.current_player = players[0]
    card_deck.shuffle
    deal_count
    deal
  end

  def take_turn(asking_player, asked_player, rank)
    if asking_player.no_cards? == true
      advance_player
    end
    if asked_player.has_rank?(rank)
      player_takes_card(asking_player, asked_player, rank)
    else
      player_go_fish(asking_player, asked_player, rank)
    end
  end

  def player_takes_card(asking_player, asked_player, rank)
    given_cards = asked_player.remove_cards_from_hand(rank)
    asking_player.add_players_cards_to_hand(given_cards)
    matches = asking_player.count_matches
    total_matches
    cards_left_for(asking_player)
    results << Results.new(asking_player, asked_player, rank, given_cards.count, :take_message)
  end

  def player_go_fish(asking_player, asked_player, rank)
    new_card = go_fish(asking_player)
    result = Results.new(asking_player, asked_player, rank, new_card, :fished_asked_rank_message)
    matches = asking_player.count_matches
    total_matches
    new_card_value(asking_player, asked_player, rank, new_card)
  end

  def player_fished_asked_rank(asking_player, asked_player, new_card, rank)
    if new_card.rank == rank
      self.current_player = asking_player
      matches = asking_player.count_matches
      total_matches
      results << Results.new(asking_player, asked_player, rank, new_card, :fished_asked_rank_message)
    else
      advance_player
      matches = asking_player.count_matches
      total_matches
      results << Results.new(asking_player, asked_player, rank, new_card, :go_fish_message)
    end
  end

  def total_matches
    empty_hands = 0
    if card_deck.cards_left == 0
      players.each do |player|
        if player.hand.count == 0
          empty_hands += 1
          return self.match_num = 13 if empty_hands == players.count
        end
      end
    end
  end

  def cards_left_for(player)
    if player.no_cards? == true
      if card_deck.cards_left > 0
        if card_deck.cards_left >= 5
          5.times {player.add_cards_to_hand(card_deck.deal)}
        elsif card_deck.cards_left < 5
          card_deck.cards_left.times {player.add_cards_to_hand(card_deck.deal)}
        end
      end
    end
  end

  def go_fish(player)
    if card_deck.cards_left > 0
      new_card = card_deck.deal
      player.add_cards_to_hand(new_card)
      new_card
    end
  end

  def advance_player
    current_player == players.last ? self.current_player = players[0] : self.current_player = players[players.index(current_player) + 1]
  end

  private

  def new_card_value(asking_player, asked_player, rank, new_card)
    if new_card == nil
      advance_player
    else
      if asking_player == players[0]
        self.results = []
      end
      player_fished_asked_rank(asking_player, asked_player, new_card, rank)
    end
  end
end

#players: players.map(&:as_json)
#results: results.map(&:as_json)
