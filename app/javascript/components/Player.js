import React from 'react'
import PropTypes from 'prop-types'

export default class Player extends React.Component {
  static propTypes = {
    player: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      player: this.props.player
    }
  }
}
