
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { collection, query, where, getDocs, serverTimestamp, onSnapshot, doc, updateDoc, Timestamp } from "firebase/firestore";

import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {  Firestore, setDoc } from "firebase/firestore";

//Bootstrap

import { useState } from 'react';
import { v4 as uuid } from "uuid";

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, Link } from "react-router-dom";
import "./GroupButton.css"

const GroupButton = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [displayName, setName] = useState("");
    const [img, setImg] = useState(null);
    const [err, setErr] = React.useState(false);

    const sendGroup = async ()=>{
        try {
            
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
      
      
            await uploadBytesResumable(storageRef, img).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //create user on firestore
                  await setDoc(doc(db, "users", displayName), {
                    uid: uuid(),
                    displayName,
                    photoURL: downloadURL,
                  });
      
                  await setDoc(doc(db, "userChats", displayName), {});
                  await setDoc(doc(db, "chats", displayName), { messages: [] });
                  navigate("/chats");
      
                } catch (err) {
                  console.log(err);
                  setErr(true);
                }
              });
            });
      
          } catch (err) {
            setErr(true);
            console.log(err);
          }
    }

    return (
        <>
         
         <a class="bn39" onClick={handleShow}><span class="bn39span">Crear chat grupal</span></a>
            

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title>Añadir nuevo chat de grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre del grupo:</Form.Label>
                            <Form.Control type="text" placeholder="Grupo #1..." onChange={e => setName(e.target.value)}/>
                            <Form.Text className="text-muted">
                                Los usuarios tendrán que buscar el nombre del grupo en el campo de texto para ingresar a él.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Foto del grupo:</Form.Label>
                            <Form.Control type="file" onChange={e => setImg(e.target.files[0])} />
                        </Form.Group>
                        <Button variant="danger" onClick={sendGroup}>
                            Crear grupo
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <br></br>
        </>
    );
};

export default GroupButton