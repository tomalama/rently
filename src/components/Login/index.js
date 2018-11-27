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
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="wrapper">
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <h5 className="Log-into-rently">Log into rently</h5>
            <div>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>
            <div>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="login-button">Login</button>
              <div>{authError ? <p>{authError}</p> : null}</div>
            </div>
          </form>
        </div>
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
