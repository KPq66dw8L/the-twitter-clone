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

function Menu({name}) {

  const newTo = {
        pathname: `/bookmarks/${name.replace(/\s/g, '')}`,
        state: {displayName: name.replace(/\s/g, '')}
  };

  return (
    <div className='menu'>
      <img className='logo' src={logo} alt='logo'></img>
      <a href="#">
      <img src={house} className='icons' alt='homeIcon'></img>
      Home
      </a>
      <a href="#"><img src={hashtag} className='icons' alt='exploreIcon'></img>Explore</a>
      <a href="#"><img src={bell} className='icons' alt='notificationsIcon'></img>Notifications</a>
      <a href="#"><img src={mail} className='icons' alt='messagesIcon'></img>Messages</a>
      
      <Link to={newTo} href="#"><img src={bookmark} className='icons' alt='bookmarksIcon'></img>Bookmarks</Link>
      
      <a href="#"><img src={lists} className='icons' alt='listsIcon'></img>Lists</a>
      <a href="#"><img src={profile} className='icons' alt='profileIcon'></img>Profile</a>
      <a href="#"><img src={more} className='icons' alt='moreIcon'></img>More</a>
    </div>
  );
}

export default Menu;