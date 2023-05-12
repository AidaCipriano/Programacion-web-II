import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthConext } from '../Context/AuthContext'
import "../stilos.scss";

const Navbar = () => {
  const {currentUser} = useContext(AuthConext)

  return (
    <div className='navbarT'>
      {/* <span className="logoT">Lama Chat</span> */}
      <div className="userT">
        <img src={currentUser.photoURL} alt="" />
        <div className='usuario'>
           <span>{currentUser.displayName}</span>
        </div>
       
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
      </div>
    </div>
  )
}

export default Navbar