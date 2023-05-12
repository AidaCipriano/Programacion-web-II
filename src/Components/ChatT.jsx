import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./MessagesT";
import { ChatConext } from "../Context/ChatContext";
import "../stilos.scss";




const Chat = () => {

  const { data } = useContext(ChatConext);
  
  return (
    <div className="chatT">
      <div className="chatInfoT">
        <span> <img src={data.user?.photoURL} alt=""  className="icono"/> </span>
       
        <span>{data.user?.displayName}</span>
        <div className="chatIconsT"> 
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      
      <Messages />
     
    </div>
  );
};

export default Chat;
