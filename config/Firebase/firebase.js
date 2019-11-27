import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },
  currentUser: () => {
    return firebase.auth().currentUser
  },

  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  },

  updateUserProfile: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  },

  getUserProfile: id => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${id}`)
      .get()
  },

  // storage
  uriToBlob: uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response)
      }

      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'))
      }
      // this helps us get a blob
      xhr.responseType = 'blob'

      xhr.open('GET', uri, true)
      xhr.send(null)
    })
  },

  uploadToFirebase: (blob, userUID, name) => {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref()
      storageRef
        .child(`players/${userUID}/${name}.jpg`)
        .put(blob, {
          contentType: 'image/jpeg',
        })
        .then(snapshot => {
          blob.close()
          resolve(snapshot)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
}

export default Firebase
