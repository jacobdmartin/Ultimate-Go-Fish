import React from 'react'
import PropTypes from 'prop-types'
const pathToImages = require.context("../images", true)

export default class PlayerView extends React.Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    opponents: PropTypes.array.isRequired,
    selectedOpponent: PropTypes.string,
    onSelectedOpponent: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      player: this.props.player,
      opponents: this.props.opponents,
      selectedOpponent: this.props.selectedOpponent
    }
  }

  _renderPlayersIcon() {
    return this.props.opponents.map(player => {
      let className
      if (player === this.props.selectedOpponent) {
        className = "flex player__box--selected player__list--text"
      } else {
        className = "flex player__box player__list--text"
      }
      return (
        <img key={player.name} className={className} src={pathToImages(`./group_multiplayer_213243.png` )} onClick={() => { this.props.onSelectedOpponent(player)} } value={player.name} />
      )
    })
  }

  _renderPlayersNameButton() {
    return (
      <button key={this.props.player.name} className="btn btn-warning btn-lg" onClick={() => { this.props.onSelectedOpponent(player)} }>Ask</button>
    )
  }

  // <React.Component>
  //   <img key={player.name} className={className} src={pathToImages(`./group_multiplayer_213243.png` )} onClick={() => { this.props.onSelectedOpponent(player)} } value={player.name} />
  //   <button onClick={() => { this.props.onSelectedOpponent(player)} }>Ask</button>
  // </React.Component>

  render() {
    return (
      <React.Fragment>
        <div>
          {this._renderPlayersIcon()}
          {this._renderPlayersNameButton()}
        </div>
      </React.Fragment>
    )
  }
}
