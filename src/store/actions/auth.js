import axios from "axios";

export const login = credentials => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const query = await firestore
      .collection("users")
      .where("username", "==", credentials.username)
      .get();

    if (!query.docs.length) {
      return dispatch({
        type: "LOGIN_ERROR",
        err: { message: "Login failed" }
      });
    } else {
      const email = query.docs[0].data().email;

      return firebase
        .auth()
        .signInWithEmailAndPassword(email, credentials.password)
        .then(() => {
          dispatch({ type: "LOGIN_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "LOGIN_ERROR", err });
        });
    }
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const query = await firestore
      .collection("users")
      .where("username", "==", newUser.username)
      .get();

    if (query.docs.length) {
      return dispatch({
        type: "SIGNUP_ERROR",
        err: { message: "The username already exists." }
      });
    }

    if (newUser.password.length < 5) {
      return dispatch({
        type: "SIGNUP_ERROR",
        err: {
          message: "The password must be a string with at least 6 characters."
        }
      });
    }

    const resp = await axios.post(
      "https://tomalama.lib.id/create-users-on-firebase@0.0.2/",
      {
        email: newUser.email,
        password: newUser.password
      }
    );

    if (resp.data.code) {
      return dispatch({ type: "SIGNUP_ERROR", err: resp.data });
    }

    return firestore
      .collection("users")
      .doc(resp.data)
      .set({
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        type: newUser.type,
        maxRent: newUser.maxRent,
        created: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
