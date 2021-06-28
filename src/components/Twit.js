import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import bookmark from '../img/bookmark.svg';
import trash from '../img/delete.png';

import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { DBWrapper } from 'workbox-core/_private';
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

function Twit(props) {
  const { text, uid, photoURL } = props.twit;

  const twitClass = uid === auth.currentUser.uid ? 'sent' : 'received'; //comparing the current id on the firestore document to the current user id, if they are equal current user sent

  const bmref = firestore.collection(`bookmarks-${props.name.replace(/\s/g, '')}`); //reference a firestore collection
  const bmquery = bmref.orderBy('createdAt').limit(25); //query documents in a collection

  const [twits] = useCollectionData(bmquery, {idField: 'id'}); //listen to data with a hook


  const saveTwit = async(e) => {
    e.preventDefault(); //prevent re-rendering

    await bmref.add({ //create a new document in firestore
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
  }

  const delTwit = (e) => {
      e.preventDefault(); //prevent re-rendering
    // const bmref = firestore.collection(`bookmarks-${props.name.replace(/\s/g, '')}`); //reference a firestore collection
    // const bmquery = bmref.where('id','==',props.docId);

    // bmquery.get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         doc.ref.delete();
    //     });
    // });

    if(window.location.href.includes("bookmarks")) {
        bmref.doc(props.docId).delete();
    } else {
        firestore.collection('twitList').doc(props.docId).delete();
    }

  }

  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className={`twit ${twitClass}`}>
      <img className='profilePic' src={photoURL}></img>
      <bold>{props.name}</bold>
      <p>{text}</p>
      <div className='reactions'>
        { window.location.href.includes("bookmarks") ? null : <a href="#" onClick={saveTwit} ><img src={bookmark}></img></a> }
        { window.location.href.includes("bookmarks") ? <a href="#" onClick={delTwit}  ><img src={trash}></img></a> : null}
        {uid === auth.currentUser.uid && !(window.location.href.includes("bookmarks")) ? <a href="#" onClick={delTwit}  ><img src={trash}></img></a> : null}
        <div id="overHeart"><div id="heart" className={isActive ? "is-active" : null} onClick={() => handleToggle()}></div></div>
      </div>
    </div>
  );
}

export default Twit;