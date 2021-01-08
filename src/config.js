// import firebase from 'firebase/app';
// import 'firebase/database';
import firebase from 'firebase/app';

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyCiFEwAPdGs1UQp8VEV0ww1o55OFDT8224",
  authDomain: "english-vocabulary-2020.firebaseapp.com",
  databaseURL: "https://english-vocabulary-2020-default-rtdb.firebaseio.com",
  projectId: "english-vocabulary-2020",
  storageBucket: "english-vocabulary-2020.appspot.com",
  messagingSenderId: "1091446428671",
  appId: "1:1091446428671:web:05dfa1446b2a41170b0dca"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export default config;