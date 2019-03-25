import { createStore, combineReducers, compose } from "redux";
// import firebase from "firebase/app";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "@firebase/app";
require("firebase/auth");

//Custom Reducers

//Firebase Congif
const firebaseConfig = {
  apiKey: "AIzaSyBwZag3lGbuyDZrbkqmHOvLGYKrhgwrtrQ",
  authDomain: "react-client-panel-834a3.firebaseapp.com",
  databaseURL: "https://react-client-panel-834a3.firebaseio.com",
  projectId: "react-client-panel-834a3",
  storageBucket: "react-client-panel-834a3.appspot.com",
  messagingSenderId: "277762242161"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

//initialize firebase instance
firebase.initializeApp(firebaseConfig);

//initialize firestore
// const firestore = firebase.firestore();
// const settings = { timestampInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

//Create initial state
const initialstate = {};

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialstate,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
