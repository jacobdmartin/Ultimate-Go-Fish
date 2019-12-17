import PlayingCard from './PlayingCard.js'

class Player {
  constructor(json) {
    this._name = json.name
    this._hand = []
    this._books = json.books
    this.createCards(json.hand)
  }

  name() {
    return this._name
  }

  hand() {
    return this._hand
  }

  books() {
    return this._books
  }

  addCardsToHand(...cards) {
    cards.forEach(card => this.hand().push(card))
    this.checkForBooks()
  }

  hasRank(askedRank) {
    const cardsWithRank = this.hand().filter(card => card.rank() === askedRank)
    return this._trueOrFalse(cardsWithRank)
  }

  createCards(json) {
    json.forEach(card => {
      this._hand.push(new PlayingCard(card.rank, card.suit))
    })
  }
}

export default Player
