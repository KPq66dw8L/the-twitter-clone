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

  const [user] = useAuthState(auth); //hook returns object if user is logged in otherwise returns null
  console.log(user)

  return (
    <div className="App">
      <header className="App-header">
        {user ? <TwitList /> : <SignIn /> /*if the user is defined show the ChatRoom otherwise show the SignIng button*/} 
      </header>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    });
  }
    return (
      <button onClick={signInWithGoogle} >Sign In with Google</button>
    );
  
}

function TwitList() {
//connecting the ref of the div 
  const dummy = useRef();


  const twitsRef = firestore.collection('twits'); //reference a firestore collection
  const query = twitsRef.orderBy('createdAt').limit(25); //query documents in a collection

  const [twits] = useCollectionData(query, {idField: 'id'}); //listen to data with a hook
  const [formValue, setFormValue] = useState('');

  const sendTwit = async(e) => {
    e.preventDefault(); //prevent re-rendering

    const { uid, photoURL } = auth.currentUser; //destructuring

    await twitsRef.add({ //create a new document in firestore
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue(''); //reset formValue

    dummy.current.scrollIntoView({ behavior: 'smooth' }); //automatic scroll when sending msg
  }
//div ref dummy for the auto scroll down
  return (
    <>
      <div>
        {twits && twits.map(twt => <Twit key={twt.id} twit={twt} />)}
        <div ref={dummy}></div> 
      </div>

      <form onSubmit={sendTwit} >
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

        <button type="submit">Twit</button>
      </form>
    </>
  );
}

function Twit(props) {
  const { text, uid, photoURL } = props.twit;

  const twitClass = uid === auth.currentUser.uid ? 'sent' : 'received'; //comparing the current id on the firestore document to the current user id, if they are equal current user sent

  return (
    <div className={`twit ${twitClass}`}>
      <img src={photoURL}></img>
      <p>{text}</p>
    </div>
  );
}


export default App;
