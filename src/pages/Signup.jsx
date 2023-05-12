//import * as React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth";
import { ToastContainer } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import './Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc,  setDoc } from "firebase/firestore";
import ElTims from '../imgs/ElTims.png';

const Signup = () => {
  const [err, setErr] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmitFirebase = async (e) => {
    setLoading(true);
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    const displayName = e.target[2].value;
    const pfp = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);


      await uploadBytesResumable(storageRef, pfp).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
             
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/chats");

          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
            
           
          }
        });
      });

    } catch (err) {
      setErr(true);
      setLoading(false);
    }


  };

  const { signup } = useAuth();
  const [datos, setDatos] = React.useState({
    typeEmailX: '',
    typePasswordX: ''
  })

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
    console.dir(datos);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.dir(datos);
    signup({
      email: datos.typeEmailX,
      password: datos.typePasswordX,
      name: datos.typeNameX,
      lastname: datos.typeLastnameX
    });
  };

  return (
    <section className="vh-100 gradient-custom">
      <ToastContainer />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card-form" style={{borderRadius: '2rem'}} >
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">
                <img alt="Registrate" src={ElTims}width="150" height="150"></img>
                <h1 className="fw-italic mb-0">El Tims</h1>
                <br></br>
                  <form onSubmit={handleSubmitFirebase} noValidate sx={{ mt: 1 }}>
                  <h2 className="fw-bold mb-2 ">Registrate</h2>
                  <p className="text-white-50 mb-5">Por favor, ingresa tu información.</p>

                    <div className="form-outline form-white mb-4">
                      <input type="email" name="typeEmailX" id="typeEmailX" className="form-control" onChange={handleInputChange} placeholder="Correo Electrónico" />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input type="password" name="typePasswordX" id="typePasswordX" className="form-control" onChange={handleInputChange} placeholder="Contraseña" />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input type="text" name="typeNameX" id="typeNameX" className="form-control" onChange={handleInputChange} placeholder="Nombre de Usuario" />
                    </div>
                    <span>Foto de perfil: </span>
                    <input required  type="file" id="file" />
                    <label htmlFor="file">
                      
                    </label>
                    <br></br>
                    <br></br>
                    <button className="btn-form-signup" type="submit" disabled={loading}>Crear cuenta</button>
                    <br></br>
                    <br></br>
                    <div>
                      <p className="mb-1 mt-3">¿Ya tienes cuenta? <Link to="/login" >Ingresar</Link>
                      </p>
                    </div>
                    {loading && "Uploading and compressing the image please wait..."}
                    {err && <span>Algo salio mal</span>}
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;