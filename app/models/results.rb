require_relative 'player'
require_relative 'go_fish'
require 'pry'

class Results
  attr_reader :game, :take_message
  attr_accessor :inquiring_player, :inquired_player, :rank, :card_count, :fished_card, :message_type, :asking_results, :asked_results, :viewer_results

  def initialize(inquiring_player, inquired_player, rank, card_count = nil, fished_card = nil, message_type)
    @inquiring_player = inquiring_player
    @inquired_player = inquired_player
    @rank = rank
    @card_count = card_count
    @fished_card = fished_card
    @message_type = message_type
  end

  def self.from_json(results_hash)
    return nil if results_hash.blank?
    Results.new(results_hash["inquiring_player"]["name"], results_hash["inquired_player"]["name"], results_hash["rank"], results_hash["card_count"], results_hash["fished_card"], results_hash["message_type"])
  end

  def message_for(player)
    if inquiring_player == player.name
      inquiring_player_message(message_type, rank, card_count, fished_card)
    elsif inquired_player == player.name
      inquired_player_message(message_type, rank, card_count, fished_card)
    else
      viewer_message(message_type, rank, card_count, fished_card)
    end
  end

  def inquiring_player_message(message_type, rank, card_count, fished_card)
    if message_type == "take_message"
      "You took #{card_count} #{rank} from #{inquired_player}"
    elsif message_type == "go_fish_message"
      "You asked for a #{rank} from #{inquired_player} but had to Go Fish"
    else
      "You fished what you asked for! Take another turn"
    end
  end

  def inquired_player_message(message_type, rank, card_count, fished_card)
    if message_type == "take_message"
      "#{inquiring_player} took #{card_count} #{rank} from You"
    elsif message_type == "go_fish_message"
      "#{inquiring_player} asked for a #{rank} from You but had to Go Fish"
    else
      "#{inquiring_player} fished what they asked for, they get to take another turn"
    end
  end

  def viewer_message(message_type, rank, card_count, fished_card)
    if message_type == "take_message"
      "#{inquiring_player} took #{card_count} #{rank} from #{inquired_player}"
    elsif message_type == "go_fish_message"
      "#{inquiring_player} asked for a #{rank} from #{inquired_player} but had to Go Fish"
    else
      "#{inquiring_player} fished what they asked for, they get to take another turn"
    end
  end
end

#and found a #{fished_card.rank} of #{fished_card.suit}
