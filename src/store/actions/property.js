import _ from 'lodash';
import firebase from 'firebase';

const storageRef = firebase.storage().ref();

export const addProperty = newProperty => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    // Trim the unnecessary fields from the AddProperty state object
    const images = Array.from(newProperty.images);
    let trimmedProperty = _.omit(newProperty, ['imagePreviews', 'images', 'validInputs', 'invalidInputs', 'error', 'imageError']);

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
