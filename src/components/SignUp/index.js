// React
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded } from "react-redux-firebase";

// Actions
import { signUp } from "../../store/actions/auth";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>Sign Up</h5>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <select id="type" onChange={this.handleChange}>
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          {this.state.type === "customer" && (
            <div>
              <label htmlFor="maxRent">Maximum Rent per Month</label>
              <input type="number" id="maxRent" onChange={this.handleChange} />
            </div>
          )}
          <div>
            <button>Sign Up</button>
            <div>
              {createdAccount ? (
                <p>Nice</p>
              ) : authError ? (
                <p>{authError}</p>
              ) : null}
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
