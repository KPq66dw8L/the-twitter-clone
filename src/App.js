import './App.css';

import React, { useRef, useState } from 'react';
import autosize from 'autosize';

import Recommendations from './components/Recommendations';
import Menu from './components/Menu';
import Twit from './components/Twit';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { className } from 'postcss-selector-parser';
// import { current } from 'immer';

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

  const twitsRef = firestore.collection('twits'); //reference a firestore collection
  const query = twitsRef.orderBy('createdAt').limit(25); //query documents in a collection

  const [twits] = useCollectionData(query, {idField: 'id'}); //listen to data with a hook
  const [formValue, setFormValue] = useState('');
  
  const { uid, photoURL, displayName } = auth.currentUser; //destructuring

  const sendTwit = async(e) => {
    e.preventDefault(); //prevent re-rendering

    await twitsRef.add({ //create a new document in firestore
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue(''); //reset formValue
  }

  autosize(document.querySelector('.autosizeText'));
  //to limit the amount of words and not characters in a twit
  // var wordLen = 255; // Maximum word length
  //    function checkWordLen(obj){
  //       var len = obj.value.split(/[\s]+/);
  //      if(len.length > wordLen){
  //          alert("You cannot put more than "+wordLen+" words in this text area.");
  //          obj.oldValue = obj.value!=obj.oldValue?obj.value:obj.oldValue;
  //          obj.value = obj.oldValue?obj.oldValue:"";
  //          return false;
  //      }
  //    return true;
  //  }


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

  return (
    <main className='homepage'>
      
      <Menu name={displayName} />
      <div className='centerArea'>
        <div className='banner'><h3 onClick={() => topFunction()}>Home</h3> 
        </div>
        <form  onSubmit={sendTwit} >
          <img className='profilePic' src={photoURL}></img>
            <textarea className='autosizeText' value={formValue} onChange={(e) => setFormValue(e.target.value)} maxLength='280' placeholder="What's happening?"></textarea>
              {formValue ? <button type="submit">Twit</button> : <button type="submit" disabled>Twit</button>}

          </form>
          <div className='twitList'>
            {twits && twits.map(twt => <Twit key={twt.id} docId={twt.id} twit={twt} name={displayName} />)}
            
          </div>
      </div>
      <Recommendations />
    </main>
  );
}


export default App;
