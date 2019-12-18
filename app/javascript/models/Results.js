class Results {
  constructor(json) {
    this.player = json.inquiring_player
    this.opponent = json.inquired_player
    this.rank = json.rank
    this.messageType = json.message_type
    this.cardCount = json.card_count
    this.fishedCard = json.fished_card
    this.message = ''
  }

  messageFor(playerName) {
    if (this.player.name() === playerName) {
      return this.renderPlayerResults()
    } else {
      return this.renderOpponentResults()
    }
  }

  renderPlayerResults() {
    if (this.messageType === "takeMessage") {
      return `You took ${this.cardCount} ${this.rank} from ${this.opponent.name()}`
    } else if (this.messageType === "goFishMessage"){
      return `You asked for a ${this.rank} from ${this.opponent.name()} but had to Go Fish`
    } else if (this.messageType === "fishedRankMessage") {
      return `You fished what you asked for! Take another turn`
    } else {
      return "Select a Card and Opponent"
    }
  }

  renderOpponentResults() {
    if (this.messageType === "takeMessage") {
      return `${this.opponent.name()} took ${this.cardCount} ${this.rank} from You`
    } else if (this.messageType === "goFishMessage"){
      return `${this.opponent.name()} asked for a ${this.rank} from You but had to Go Fish`
    } else {
      return `${this.opponent.name()} fished what they asked for, they get to take another turn`
    }
  }

  renderViewerResults(messageType, rank, cardCount, fishedCard) {
    if (messageType === "takeMessage") {
      return `${this.player.name} took ${this.cardCount} ${this.rank} from ${this.opponent}`
    } else if (messageType === "goFishMessage"){
      return `${this.player.name} asked for a ${this.rank} from ${this.opponent} but had to Go Fish`
    } else {
      return `${this.player.name} fished what they asked for, they get to take another turn`
    }
  }
}

export default Results
