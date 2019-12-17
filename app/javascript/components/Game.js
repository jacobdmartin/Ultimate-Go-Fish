import React from 'react'
import PropTypes from 'prop-types'
import Player from './Player.js'

export default class Game extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      game: this.props.game,
      player: new Player(this.props.game.player),
      selectedCardRank: '',
      selectedOpponent: ''
    }
  }

  buttonHandler() {
    fetch('/games/13.json').then(response => response.json()).then(data => {
      this.setState((prevState) => ({ player: data.player, opponents: data.opponents }))
    })
  }

  selectedCard(newCard) {
    this.setState((prevState, props) => { return { selectedCardRank: newCard.rank() } })
    this._takeTurnIfPossible()
  }

  selectedOpponent(opponent) {
    this.setState((prevState, props) => { return { selectedOpponent: opponent } })
    this._takeTurnIfPossible()
  }

  _takeTurnIfPossible() {
    if (this.state.selectedOpponent !== '' && this.state.selectedCardRank !== '') {
      this.props.game.takeTurn(this.props.game.currentPlayer(), this.state.selectedOpponent, this.state.selectedCardRank)
    }
  }

  _setAttributes(element, id, classType, type) {
    element.setAttribute("type", type)
    element.setAttribute("class", classType)
    element.setAttribute("id", id)
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.buttonHandler.bind(this)} className="btn">Button</button>
        <div className="section">
          <div className="flex flex-row top-box">
            <ul className="player-list">
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
