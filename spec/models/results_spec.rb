require_relative '../../app/models/results'
require_relative '../../app/models/player'

RSpec.describe Results, type: :model do
  let(:bill) { Player.new("Bill")}
  let(:james) { Player.new("James")}
  let(:colin) { Player.new("Colin")}

  describe '#message_for' do
    it 'expects the resulted output message to be for the asked player' do
      result = Results.new(bill.name, james.name, "5", 1, "take_message")
      output_message = result.message_for(james)
      expect(output_message).to eq("Bill took 1 5 from You")
    end

    it "expects the resulted output message to be for the viewing players" do
      result = Results.new(bill.name, james.name, "5", 1, "take_message")
      output_message = result.message_for(colin)
      expect(output_message).to eq("Bill took 1 5 from James")
    end

    it 'expects the resulted output message to be for the asking player' do
      result = Results.new(bill.name, james.name, "5", 1, "take_message")
      output_message = result.message_for(bill)
      expect(output_message).to eq("You took 1 5 from James")
    end
  end
end
