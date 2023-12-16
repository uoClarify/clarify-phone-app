// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6AtPeSzPTWD0I3R6uMcCBm0pWvuBMqX0",
  authDomain: "clarifylogin.firebaseapp.com",
  projectId: "clarifylogin",
  storageBucket: "clarifylogin.appspot.com",
  messagingSenderId: "649911712292",
  appId: "1:649911712292:web:2c351d8a4ce33875ef76b1",
  measurementId: "G-XN1PRE2DPK"
};

// Initialize Firebase

let app;
if ( firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}
const auth = firebase.auth()
// const app = initializeApp(firebaseConfig);

export { auth };