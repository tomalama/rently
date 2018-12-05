import _ from 'lodash';
import firebase from 'firebase';

const storageRef = firebase.storage().ref();

export const addToVisitingList = (userId, profile, propertyId, successcb, errorcb) => {
  return (dispatch, getState, { getFirestore }) => {

    //pre checks
    if (profile.type !== 'customer') {
      console.error('cannot add to visiting list if you are not a customer');
      return;
    }
    if (!(userId && typeof(userId) === 'string' && userId.length > 0)) {
      console.error('userId needs to be a non-null string which is not empty')
      return;
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
            .then(successcb ? successcb : () => {})
            .catch(errorcb ? errorcb : e => console.log(e))
          }
          
        } else {

          firestore
            .collection('visiting-list')
            .doc(userId)
            .set({
              data: propertyId ? [propertyId] : [] 
            })
            .then(successcb ? successcb : () => {})
            .catch(errorcb ? errorcb : e => console.log(e))
        }
      })
      .catch(errorcb ? errorcb : e => console.log(e))
  }
}

export const addProperty = newProperty => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    // Trim the unnecessary fields from the AddProperty state object
    const images = Array.from(newProperty.images);
    let trimmedProperty = _.omit(newProperty, ['imagePreviews', 'images', 'validInputs', 'invalidInputs', 'error', 'imageError']);
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

        images.forEach((image, index) => {
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
