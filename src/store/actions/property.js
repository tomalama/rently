import _ from 'lodash';
import firebase from 'firebase';
const storageRef = firebase.storage().ref();

export const addToVisitingList = (userId, profile, propertyId) => {
  return (dispatch, getState, { getFirestore }) => {

    //pre checks
    if (profile.type !== 'customer') {
      return dispatch({
        type: 'ADD_TO_VISITING_LIST_ERROR',
        err: {
          message: 'cannot add to visiting list if you are not a customer'
        }
      });
    }
    if (!(userId && typeof(userId) === 'string' && userId.length > 0)) {
      return dispatch({
        type: 'ADD_TO_VISITING_LIST_ERROR',
        err: {
          message: 'userId needs to be a non-null string which is not empty'
        }
      });
    }

    const firestore = getFirestore();

    firestore
      .collection('visiting-list')
      .doc(userId)
      .get()
      .then(query => {

        const result = query.data();
        if (result) {

          if (propertyId && !result.data.find(val => val === propertyId)) {

            result.data.push(propertyId)

            firestore
            .collection('visiting-list')
            .doc(userId)
            .set({
              data: result.data
            })
            .then(() => dispatch({
              type: 'ADD_TO_VISITING_LIST_SUCCESS',
              payload: {
                message: 'Successfully updated the visiting list'
              }
            }))
            .catch(e => dispatch({
              type: 'ADD_TO_VISITING_LIST_ERROR',
              err: {
                error: e,
                message: 'Unknown error setting the visiting list data'
              }
            }))
          }

        } else {

          firestore
            .collection('visiting-list')
            .doc(userId)
            .set({
              data: propertyId ? [propertyId] : []
            })
            .then(() => dispatch({
              type: 'ADD_TO_VISITING_LIST_SUCCESS',
              payload: {
                message: 'Successfully updated the visiting list'
              }
            }))
            .catch(e => dispatch({
              type: 'ADD_TO_VISITING_LIST_ERROR',
              err: {
                error: e,
                message: 'Unknown error setting the visiting list data'
              }
            }))
        }
      })
      .catch(e => dispatch({
        type: 'ADD_TO_VISITING_LIST_ERROR',
        err: {
          error: e,
          message: 'Unknown error fetching the visiting list'
        }
      }))
  }
}

export const getProperty = (propertyId) => {
  return (dispatch, getState, {getFirestore}) => {

    dispatch({ type: "FETCHING_PROPERTY" });
    const firestore = getFirestore();
    firestore
      .collection('properties')
      .doc(propertyId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({ type: "FETCHED_PROPERTY", payload: doc.data() });
        } else {
          dispatch({ type: "FETCHED_PROPERTY", payload: null });
        }
      }).catch((error) => {
        dispatch({ type: "ERROR_FETCHING_PROPERTY", error });
      });
  }
};

export const addProperty = newProperty => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    // Trim the unnecessary fields from the PropertyForm state object
    const images = newProperty.images;
    let trimmedProperty = _.omit(newProperty, ['imagePreviews', 'images', 'validInputs', 'invalidInputs', 'error', 'imageError', 'selectedImageIndex', 'success']);
    trimmedProperty.rent = parseInt(trimmedProperty.rent);

    firestore
      .collection('properties')
      .add(trimmedProperty)
      .then((docRef) => {
        console.log(`New Property added with ID: ${docRef.id}`);
        // Prepare the image files for uploading
        const metadata = {
          contentType: 'image/jpeg',
        };

        let imageURLs = [];

        images.forEach((image) => {
          let uploadTask = storageRef.child('images/' + docRef.id + '/' + image.name).put(image, metadata);

          uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
              default:
                break;
            }
          }, (error) => {
            console.log(error);
          }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              imageURLs.push(downloadURL);
              firestore
                .collection('properties')
                .doc(docRef.id)
                .set({ imageURLs }, { merge: true })
            });
          });
        });
      })
      .catch((error) => {
        console.log(`Error adding Property: ${error}`);
      });
  }
};

export const updateProperty = (newProperty, callback) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    // Trim the unnecessary fields from the PropertyForm state object
    const images = newProperty.images;
    let imageURLs = newProperty.imagePreviews;
    let trimmedProperty = _.omit(newProperty, ['imagePreviews', 'images', 'validInputs', 'invalidInputs', 'error', 'imageError', 'selectedImageIndex', 'success']);

    firestore
      .collection('properties')
      .doc(trimmedProperty.propertyId)
      .set({ ...trimmedProperty }, { merge: true })
      .then(() => {
        console.log(`Updated Property with ID: ${trimmedProperty.propertyId}`);
        // Prepare the image files for uploading
        const metadata = {
          contentType: 'image/jpeg',
        };


        images.forEach((image, index) => {
          if (image) {
            console.log(index);
            let uploadTask = storageRef.child('images/' + trimmedProperty.propertyId + '/' + image.name).put(image, metadata);

            uploadTask.on('state_changed', (snapshot) => {
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
                default:
                  break;
              }
            }, (error) => {
              console.log(error);
            }, () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                imageURLs[index] = (downloadURL);
                firestore
                  .collection('properties')
                  .doc(trimmedProperty.propertyId)
                  .set({ imageURLs }, { merge: true })
              });
            });
          }
        });
      }).catch((error) => {
        console.log(`Error updating Property: ${error}`);
      });
  }
};


export const deleteProperty = (userId, propertyId, profile) => {
  return (dispatch, getState, { getFirestore }) => {

    if (profile.type !== 'owner') {
      return dispatch({
        type: 'DELETE_PROPERTY_ERROR',
        err: {
          message: 'cannot delete the property if you are not an owner'
        }
      })
    }
    if (!(userId && typeof(userId) === 'string' && userId.length > 0)) {
      return dispatch({
        type: 'DELETE_PROPERTY_ERROR',
        err: {
          message: 'userId needs to be a non-null string which is not empty'
        }
      });
    }
    if (!(propertyId && typeof(propertyId) === 'string' && propertyId.length > 0)) {
      return dispatch({
        type: 'DELETE_PROPERTY_ERROR',
        err: {
          message: 'propertyId needs to be a non-null string which is not empty'
        }
      });
    }

    const firestore = getFirestore();

    firestore
      .collection('properties')
      .doc(propertyId)
      .get()
      .then(query => {

        const result = query.data();
        if (result) {
          //if there is a list, check if the propertyId exists
          if (result.userId == userId) {
            firestore
              .collection('properties')
              .doc(propertyId)
              .set({
                deleted: true
              }, { merge: true })
              .then(() => dispatch({
                type: 'DELETE_PROPERTY_SUCCESS',
                payload: {
                  message: 'Successfully deleted the property'
                }
              }))
              .catch(e => dispatch({
                type: 'DELETE_PROPERTY_ERROR',
                err: {
                  error: e,
                  message: 'Unknown error setting the deleted attribute'
                }
              }));
          } else {
            return dispatch({
              type: 'DELETE_PROPERTY_ERROR',
              err: {
                message: 'The property id and user id did not match'
              }
            })
          }
        } else {
          //if no list, then dispath
          return dispatch({
            type: 'DELETE_PROPERTY_ERROR',
            err: {
              message: 'There is no property'
            }
          })
        }
      })
      .catch(e => dispatch({
        type: 'DELETE_PROPERTY_ERROR',
        err: {
          error: e,
          message: 'Unknown error fetching the owner list'
        }
      }))
  }
}
