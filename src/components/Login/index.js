// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Actions
import { login } from "../../store/actions/auth";

// CSS
import "./Login.scss";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    // Prevent nav
    e.preventDefault();

    if (!this.state.username && !this.state.password) {
      this.setState({
        authError: "Invalid username or password"
      });
    } else {
      this.props.login(this.state);
    }
  };

  componentDidMount = () => {
    const { authError, auth } = this.props;
    this.setState({
      authError,
      auth
    });
  };

  render() {
    if (this.state.auth && this.state.auth.uid) return <Redirect to="/" />;
    return (
      <div className="wrapper">
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <h5 className="Log-into-rently">Log into rently</h5>
            <div>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="login-button">Log In</button>
              <div>
                {this.state.authError && (
                  <p className="error-text">{"Invalid username or password"}</p>
                )}
              </div>
            </div>
          </form>
        </div>
        <img
          className="logo"
          src={window.location.origin + "/img/logo.svg"}
          alt={"logo"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
