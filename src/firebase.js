import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCTHO24CdXxH-WoeA_SUbefNOYveh4vHsI",
    authDomain: "js2-final-c562e.firebaseapp.com",
    databaseURL: "https://js2-final-c562e.firebaseio.com",
    projectId: "js2-final-c562e",
    storageBucket: "js2-final-c562e.appspot.com",
    messagingSenderId: "711282128070",
    appId: "1:711282128070:web:ee19548f4c5ff4175f53c7"
  };

    const firebaseApp = firebase.initializeApp(firebaseConfig);
    export const db = firebaseApp.firestore();
    var storage = firebase.storage();
    export var storageRef = storage.ref();
    export var imageRef = storageRef.child('images');

