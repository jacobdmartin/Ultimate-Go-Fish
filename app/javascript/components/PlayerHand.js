import React from 'react'
import PropTypes from 'prop-types'
const pathToCardFaces = require.context("../images/card_faces", true)

export default class PlayerHand extends React.Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    selectedCardRank: PropTypes.string,
    onSelectedCard: PropTypes.func.isRequired
  }

  player() {
    return this._player
  }

  _renderPlayersHand() {
    return this.props.player.hand().map(card => {
      let className
      if (card.rank() === this.props.selectedCardRank) {
        className = "card_image-selected"
      } else {
        className = "card_image"
      }
      return <img key={card.cssId()} className={className} src={pathToCardFaces(`./${card.imageName()}` )} onClick={() => { this.props.onSelectedCard(card) }} />
    })
  }

  _renderPlayersBooks() {
    // return this.props.player.books().map(book => {
    //   return <img className="card_image" src={`/images/card_faces/${book[0]}H.jpg`} alt={`${card.to_s}`}>
    // })
  }

  render() {
    return (
      <React.Fragment>
      <div className="flex your-hand-column">
        <p className="your-info-header">Your Cards</p>
      </div>
      <div className="flex your-hand">
        {this._renderPlayersHand()}
      </div>
      <div className="flex your-matches-column">
        <p className="your-info-header">Your Matches</p>
      </div>
      <div className="flex your-matches">
        {this._renderPlayersBooks()}
      </div>
      </React.Fragment>
    )
  }

  _setAttributes(element, id, classType, type) {
    element.setAttribute("type", type)
    element.setAttribute("class", classType)
    element.setAttribute("id", id)
  }
}
