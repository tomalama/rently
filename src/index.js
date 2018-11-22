// React
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "./config";

// App
import App from "./containers/App";
import rootReducer from "./store/reducers";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(firebase, {
      userProfile: "users",
      useFirestoreForProfile: true,
      attachAuthIsReady: true
    }),
    reduxFirestore(firebase) // redux bindings for firestore
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  serviceWorker.unregister();
});
