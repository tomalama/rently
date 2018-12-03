// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Actions
import { login } from "../../store/actions/auth";

// CSS
import styles from "./Login.module.scss";

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
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <form onSubmit={this.handleSubmit}>
            <h5 className={styles.loginTitle}>Log into rently</h5>
            <div>
              <input
                type="text"
                id="username"
                className={styles.username}
                placeholder="Username"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                className={styles.password}
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className={styles.loginButton}>Log In</button>
              <div>
                {this.state.authError && (
                  <p className={styles.errorText}>
                    {"Invalid username or password"}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
        <img
          className={styles.logo}
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
