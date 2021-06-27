import logo from '../img/bird.svg';
import bell from '../img/bell.svg';
import bookmark from '../img/bookmark.svg';
import hashtag from '../img/hashtag.svg';
import house from '../img/house.svg';
import lists from '../img/lists.svg';
import mail from '../img/mail.svg';
import more from '../img/more.png';
import profile from '../img/profile.svg';

import { Link } from 'react-router-dom';

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


function SignOut() { //if we have a currentUSer return a button
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function Menu({name}) {

  const toBookmarks = {
        pathname: `/bookmarks/${name.replace(/\s/g, '')}`,
        state: {displayName: name.replace(/\s/g, '')}
  };

  const toHome = {
        pathname: `/`,
        state: {displayName: name.replace(/\s/g, '')}
  };  

  return (
    <div className='menu'>
      <img className='logo' src={logo} alt='logo'></img>
      <Link to={toHome} href="#"><img src={house} className='icons' alt='homeIcon'></img>Home</Link>
      <a href="#"><img src={hashtag} className='icons' alt='exploreIcon'></img>Explore</a>
      <a href="#"><img src={bell} className='icons' alt='notificationsIcon'></img>Notifications</a>
      <a href="#"><img src={mail} className='icons' alt='messagesIcon'></img>Messages</a>
      <Link to={toBookmarks} href="#"><img src={bookmark} className='icons' alt='bookmarksIcon'></img>Bookmarks</Link>
      <a href="#"><img src={lists} className='icons' alt='listsIcon'></img>Lists</a>
      <a href="#"><img src={profile} className='icons' alt='profileIcon'></img>Profile</a>
      <a href="#"><img src={more} className='icons' alt='moreIcon'></img>More</a>
      <SignOut/>
    </div>
  );
}

export default Menu;