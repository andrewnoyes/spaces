# Setup
* Create a Firebase account, [firebase.google.com](firebase.google.com).
* Create a file named `firebaseConfig.js` in `./src/services` with your config details: 

```js
export const firebaseConfig = {
    apiKey: {YOUR_API_KEY},
    authDomain: {YOUR_AUTH_DOMAIN},
    databaseURL: {YOUR_DB_URL},
    projectId: {YOUR_PROJECT_ID},
    storageBucket: {YOUR_STORAGE_URL},
    messagingSenderId: {YOUR_SENDER_ID}
  };
```