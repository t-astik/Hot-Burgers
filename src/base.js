import Rebase from 're-base';
import firebase from 'firebase/app';
require('firebase/database');
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTLRqQISnnxzUHNGAG_GHS38Qf9MgAo0w",
  authDomain: "very-hot-burgers-f035e.firebaseapp.com",
  databaseURL: "https://very-hot-burgers-f035e-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;