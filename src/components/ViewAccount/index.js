// React
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded } from "react-redux-firebase";

import "./ViewAccount.scss";
class ViewAccount extends Component {
  render() {
    const { auth, profile } = this.props;

    if (!auth.uid) return <Redirect to="/login" />;

    if (!isLoaded(profile)) {
      return <div>Loading</div>;
    }

    return (
      <div className="viewaccount-form">
        <h1 className="viewaccount-form__title">My Account</h1>
        <br />
        <form>
          <div className="viewaccount-form__card">
            <div className="viewaccount-form__header">
              <span className="header__text">Account Details</span>
            </div>
            <div className="viewaccount-form__form">
              <div className="viewaccount-form__row">
                <div className="viewaccount-form__label">Username:</div>
                <div className="viewaccount-form__input">
                  <input
                    type="text"
                    id="username"
                    disabled
                    defaultValue={profile.username}
                  />
                </div>
              </div>
              <div className="viewaccount-form__row">
                <div className="viewaccount-form__label">First Name:</div>
                <div className="viewaccount-form__input">
                  <input
                    type="text"
                    id="firstName"
                    disabled
                    defaultValue={profile.firstName}
                  />
                </div>
              </div>
              <div className="viewaccount-form__row">
                <div className="viewaccount-form__label">Last Name:</div>
                <div className="viewaccount-form__input">
                  <input
                    type="text"
                    id="lastName"
                    disabled
                    defaultValue={profile.lastName}
                  />
                </div>
              </div>
              <div className="viewaccount-form__row">
                <div className="viewaccount-form__label">Email:</div>
                <div className="viewaccount-form__input">
                  <input
                    type="email"
                    id="email"
                    disabled
                    defaultValue={profile.email}
                  />
                </div>
              </div>
              <div className="viewaccount-form__row">
                <div className="viewaccount-form__label">Type:</div>
                <div className="viewaccount-form__input">
                  <input
                    type="text"
                    id="type"
                    disabled
                    defaultValue={profile.type}
                  />
                </div>
              </div>
              {profile.type === "customer" && (
                <div className="viewaccount-form__row">
                  <div className="viewaccount-form__label">
                    Maximum Rent Per Month:
                  </div>
                  <div className="viewaccount-form__input">
                    <input
                      type="number"
                      id="maxRent"
                      disabled
                      defaultValue={profile.maxRent}
                    />
                  </div>
                </div>
              )}
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
    profile: state.firebase.profile
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ViewAccount);
