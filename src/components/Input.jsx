import React, { useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Img from "../img/img.png";
import {IoMdSend} from 'react-icons/io';
import {MdEmojiEmotions} from 'react-icons/md';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Picker from '@emoji-mart/react';
import Data from '@emoji-mart/data';

function Input() {

  const [isPickerVisible, setIsPickerVisible] = useState(false)

  const Filter = require("bad-words");
  const filter = new Filter();

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  function addEmoji(e){
    const emoji = e.unified.split("_")
    const emojiArray = []
    emoji.forEach((el)=> emojiArray.push("0x" + el));
    let emojis = String.fromCodePoint(...emojiArray)
    setText(text + emojis)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: filter.clean(text),
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: filter.clean(text),
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: filter.clean(text),
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: filter.clean(text),
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <form onSubmit={handleSend} className='sendMsg'>
      <div className='input'>
        <input
                type="text"
                placeholder="Write a message..."
                onChange={(e) => setText(e.target.value)}
                value={text}
        /> 
        <div className="send">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Img} alt="" className='fileImg'/>
          </label>
          <span onClick={()=>setIsPickerVisible((prev)=>!isPickerVisible)}> <MdEmojiEmotions className='emojiBtn'/> </span>
          {isPickerVisible && 
            <div className='picker'>
              <Picker 
                data={Data} 
                previewPosition="none" 
                onEmojiSelect={addEmoji} 
                maxFrequentRows={1}
                emojiSize={20}
                emojiButtonSize={28}
              />
            </div>
          }
        </div>
      </div>
      <button> <IoMdSend className='sendBtn'/> </button>
    </form>
  )
}

export default Input