import React from "react"
import PropTypes from "prop-types"
import SignUp from "./SignUp.js"
import SignIn from "./SignIn.js"

class Root extends React.Component {

  signUp() {
    render (
      <SignUp />
    )
  }

  signIn() {
    render(
      <SignIn />
    )
  }

  scrollDown() {
    for(let x = 0; x < 900; x+=7) {
      window.scroll(0, x)
    }
    // window.setInterval(this.myCallback(), 750);
  }

  // myCallback() {
  //   for(let x = 0; x < 750; x+=7) {
  //     window.scroll(0, x)
  //   }
  // }

  render () {
    return (
      <React.Fragment>
        <div className="page-section">
          <p className="page-section--text">Welcome to Go Fish</p>
          <p className="page-section--small-text">Technology Meets Creativity</p>
          <button className="page-section--scroll-button" onClick={() => { this.scrollDown() } }>Get Started</button>
        </div>
        <div className="page-section">
          <p className="page-section--text" onClick={() => { this.signUp() } }>Sign Up</p>
          <p className="page-section--small-text">Get Started Playing Today</p>
          <a className="page-section--button" href="/signup">Sign Up Now</a>
        </div>
        <div className="page-section">
          <p className="page-section--text">Sign In</p>
          <p className="page-section--small-text">View Your Account and Play Some More</p>
          <a className="page-section--button" href="/login">Sign Up Now</a>
        </div>
      </React.Fragment>
    );
  }
}

export default Root
