import React from 'react'
import PropTypes from 'prop-types'

class PlayerHandView extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    onSelectedCard: PropTypes.func.isRequired,
    selectedCard: PropTypes.string
  }

  game() {
    return this._game
  }

  player() {
    return this._player
  }

  render() {
    return (
      <div>
      {this._renderPlayersHand()}
      </div>
    )
  }

  _renderPlayersHand() {
    return this.props.game.players()[0].hand().map(card => {
      let className
      if (card.rank() === this.props.selectedCardRank) {
        className = "btn btn-success btn-lg btn-block"
      } else {
        className = "btn btn-light btn-lg btn-block"
      }
      return <button key={card.cssId()} className={className} onClick={() => { this.props.onSelectedCard(card) }}>{card.rank()} of {card.suit()}</button>
    })
  }

  _setAttributes(element, id, classType, type) {
    element.setAttribute("type", type)
    element.setAttribute("class", classType)
    element.setAttribute("id", id)
  }
}

export default PlayerHandView
