import React, {useContext} from 'react';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {FiMoreHorizontal} from 'react-icons/fi';
import {BsTelephonePlus} from 'react-icons/bs'; 
import {FaUserCircle} from 'react-icons/fa';
import Messages from "../components/Messages"
import Input from "../components/Input"
import { ChatContext } from "../context/ChatContext";


function Chat() {

  const { data } = useContext(ChatContext);


  return (
    <>
    {data.user?.displayName ? 
      <div className='chat displayChat'>
      <div className="chatInfo">
        <span className='friendInfo'> 
          {data.user?.photoURL ? 
            <img src={data.user?.photoURL} alt="" className='friendProfile'/>
            :
            <FaUserCircle className='friendDP'/>
          }
          {data.user?.displayName}
        </span>
        <div className="chatIcons">
          <span><BsTelephonePlus/></span>
          <span><AiOutlineVideoCamera/></span>
          <span><AiOutlineUserAdd/></span>
          <span><FiMoreHorizontal/></span>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
    :
    <div className='chat'>
      <div className='suggestionText'> <p>Select a chat to start messaging</p> </div>
    </div>
  }
  </>
  );
};

export default Chat;