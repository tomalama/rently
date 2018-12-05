// React
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded } from "react-redux-firebase";

class ViewAccount extends Component {
  render() {
    const { auth, profile } = this.props;

    if (!auth.uid) return <Redirect to="/login" />;

    if (!isLoaded(profile)) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>My Account</h5>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              disabled
              defaultValue={profile.username}
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              disabled
              defaultValue={profile.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              disabled
              defaultValue={profile.lastName}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              disabled
              defaultValue={profile.email}
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <input type="text" id="type" disabled defaultValue={profile.type} />
          </div>
          {profile.type === "customer" && (
            <div>
              <label htmlFor="maxRent">Maximum Rent per Month</label>
              <input
                type="number"
                id="maxRent"
                disabled
                defaultValue={profile.maxRent}
              />
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ViewAccount);
