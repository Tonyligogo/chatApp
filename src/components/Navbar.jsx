import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className='chatName'>ChitChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default Navbar