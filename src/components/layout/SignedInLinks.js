// React
import React from "react";
// import { NavLink } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Actions
import { signOut } from "../../store/actions/auth";

const SignedInLinks = props => {
  return (
    <div>
      <ul>
        <li>
          <a href="/" onClick={props.signOut}>
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
