import React from 'react'
import PropTypes from 'prop-types'

export default class Game extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  constructor(props) {
    super()
    this.state = {
      this.message: this.props.message
    }
  }

  render() {
    return (
      <React.Fragment>
        <button onClick=buttonHandler() className="btn">Demo Button</button>
        <p>{this.state.message}</p>
      </React.Fragment>
    )
  }
}
