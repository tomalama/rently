export const login = credentials => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const query = await firestore
      .collection("users")
      .where("username", "==", credentials.username)
      .get();

    if (!query.docs.length) {
      dispatch({ type: "LOGIN_ERROR", err: "Login failed" });
    } else {
      const email = query.docs[0].data().email;

      firebase
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
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            email: newUser.email,
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            type: newUser.type,
            maxRent: newUser.maxRent,
            created: firestore.FieldValue.serverTimestamp()
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
