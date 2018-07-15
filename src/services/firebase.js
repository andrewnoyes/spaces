import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';

/*
- Create a firebase account: https://firebase.google.com/
- After setup, copy config details from your console

 firebaseConfig = {
    apiKey: {YOUR_API_KEY},
    authDomain: {YOUR_AUTH_DOMAIN},
    databaseURL: {YOUR_DB_URL},
    projectId: {YOUR_PROJECT_ID},
    storageBucket: {YOUR_STORAGE_URL},
    messagingSenderId: {YOUR_SENDER_ID}
  };
 */

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const authProviders = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  // TODO: disabling email until custom UI is implemented
  // firebase.auth.EmailAuthProvider.PROVIDER_ID,
]

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export {
  firebase,
  auth,
  authProviders,
  db
};
