import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  const app = firebase.initializeApp(firebaseConfig);

  export const auth = app.auth();
  
  export const authObject = firebase.auth;
  export const firestore = app.firestore();



