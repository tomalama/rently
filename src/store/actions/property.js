export const addProperty = newProperty => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('properties')
      .add(newProperty)
      .then((docRef) => {
        console.log(`New Property added with ID: ${docRef.id}`);
      })
      .catch((error) => {
        console.log(`Error adding Property: ${error}`);
      });
  } 
};
