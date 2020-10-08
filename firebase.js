import firebase from "firebase";
const Config = {
    apiKey: "AIzaSyD6zJ2pO9N4e7OSuUi7vf-XQJ92hOlur6A",
    authDomain: "hospital-app-49c8b.firebaseapp.com",
    databaseURL: "https://hospital-app-49c8b.firebaseio.com",
    projectId: "hospital-app-49c8b",
    storageBucket: "hospital-app-49c8b.appspot.com",
    messagingSenderId: "793678846485",
    appId: "1:793678846485:web:2375bf54c981b35b3bcc1c"
};
  // Initialize Firebase
const Firebase = firebase.initializeApp(Config);
export default Firebase