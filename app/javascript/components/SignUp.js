import React from "react"
import PropTypes from "prop-types"

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      password_confirmation: ''
    }
  }

  // const background = {
  //   backgroundImage: 'url(https://hawaiioceanphotography.com/wp-content/uploads/2019/06/Underwater-dreams-small.jpeg)',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover'
  // }

  // componentDidMount() {
  //   document.body.style = { background }
  // }

  _handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  _handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  _handlePasswordConfirmationChange(event) {
    this.setState({ password_confirmation: event.target.value })
  }

  render () {
    return (
      <React.Fragment>
        <div className="col-md-6 col-md-offset-3 form-container">
          <div className="col-md-6 col-md-offset-3">
            <h1 className="welcome">Create Account</h1>
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
              <label className="text-white text-space">
                Password Confirmation:
                <input className="form-input text-white" type="text" onChange={this._handlePasswordConfirmationChange.bind(this)} />
              </label>
              <input className="page-section--button" type="submit" value="Sign Up"/>
            </form>
            <p className="text-white">Already Have An Account?</p>
            <a className="page-section--button" href="/login">Sign In</a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp
