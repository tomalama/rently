import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/auth";
import * as _ from "lodash";
import { firebaseConnect, isLoaded } from "react-redux-firebase";

import styles from "./NavigationBar.module.scss";

export class NavigationBar extends Component {
  state = {
    showDropdown: false
  };
  customerDropdownLinks = [
    { title: "My Account", url: "/my-account" },
    { title: "My Visiting List", url: "/" }
  ];

  getNavbarLinks = () => {
    const { user } = this.props;
    if (!isLoaded(user)) {
      return [];
    }

    switch (user.type) {
      case "customer":
        return [{ title: "Search", url: "/" }];
      case "owner":
        return [{ title: "Search", url: "/" }];
      case "admin":
        // TODO: not sure what the links are yet
        return [];
      default:
        return [
          { title: "Search", url: "/" },
          { title: "Login", url: "/login/", class: "login" }
        ];
    }
  };

  getDropdownLinks = () => {
    const { user } = this.props;
    if (!isLoaded(user)) {
      return [];
    }

    switch (user.type) {
      case "customer":
        return [
          { title: "My Account", url: "/my-account" },
          { title: "My Visiting List", url: "/visiting-list" }
        ];
      case "owner":
        return [
          { title: "My Account", url: "/my-account" },
          { title: "My Properties", url: "/" },
          { title: "Add Property", url: "/add-property" },
          { title: "Visit History", url: "/" }
        ];
      case "admin":
        // TODO: not sure what the links are yet
        return [];
      default:
        return [];
    }
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.setState({ showDropdown: false });
  };

  signOut = () => {
    this.setState({ showDropdown: false });
    this.props.signOut();
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick, false);
  }

  render() {
    const { user, auth } = this.props;
    const { showDropdown } = this.state;

    return (
      <nav ref={node => (this.node = node)}>
        <img
          className={styles.logo}
          src={window.location.origin + "/img/logo.svg"}
          alt={"logo"}
        />
        <div className={styles.rightLinks}>
          {_.map(this.getNavbarLinks(), (link, idx) => {
            return (
              <a
                key={idx}
                className={`${styles.rightLink} ${
                  link.class ? link.class : ""
                }`}
                href={link.url}
              >
                {link.title}
              </a>
            );
          })}
          {auth.uid && user && (
            <button
              className={`${styles.rightLink} ${styles.profile}`}
              onClick={() => {
                this.setState({ showDropdown: true });
              }}
              onMouseOver={() => {
                this.setState({ showDropdown: true });
              }}
            >
              {user.firstName}
              {isLoaded(user) && (
                <img
                  className={styles.arrowDown}
                  src={window.location.origin + "/img/arrow_down.svg"}
                  alt={""}
                />
              )}
            </button>
          )}
        </div>
        {showDropdown && (
          <div className={styles.dropdown}>
            {_.map(this.getDropdownLinks(), (link, idx) => {
              return (
                <a key={idx} href={link.url}>
                  {link.title}
                </a>
              );
            })}
            <button className={styles.signout} onClick={this.signOut}>
              Sign Out
            </button>
          </div>
        )}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NavigationBar);
