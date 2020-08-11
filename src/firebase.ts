import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJ1ofJfZcu0q9J7DAmQlNCNghqsh-_vWw",
    authDomain: "firstnativeapp-bfe62.firebaseapp.com",
    databaseURL: "https://firstnativeapp-bfe62.firebaseio.com",
    projectId: "firstnativeapp-bfe62",
    storageBucket: "firstnativeapp-bfe62.appspot.com",
    messagingSenderId: "654220715685",
    appId: "1:654220715685:web:525869896446f59aea4f4c",
    measurementId: "G-PPYW6ZPX8Y"
  };

  const app = firebase.initializeApp(firebaseConfig);

  export const auth = app.auth();
  
  export const authObject = firebase.auth;
  export const firestore = app.firestore();



