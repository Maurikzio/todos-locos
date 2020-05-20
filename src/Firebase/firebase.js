import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "to-dos-locos.firebaseapp.com",
    databaseURL: "https://to-dos-locos.firebaseio.com",
    projectId: "to-dos-locos",
    storageBucket: "to-dos-locos.appspot.com",
    messagingSenderId: "994852635401",
    appId: "1:994852635401:web:19415303577f90ed7a09d8",
    measurementId: "G-VRLZKMGPR4"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;