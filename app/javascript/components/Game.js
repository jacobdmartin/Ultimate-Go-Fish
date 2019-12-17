import React from 'react'
import PropTypes from 'prop-types'
import PlayerView from './PlayerView.js'
import Player from '../models/Player.js'
import PlayerHand from './PlayerHand.js'
import ResultsView from './ResultsView.js'
import Results from '../models/Results.js'

export default class Game extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      game: this.props.game,
      player: new Player(this.props.game.player),
      results: new Results(this.props.game.results),
      selectedCardRank: '',
      selectedOpponent: ''
    }
  }

  buttonHandler() {
    fetch('/games/13.json').then(response => response.json()).then(data => {
      this.setState((prevState) => ({ selectedCardRank: data.selectedCardRank, selectedOpponent: data.selectedOpponent }))
    })
  }

  onSelectedCard(newCard) {
    this.setState((prevState, props) => { return { selectedCardRank: newCard.rank() } })
    this._takeTurnIfPossible()
  }

  onSelectedOpponent(opponent) {
    this.setState((prevState, props) => { return { selectedOpponent: opponent } })
    this._takeTurnIfPossible()
  }

  _takeTurnIfPossible() {
    if (this.state.selectedOpponent !== '' && this.state.selectedCardRank !== '') {
      this.props.game.takeTurn(this.props.game.currentPlayer, this.state.selectedOpponent, this.state.selectedCardRank)
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
        <div className="section">
          <div className="flex flex-row top-box">
            <ul className="player-list">
              <PlayerView player={this.state.player} opponents={this.state.game.opponents} selectedOpponent={this.state.selectedOpponent} onSelectedOpponent={this.onSelectedOpponent.bind(this)} />
            </ul>
          </div>
          <div className="result_message">
            <ResultsView player={this.state.player} results={this.state.game.results} />
          </div>
          <div>
            <PlayerHand player={this.state.player} selectedCardRank={this.selectedCardRank} onSelectedCard={this.onSelectedCard.bind(this)} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
