import { Link } from 'react-router-dom';
import Menu from './Menu';
import Twit from './Twit';

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

function Bookmarks(props) {

    const newTo = {
        pathname: `/`,
        state: {name: props.name}
    };

    const bmref = firestore.collection(`bookmarks-${window.location.href.split('/')[4]}`); //reference a firestore collection
    const query = bmref.orderBy('createdAt').limit(25); //query documents in a collection

    const [twits] = useCollectionData(query, {idField: 'id'}); //listen to data with a hook

    

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        <main className='homepage'>
            <Menu name={props.name} />
            <div className='centerArea'>
                <div className='banner'><h3 onClick={() => topFunction()}>Bookmarks</h3> 
                </div>
                
                <div className='bmList'>
                    {twits && twits.map(twt => <Twit key={twt.id} docId={twt.id} twit={twt} name={window.location.href.split('/')[4]} />)}
                    
                </div>
            </div>
        </main>
    );
}

export default Bookmarks;