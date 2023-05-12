import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { useRef } from 'react';

import { useContext } from 'react';
import { ChatConext } from '../Context/ChatContext';
import { useEffect } from 'react';
import { AuthConext } from '../Context/AuthContext';
import CryptoJS from 'crypto-js';

export const MessageGroup = ({ message }) => {
    const { currentUser } = useContext(AuthConext);
    const { data } = useContext(ChatConext);
  
    const ref = useRef();
  
    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
  
    const descifrar = (texto) => {
      var bytes = CryptoJS.AES.decrypt(texto, "poi");
      var textoDescifrado = bytes.toString(CryptoJS.enc.Latin1);
  
      if (textoDescifrado) {
          return textoDescifrado;
      } else {
          return texto;
      }
    }
  
    const date = new Date(message.date?.seconds*1000);
  const options = { 
      month: 'long', 
      day: 'numeric' 
  };
  let h = date.getHours();
  let m = date.getMinutes();
  let time = h + ":" + m;
  
  const newDate = date.toLocaleDateString('en-US', options);
  
  
  
  return (
    <div>
    
    <div ref={ref}  className={`messageT ${message.senderId === currentUser.uid && "owner"}`}>
   
      <div className="messageInfoT">
      <span className="usuario">{message.displayName}</span>
        <img
           src={message.photoURL}
          alt=""
        />
        
      </div>
      <div className="messageContentT" >
        
        <div className="vacio"></div>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
       <div className="fecha">{`${newDate} - ${time}`} hrs</div>
        
        
      </div>
      
    </div>
   </div>
  );
};

export default MessageGroup