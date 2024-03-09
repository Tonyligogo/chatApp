import React from 'react'
import Navbar from "../components/Navbar"
import Searchbar from "../components/Search"
import Chats from "../components/Chats"
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import {BiLogOut} from 'react-icons/bi';

function Sidebar() {
  
  return (
    <div className='sidebar'>
      <Navbar/>
      <Searchbar/>
      <Chats/>
      <button onClick={()=>signOut(auth)}> <BiLogOut/> Logout</button>
    </div>
  )
}

export default Sidebar