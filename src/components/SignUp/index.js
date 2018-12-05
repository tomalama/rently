// React
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded } from "react-redux-firebase";

// Actions
import { signUp } from "../../store/actions/auth";

import "./SignUp.scss";

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    type: "customer",
    maxRent: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { auth, authError, createdAccount, profile } = this.props;

    if (isLoaded(profile)) {
      if (!auth.uid || profile.type !== "agent") return <Redirect to="/" />;
    }

    return (
      <div className="signup-form">
        <h1 className="signup-form__title">Sign Up</h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form__card">
            <div className="signup-form__header">
              <span className="header__text">Enter Details</span>
            </div>
            <div className="signup-form__form">
              <div className="signup-form__row">
                <div className="signup-form__label">Username:</div>
                <div className="signup-form__input">
                  <input
                    type="text"
                    id="username"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="signup-form__row">
                <div className="signup-form__label">Password:</div>
                <div className="signup-form__input">
                  <input
                    type="password"
                    id="password"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="signup-form__row">
                <div className="signup-form__label">First Name:</div>
                <div className="signup-form__input">
                  <input
                    type="text"
                    id="firstName"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="signup-form__row">
                <div className="signup-form__label">Last Name:</div>
                <div className="signup-form__input">
                  <input
                    type="text"
                    id="lastName"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="signup-form__row">
                <div className="signup-form__label">Email:</div>
                <div className="signup-form__input">
                  <input
                    type="email"
                    id="email"
                    required
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="signup-form__row">
                <div className="signup-form__label">Type:</div>
                <div className="signup-form__input">
                  <select id="type" onChange={this.handleChange}>
                    <option value="customer">Customer</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
              </div>
              {this.state.type === "customer" && (
                <div className="signup-form__row">
                  <div className="signup-form__label">
                    Maximum Rent per Month:
                  </div>
                  <div className="signup-form__input">
                    <input
                      type="number"
                      id="maxRent"
                      required
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              )}
              <div>
                <button className="signup-form__submit" type="submit">
                  Sign Up
                </button>
                <div>
                  {createdAccount ? (
                    <p className="success-msg">
                      Successfully created user account.
                    </p>
                  ) : authError ? (
                    <p className="error-msg">{authError}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    createdAccount: state.auth.createdAccount,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignUp);
