import React from 'react'
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {useState} from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";


function Register() {

const [err, setErr] = useState(false);
const navigate = useNavigate();

const handleSubmit = async (e)=>{
  e.preventDefault()
  const displayName = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  const file = e.target[3].files[0];

try{
  const res = await createUserWithEmailAndPassword(auth, email, password);

const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);

//Register three observers:
uploadTask.on(
  
  (error) => {
    // Handle unsuccessful uploads
    setErr(true);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
      });
      await setDoc(doc(db, "users", res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL:downloadURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    });
  }
);

  

}catch(err){
  setErr(true);
}
}

  return (
    <div className='formContainer' >
        <div className="formWrapper">
            <span className="chatName">ChitChat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Name'
                required
                />
                <input
                 type="email" 
                 placeholder='Your email'
                 required
                 />
                <input 
                type="password" 
                placeholder='password'
                required
                />
                <input required style={{ display: "none" }} type="file" id="file" />
                <label htmlFor="file">
                  <img src={Add} alt="" />
                  <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>You have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register