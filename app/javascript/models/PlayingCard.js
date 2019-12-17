class PlayingCard {
  constructor(rank, suit) {
    this._rank = rank
    this._suit = suit
  }

  rank() {
    return this._rank
  }

  suit() {
    return this._suit
  }

  value() {
    if (this._rank[0] === "J") {
      return 11
    } else if (this._rank[0] === "Q") {
      return 12
    } else if (this._rank[0] === "K") {
      return 13
    } else if (this._rank[0] === "A") {
      return 14
    } else {
      return parseInt(this.rank())
    }
  }

  to_s() {
    return `${this.rank()} of ${this.suit()}`
  }

  cssId() {
    return `${this.rank()}-${this.suit()}`
  }
}

export default PlayingCard
