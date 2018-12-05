export const getVisitingList = (userId) => {
  return (dispatch, getState, {getFirestore}) => {

    dispatch({ type: "FETCHING_VISITING_LIST" });
    const firestore = getFirestore();
    firestore
      .collection('visiting-list')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({ type: "FETCHED_VISITING_LIST", payload: doc.data() });
        } else {
          dispatch({ type: "FETCHED_VISITING_LIST", payload: null });
        }
      }).catch((error) => {
        dispatch({ type: "ERROR_FETCHING_VISITING_LIST", error });
      });
  }
};
