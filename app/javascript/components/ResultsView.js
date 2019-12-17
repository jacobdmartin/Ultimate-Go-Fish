import React from 'react'
import PropTypes from 'prop-types'

export default class ResultsView extends React.Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    results: PropTypes.array
  }

  render() {
    return (
      <React.Fragment>
        {this.resultsLoop()}
      </React.Fragment>
    )
  }

  resultsLoop() {
    return this.props.results.map(result => {
      return <p>{result.messageFor(this.props.player.name())}</p>
    })
  }
}
