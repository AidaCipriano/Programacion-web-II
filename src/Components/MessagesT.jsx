import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState} from "react";
import { ChatConext } from "../Context/ChatContext";
import { db } from "../firebase";
import Message from "./MessageT";
import MessageGroup from "./MessageGroup";
import "../stilos.scss";
import "./MessagesT.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Bootstrap
import { v4 as uuid } from "uuid";
import { AuthConext } from '../Context/AuthContext';
import CryptoJS from 'crypto-js';

import { collection, query, where, getDocs, serverTimestamp, updateDoc, Timestamp } from "firebase/firestore";
import { arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {storage } from '../firebase';
import { useRef } from 'react';
import Cam from "../img/cam.png";
import Img from "../img/img.png";
import Send from "../img/send.png"
import Map from "../img/mapa.png"
import Attach from "../img/attach.png";
import { useCallback } from "react";



const Messages = () => {

  //Manejar estado de encriptacion
  const [encriptar, setEncriptar] = useState(false);

  const toggleEncrypt = () => {
      setEncriptar(!encriptar)
      console.log(encriptar)
  }

  //Funciones para encriptar los mensajes
  const cifrar = (texto) => {
      if (encriptar) {
          var textoCifrado = CryptoJS.AES.encrypt(texto, "poi").toString();
          return textoCifrado;
      } else {
          return texto;
      }
  }

  

  const { data } = useContext(ChatConext);
  const [err, setErr] = useState(false);
  //const [cifrado, setCifrado] = useState(false);

  const [idGroup, setIdGroup] = useState("null");
  const [param, setParam] = useState("null");
  const [messages, setMessages] = useState([]);
  const [messagesGroup, setMessagesGroup] = useState([]);

  const [chatIsGroup, setIsGroup] = useState(false);

  const { currentUser } = useContext(AuthConext);

  useEffect(() => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          doc.exists() && setMessages(doc.data().messages)
      })
      return () => {

          unSub()
      }
  }, [data.chatId]);

  useEffect(() => {

  
    const unSubGroup = onSnapshot(doc(db, "chats", idGroup), (doc) => {
        doc.exists() && setMessagesGroup(doc.data().messages)
       // console.log(idGroup)
        
    })
    return () => {
        unSubGroup()
    }
  }, [idGroup]);
  
  // DIVISION PARA TRAER MSG DE UN GRUPO
  const handlerGroup = async (g) => {
    try {
      console.log("chats/" + g)
      const docRef = doc(db, "chats", g);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        setIsGroup(true);
        setIdGroup(g);
       // console.log("es grupo")
      } else {
        // doc.data() will be undefined in this case
       // console.log("No such document!");
        setIsGroup(false);
        setIdGroup("null");
        setMessagesGroup([])
      }
    } catch (err) {
     // console.log("no ps f")
    }
    
  }



  //DIVISION PARA EL ENVIO DE MENSAJES
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSendMessageLocation = async () => {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
      
      function getLocation(){
          if (navigator.geolocation){
             navigator.geolocation.getCurrentPosition(showPosition);
            }else{
               alert("Geolocation is not supported by this browser.");
            }
          }
         getLocation()
        function showPosition(position) {
              //var str="Longitude: "+ position.coords.longitude+"Latitude:"+ position.coords.latitude
              //var str="Longitude: "+ position.coords.longitude+"Latitude:"+ position.coords.latitude
              var str="https://www.google.com/maps/place/" + position.coords.longitude + "," +- position.coords.latitude


              document.getElementById("mensaje").value=str
          }
          function showError( error ) {
              console.log( 'getCurrentPosition returned error', error);
          }
  }
  const handleSendMessage = async () => {

    if (chatIsGroup) {
        //console.log("es grupo")
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", idGroup), {
                            messages: arrayUnion({
                                id: uuid(),
                                text: cifrar(text),
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                            }),
                        });
                    });
                }
            );

        } else {
            await updateDoc(doc(db, "chats", idGroup), {
                messages: arrayUnion({
                    id: uuid(),
                    text: cifrar(text),
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                })
            })
        }
    } else {
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
                                text: cifrar(text),
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                displayName: currentUser.displayName,
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
                    text: cifrar(text),
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    displayName: currentUser.displayName,
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
    }


    setIsGroup(false);
    setIdGroup("null")
    setMessagesGroup([])
    console.log("ya lo puse falso")
    setText("");
    setImg(null);
};

  



  return (
    <section>
      { /*onChange={(g) => handlerGroup(data.user?.displayName, g)}*/}
      
      {<div onClick={handlerGroup(data.user?.displayName)}> </div>}
      <div className="messagesT">
      

        {messages.map((m) => (
          <Message message={m} key={m.id}  />
          
        ))}
        {messagesGroup.map((m) => (
          <MessageGroup message={m} key={m.id}  />
        ))}
      </div>
   
      <div className="inputT">
        <Form.Control id="mensaje" className="me-auto" placeholder="Mensaje a enviar..." onChange={e => setText(e.target.value)} />
        
        <div className="sendT"> 
          {/* <img src={Attach} alt="" /> 
          <input 
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />*/}
          <div className="vr" />
          <Button variant="primary" onClick={handleSendMessageLocation}><img src={Map} alt="" /> </Button>
          {/* <label htmlFor="fileInputM"> */}
            {/* <img id="iconM" src={Attach} /> */}
          {/* </label> */}
          {/* <input id="fileInputM" type="file" onChange={e => setImg(e.target.files[0])}></input> */}
          <Form>
            <Form.Check onClick={toggleEncrypt}
                type="switch"
                id="custom-switch"
                label="Cifrar "
            />
          </Form>
          
          <Form.Control  src={Img} type="file" onChange={e => setImg(e.target.files[0])}>
         </Form.Control>
            
            
        
         
       
          <a href="microsoft-edge:http://localhost:4000/08db96f7-b409-40ee-8317-307c925d302d"><img src={Cam} /></a>
          <Button variant="danger" onClick={handleSendMessage}><img src={Send} alt="" /> </Button>
          
        </div>
      </div>
  </section>

  );
};

export default Messages;
