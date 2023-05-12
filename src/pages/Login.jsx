import * as React from "react";
import { useAuth } from "../Hooks/UseAuth";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './Login.css';
import { disconnectSocket } from '../SocketService'
import swal from 'sweetalert2';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import ElTims from '../imgs/ElTims.png';


const Login = () => {
  const [err, setErr] = React.useState(false);
  
  const navigate = useNavigate();
  const handleSubmitFirebase = async (e) =>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chats");
    }catch(err){
      setErr(true);
    }

  }

  const mostrarAlerta = () => {
    swal('Esta cosa pa');
  }

  const { login } = useAuth();
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
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    disconnectSocket();
    login({
      email: datos.typeEmailX,
      password: datos.typePasswordX
    });
  };

  return (
    <section className="vh-100 gradient-custom">
      <ToastContainer />
      <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-7 col-lg-6 col-xl-5">
          <div className="card-form" style={{borderRadius: '2rem'}} >
            <div className="card-body p-5 text-center">

                 <div className="mb-md-5 mt-md-4 pb-5">
                 <img alt="LogoFCFM" src={ElTims}width="150" height="150"></img>
                 <h1 className="fw-italic mb-0">El Tims</h1>
                 <br></br>
                  <form onSubmit={handleSubmitFirebase} noValidate sx={{ mt: 1 }}>
                     
                    <h2 className="fw-bold mb-2">Inicio de sesión</h2>
                    <p className="text-white-50 mb-5">Ingresa tu correo electronico y contraseña en los campos de abajo.</p>

                    <div className="form-outline form-white mb-3">
                      <input type="email" name="typeEmailX" id="typeEmailX" className="form-control" onChange={handleInputChange} placeholder="Correo Electrónico" />
                    </div>

                    <div className="form-outline form-white mb-3">
                      <input type="password" name="typePasswordX" id="typePasswordX" className="form-control " onChange={handleInputChange} placeholder="Contraseña"/>
                    </div>

                    <button className="btn-form-login" type="submit">Iniciar sesion</button>
                    <br></br>
                    <br></br>
                    <p className="small mb-0 pb-lg-2"><a className="text-white-10" href="#!">¿Olvidaste tu contraseña?</a></p>
                    
                    
                    {err && <span>Uh oh! Algo paso:/</span>}
                  </form>
                </div>
                <div>
                      <p className="login-form-links">¿No te haz registrado? <Link to="/signup">Registrate.</Link>
                      </p>
                    </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;