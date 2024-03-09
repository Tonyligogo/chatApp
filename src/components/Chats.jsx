import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import moment from 'moment'

function Chats() {

  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(false)
  const [user, setUser] = useState('')

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);


  const handleSelect = (u, id) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setUser(id)
    setSelected(true)
  };


  return (
      <div className='chats search'>
      {chats ? Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className={user === chat[1].userInfo.displayName && selected ? "userChat selected" : "userChat"} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo, chat[1].userInfo.displayName)}>
            <div className="imgWrapper">
              <img className='img' src={chat[1].userInfo.photoURL} alt="" />
            </div>
            <div className="userChatInfo">
              <span className="displayName">
                {chat[1].userInfo.displayName}
                <small> {moment(chat[1].date?.toDate()).format('LT')} </small>
              </span>
              <p className="lastMsg">{chat[1].lastMessage?.text}</p>
            </div>
        </div>
      )): <p>Oops no friends!</p> }
      </div>
      
  )
}

export default Chats;