import React from 'react'
import PropTypes from 'prop-types'
import PlayerView from './PlayerView.js'
import Player from '../models/Player.js'
import PlayerHand from './PlayerHand.js'
import ResultsView from './ResultsView.js'

export default class Game extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    gameId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      game: this.props.game,
      player: new Player(this.props.game.player),
      results: this.props.game.results,
      selectedCardRank: '',
      selectedOpponent: ''
    }
  }

  buttonHandler() {
    fetch(`/games/${this.props.gameId}.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ opponent: this.state.selectedOpponent, rank: this.state.selectedCardRank })
    }).then(response => response.json()).then(data => {
      const player = new Player(data.player)
      this.setState((prevState) => (
        {
          game: data,
          player: player,
          results: data.results,
          selectedCardRank: '',
          selectedOpponent: ''
        })
      )
    })
  }

  onSelectedCard(newCard) {
    this.setState((prevState, props) => { return { selectedCardRank: newCard.rank() } })
    this._takeTurnIfPossible()
  }

  onSelectedOpponent(opponent) {
    this.setState((prevState, props) => { return { selectedOpponent: opponent.name } })
    this._takeTurnIfPossible()
  }

  _takeTurnIfPossible() {
    if (this.state.selectedOpponent !== '' && this.state.selectedCardRank !== '') {
      this.buttonHandler()
    }
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
