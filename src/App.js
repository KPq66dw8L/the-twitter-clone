import './App.css';

import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

if (firebase.apps.length === 0) {
  firebase.initializeApp({
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyCNkd6sR01rrAyBHeBlDbyRQwAaTXo0gnA",
  authDomain: "twitter-clone-77672.firebaseapp.com",
  projectId: "twitter-clone-77672",
  storageBucket: "twitter-clone-77672.appspot.com",
  messagingSenderId: "856002163424",
  appId: "1:856002163424:web:1b742be874bf36609b9685",
  measurementId: "G-QTZQ73RE30"
})
}


const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
