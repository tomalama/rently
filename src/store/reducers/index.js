import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import searchReducer from "./search";
import authReducer from "./auth";
import propertyReducer from "./property";
import visitingListReducer from "./visitingList";

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  search: searchReducer,
  property: propertyReducer,
  visitingList: visitingListReducer,
});

export default rootReducer;
