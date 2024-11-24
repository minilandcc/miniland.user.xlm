// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FBSE_WEBB_APIK,
  authDomain: process.env.REACT_APP_FBSE_WEBB_AUTH,
  databaseURL: process.env.REACT_APP_FBSE_WEBB_DBSE,
  projectId: process.env.REACT_APP_FBSE_WEBB_PRID,
  storageBucket: process.env.REACT_APP_FBSE_WEBB_STOR,
  messagingSenderId: process.env.REACT_APP_FBSE_WEBB_SNID,
  appId: process.env.REACT_APP_FBSE_WEBB_APID,
  measurementId: process.env.REACT_APP_FBSE_WEBB_MSID
};


// initialize
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const storage = getStorage(firebase)
const provider = new GoogleAuthProvider()
export {firebase, auth, provider, storage}