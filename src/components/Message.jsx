import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {BiCheckDouble} from 'react-icons/bi'; 
import moment from 'moment'
import messageSound from '../img/iphone_sound.mp3'

function Message({message}) {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  const ref = useRef();
  
  useEffect(()=>{
    const sound = new Audio(messageSound);
    if(message.senderId !== currentUser.uid){
      sound.play()
    }
    console.log('im being played')
  },[message, currentUser])

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } alt="" />
      </div>
      <div className="messageContent">
        <div className="messageBox">
          <p>{message.text}</p>
          <small>
            {moment(message.date.toDate()).format('LT')} 
            {message.senderId === currentUser.uid && <BiCheckDouble className="tick"/>} 
          </small>
        </div>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;