import React from "react"
import PropTypes from "prop-types"

class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
  }

  _handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  _handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  render () {
    return (
      <React.Fragment>
        <div className="col-md-6 col-md-offset-3 form-container">
          <div className="col-md-6 col-md-offset-3">
            <h1 className="welcome">Log In</h1>
            <img className="card_picture" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/1200px-Antu_im-invisible-user.svg.png" />
            <form>
              <label className="text-white text-space">
                Name:
                <input className="form-input text-white" type="text" onChange={this._handleNameChange.bind(this)} />
              </label>
              <label className="text-white text-space">
                Password:
                <input className="form-input text-white" type="text" onChange={this._handlePasswordChange.bind(this)} />
              </label>
              <input className="page-section--button" type="submit" value="Log In"/>
            </form>
            <p className="text-white">Don't Have An Account?</p>
            <a className="page-section--button" href="/signup">Sign Up</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignIn
